import { XStack, View, ScrollView } from "tamagui";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dispatch, SetStateAction } from "react";
import Avatar from "@/components/generalUI/Avatar";

interface AvatarSelectorCarouselProps {
    setAvatar: Dispatch<SetStateAction<number>>;
    avatar: number;
}

export const AVATAR_IDS = [
    // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    0
];

export default function AvatarSelectorCarousel(props: AvatarSelectorCarouselProps) {
    const { setAvatar, avatar } = props;

    return (
        <ScrollView horizontal={true} scrollbarWidth="none" showsHorizontalScrollIndicator={false}>
            <XStack gap={8} alignItems="center" >
                {AVATAR_IDS.map((index) => {
                    return (
                        <TouchableOpacity onPress={() => setAvatar(index)} key={index}>
                            <Avatar
                                size={index == avatar ? 70 : 50}
                                avatarURL={'https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/' + index + '.png'}
                            />
                        </TouchableOpacity>
                    )
                })}
            </XStack>
        </ScrollView>
    )
}