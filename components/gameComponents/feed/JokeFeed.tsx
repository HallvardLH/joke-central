import JokeFeedItem from './JokeFeedItem';
import React, { useState, useEffect } from 'react';
import { RefreshControl, Dimensions, Platform } from 'react-native';
import Text from '../../ui/generalUI/Text';
import { useTheme } from 'tamagui';
import { FlashList } from '@shopify/flash-list';
import {
    useInfiniteQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { FEED_PAGE_SIZE } from '@/constants/General';
import { Joke } from '../browse/Joke';
import useMarkJokeAsRead from '@/hooks/useMarkJokeAsRead';
import useAuth from '@/hooks/useAuth';
import { View } from 'tamagui';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import useAds from '@/hooks/useAds';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSettings } from '@/state/settingsSlice';
import { RootState } from '@/state/reduxStore';


const { height } = Dimensions.get('window');

interface JokeFeedProps {
    queryKey: any;
    queryFn: any;
}

interface ViewableItem {
    isViewable: boolean;
    item: Joke;
}
interface ViewableItemsChangedProps {
    viewableItems: ViewableItem[];
}

const interstitialId = process.env.EXPO_PUBLIC_DEVELOPMENT_MODE == 'true'
    ? TestIds.INTERSTITIAL
    : Platform.OS === 'android'
        ? 'ca-app-pub-1354741235649835/2054364065'
        : 'ca-app-pub-1354741235649835/5500425105';

// Set up the interstitial ad
const adUnitId = interstitialId;
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

export default function JokeFeed(props: JokeFeedProps) {
    const { queryKey, queryFn } = props;
    const theme = useTheme();
    const gradientColors = [
        { start: theme.accentPurpleMedium.val, end: theme.accentPurpleDarkest.val },
        { start: theme.accentBlueMedium.val, end: theme.accentBlueDark.val },
        { start: theme.accentPinkMedium.val, end: theme.accentPinkDark.val },
        { start: theme.accentYellowMedium.val, end: theme.accentYellowDarkest.val },
        { start: theme.accentGreenLight.val, end: theme.accentGreenDark.val },
    ];

    const queryClient = useQueryClient();
    const [items, setItems] = useState<any[]>([]);
    const [jokesSeen, setJokesSeen] = useState<number[]>([]);
    const { markJokeAsRead } = useMarkJokeAsRead();
    const { session } = useAuth();
    const userId = session?.user?.id;

    const {
        isFetching,
        isError,
        data,
        error,
        fetchNextPage,
        refetch,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<any>({
        queryKey: [queryKey],
        initialPageParam: 0,
        queryFn: ({ pageParam = 0 }) => queryFn(pageParam),
        getNextPageParam: (lastPage, pages) => {
            if (!lastPage || !lastPage.data || lastPage.data.length < FEED_PAGE_SIZE) {
                return undefined;
            }
            return pages.length;
        },
    });

    useEffect(() => {
        if (!data) return;
        const temp_items: any[] = data.pages.flatMap(page => page.data ?? []);
        const uniqueItems = Array.from(new Map(temp_items.map(item => [item.id, item])).values());
        setItems(uniqueItems);
    }, [data]);

    // Load and prepare interstitial ad
    useEffect(() => {
        const loadInterstitial = () => {
            interstitial.load();
        };

        // Listen for ad events
        const onAdLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            console.log('Ad Loaded');
        });

        const onAdClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            loadInterstitial();
        });

        loadInterstitial();

        // Cleanup listeners on component unmount
        return () => {
            onAdLoaded();
            onAdClosed();
        };
    }, []);

    const refresh = async () => {
        await queryClient.resetQueries({ queryKey, exact: true });
        refetch();
    };

    const onEndReached = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    const dispatch = useDispatch();
    const { interstitialAdFeedFrequency, loading } = useSelector((state: RootState) => state.settings);

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);


    // Handles displaying interstitial ad and marking jokes as read
    const onViewableItemsChanged = ({ viewableItems }: ViewableItemsChangedProps) => {
        setJokesSeen((prevJokesSeen) => {
            const updatedJokesSeen = [...prevJokesSeen];

            viewableItems.forEach((viewable) => {
                if (!updatedJokesSeen.includes(viewable.item.id)) {
                    updatedJokesSeen.push(viewable.item.id);

                    // Load ad after every 10 jokes
                    if (updatedJokesSeen.length % 10 === 0) {
                        interstitial.load();
                    }

                    // Show ad every x jokes
                    console.log(interstitialAdFeedFrequency)
                    if (updatedJokesSeen.length % interstitialAdFeedFrequency === 0 && interstitial.loaded) {
                        interstitial.show();
                    }

                    // Mark joke as read if viewable and userId exists
                    if (viewable.isViewable && userId) {
                        markJokeAsRead({ jokeId: viewable.item.id, userId });
                    }
                }
            });

            return updatedJokesSeen;
        });
    };

    const renderItem = ({ item, index }: { item: Joke, index: number }) => {
        const colors = gradientColors[index % gradientColors.length];
        return (
            <JokeFeedItem
                joke={item}
                gradientStart={colors.start}
                gradientEnd={colors.end}
                headerColor={colors.end}
            />
        );
    };

    if (isError) {
        return <Text>Error loading list: {error.message}</Text>;
    }

    return userId ? (
        <FlashList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            snapToInterval={height}
            decelerationRate="fast"
            snapToAlignment="start"
            refreshControl={
                <RefreshControl
                    onRefresh={refresh}
                    refreshing={isFetching}
                    colors={['lightblue']}
                    progressViewOffset={90}
                />
            }
            estimatedItemSize={height}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            onViewableItemsChanged={onViewableItemsChanged}
            refreshing={isFetchingNextPage}
        />
    ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading user data...</Text>
        </View>
    );
}
