import React from 'react';
import { Dimensions, StyleSheet, RefreshControl } from 'react-native'
import { FlashList } from '@shopify/flash-list';

const { height } = Dimensions.get('window');

interface SnapScrollProps {
    data: Array<{ title: string; text: string; id: number }>;
    renderItem: ({ item, index }: { item: { title: string; text: string }, index: number }) => JSX.Element;
    refreshing: boolean;
    onRefresh: () => void;
}

export default function SnapScroll({ data, renderItem, refreshing, onRefresh }: SnapScrollProps) {
    return (
        <FlashList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            snapToInterval={height} // Snap at multiples of screen height
            decelerationRate="fast" // Make scroll snappy
            snapToAlignment="start" // Snap to the top of the screen
            contentContainerStyle={styles.list}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            estimatedItemSize={height}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        // flex: 1,
    },
});
