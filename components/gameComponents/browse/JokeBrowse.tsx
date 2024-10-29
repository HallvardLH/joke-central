import React, { useState, useEffect } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import Text from '../../ui/generalUI/Text';
import { useTheme } from 'tamagui';
import JokeThumbnail from './JokeThumbnail';
import { FlashList } from '@shopify/flash-list';
import {
    useInfiniteQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { BROWSE_PAGE_SIZE } from '@/constants/General';
import { Joke } from './Joke';

interface JokeBrowseProps {
    paddingTop?: boolean;
    queryKey: any;
    queryFn: any;
    // Top offset of the refresh control indicator, defaults to 90
    refreshOffset?: number;
}

export default function JokeBrowse(props: JokeBrowseProps) {

    const { paddingTop, queryKey, queryFn, refreshOffset = 90 } = props;

    const queryClient = useQueryClient();

    const [items, setItems] = useState<any[]>([]);

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
            if (!lastPage || !lastPage.data || lastPage.data.length < BROWSE_PAGE_SIZE) {
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
        queryClient.resetQueries({ queryKey, exact: true });
    };

    const onEndReached = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    const theme = useTheme();

    const gradientColors = [
        { start: theme.accentPurpleMedium.val, end: theme.accentPurpleDarkest.val },
        { start: theme.accentBlueMedium.val, end: theme.accentBlueDark.val },
        { start: theme.accentPinkMedium.val, end: theme.accentPinkDark.val },
        { start: theme.accentYellowMedium.val, end: theme.accentYellowDarkest.val },
        { start: theme.accentGreenLight.val, end: theme.accentGreenDark.val },
    ];

    const renderItem = ({ item, index }: {
        item: Joke,
        index: number
    }) => {
        const colors = gradientColors[index % gradientColors.length];
        return (
            <JokeThumbnail
                joke={item}
                gradientStart={colors.start}
                gradientEnd={colors.end}
                index={index}
            />
        );
    };

    const styles = StyleSheet.create({
        list: {
            paddingBottom: 120,
            paddingTop: paddingTop ? 100 : 0,
        },
    });

    if (isError) {
        return <Text>Error loading list: {error.message}</Text>;
    }

    return (
        <FlashList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    onRefresh={refresh}
                    refreshing={isFetching}
                    colors={['lightblue']}
                    progressViewOffset={refreshOffset}
                />
            }
            contentContainerStyle={styles.list}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
            refreshing={isFetchingNextPage}
            estimatedItemSize={200}
        />
    );
}
