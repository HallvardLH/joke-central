import React, { useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import Text from '../../ui/generalUI/Text';
import { useFetchJokes } from '@/hooks/useFetchJoke';
import { useTheme } from 'tamagui';
import JokeThumbnail from './JokeThumbnail';

export default function JokeBrowse() {
    const { jokes, loading, error, refetch } = useFetchJokes();
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const theme = useTheme();

    const gradientColors = [
        { start: theme.accentPurpleMedium.val, end: theme.accentPurpleDarkest.val },
        { start: theme.accentBlueMedium.val, end: theme.accentBlueDark.val },
        { start: theme.accentPinkMedium.val, end: theme.accentPinkDark.val },
        { start: theme.accentYellowMedium.val, end: theme.accentYellowDarkest.val },
        { start: theme.accentGreenLight.val, end: theme.accentGreenDark.val },
    ];

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const renderItem = ({ item, index }: { item: { title: string; text: string; username: string; avatar_url: string | null; author: string; hasRead: boolean; likes: number; comments: number }, index: number }) => {
        // Get the color set based on the index, cycle back to the start using modulo
        const colors = gradientColors[index % gradientColors.length];

        return (
            <JokeThumbnail
                title={item.title}
                text={item.text}
                username={item.username}
                avatarUrl={item.avatar_url}
                hasRead={item.hasRead}
                likes={item.likes}
                comments={item.comments}
                gradientStart={colors.start}
                gradientEnd={colors.end}
            />
        );
    };

    if (loading && !refreshing) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={jokes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Two items per row for grid-like pattern
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            contentContainerStyle={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        marginTop: 100,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});
