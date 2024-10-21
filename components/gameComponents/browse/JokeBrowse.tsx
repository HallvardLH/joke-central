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
import { PAGE_SIZE } from '@/constants/General';

interface JokeBrowseProps {
    paddingTop?: boolean;
    queryKey: any;
    queryFn: any;
}

export default function JokeBrowse(props: JokeBrowseProps) {

    const { paddingTop, queryKey, queryFn } = props;

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
            if (!lastPage || !lastPage.data || lastPage.data.length < PAGE_SIZE) {
                return undefined;
            }
            return pages.length;
        },
    });

    useEffect(() => {
        if (!data) return;

        const temp_items: any[] = data.pages.flatMap(page => page.data ?? []);
        setItems(temp_items);
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
        item: {
            id: number;
            title: string;
            text: string;
            created_at: string;
            profiles: {
                username: string;
                avatar_url: string | null;
                id: string;
            },
            author: string;
            hasRead: boolean;
            likes: number;
            comments: number
        },
        index: number
    }) => {
        const colors = gradientColors[index % gradientColors.length];
        console.log(item.profiles.id)
        return (
            <JokeThumbnail
                title={item.title}
                text={item.text}
                uid={item.profiles.id}
                username={item.profiles.username}
                avatarUrl={item.profiles.avatar_url}
                createdAt={item.created_at}
                hasRead={item.hasRead}
                likes={item.likes}
                comments={item.comments}
                gradientStart={colors.start}
                gradientEnd={colors.end}
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
            refreshControl={<RefreshControl onRefresh={refresh} refreshing={isFetching} colors={['lightblue']} />}
            contentContainerStyle={styles.list}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            refreshing={isFetchingNextPage}
            estimatedItemSize={100}
        />
    );
}
