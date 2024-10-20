import { XStack, View, ScrollView } from "tamagui";
import { TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction } from "react";
import Avatar from "@/components/ui/generalUI/Avatar";
import { AVATAR_IDS } from "@/constants/General";

interface AvatarSelectorCarouselProps {
    setAvatar: Dispatch<SetStateAction<number>>;
    avatar: number;
}

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