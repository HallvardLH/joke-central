import React, { useState } from 'react';
import { View, FlatList, Dimensions, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import Text from '../generalUI/Text';
import { useFetchJokes } from '@/hooks/useFetchJoke';
import { useTheme } from 'tamagui';
import JokeListItem from './JokeListItem';

const { height } = Dimensions.get('window');

export default function SnapScroll() {
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

    const renderItem = ({ item, index }: { item: { title: string; text: string }, index: number }) => {
        // Get the color set based on the index, cycle back to the start using modulo
        const colors = gradientColors[index % gradientColors.length];

        return (
            <JokeListItem
                title={item.title}
                text={item.text}
                gradientStart={colors.start}
                gradientEnd={colors.end}
                headerColor={colors.end}
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
            showsVerticalScrollIndicator={false}
            snapToInterval={height} // Snap at multiples of screen height
            decelerationRate="fast" // Make scroll snappy
            snapToAlignment="start" // Snap to the top of the screen
            style={styles.list}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});
