import JokeFeedItem from './JokeFeedItem';
import React, { useState, useEffect } from 'react';
import { RefreshControl, Dimensions } from 'react-native';
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
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import useAds from '@/hooks/useAds';

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

    const { InterstitialAdID } = useAds();
    const { isLoaded, isClosed, load, show } = useInterstitialAd(InterstitialAdID);

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

        // Use a Set to filter out duplicate jokes by ID
        const uniqueItems = Array.from(new Map(temp_items.map(item => [item.id, item])).values());

        setItems(uniqueItems);
    }, [data]);


    const refresh = async () => {
        await queryClient.resetQueries({ queryKey, exact: true });
        refetch();
    };

    const onEndReached = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    const { markJokeAsRead, isLoading } = useMarkJokeAsRead();
    const { session } = useAuth();
    const userId = session?.user?.id;

    const [jokesSeen, setJokesSeen] = useState<number[]>([]);

    // Triggers when a joke is in view,
    // Counts the amount of jokes that have been viewed,
    // Shows an interstitial for every 20 jokes
    // Marks the joke as read in database
    const onViewableItemsChanged = ({ viewableItems }: ViewableItemsChangedProps) => {
        // Use a functional update in order to have access to the correct state
        setJokesSeen((prevJokesSeen) => {
            const updatedJokesSeen = [...prevJokesSeen];

            viewableItems.forEach((viewable) => {
                if (!updatedJokesSeen.includes(viewable.item.id)) {
                    updatedJokesSeen.push(viewable.item.id);

                    // Load the ad one joke before actually showing it
                    if (updatedJokesSeen.length % 19 === 0 && updatedJokesSeen.length > 0) {
                        load();
                    }

                    if (updatedJokesSeen.length % 20 === 0 && updatedJokesSeen.length > 0) {
                        show();
                    }
                }
                // Marks the joke as read in supabase
                if (viewable.isViewable && userId) {
                    markJokeAsRead({ jokeId: viewable.item.id, userId });
                }
            });

            return updatedJokesSeen;
        });
    };



    const renderItem = ({ item, index }: {
        item: Joke,
        index: number
    }) => {
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
