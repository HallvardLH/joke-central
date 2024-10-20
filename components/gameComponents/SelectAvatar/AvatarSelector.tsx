import Avatar from "@/components/ui/generalUI/Avatar";
import { View, ScrollView, useTheme } from "tamagui";
import { TouchableOpacity, Dimensions } from "react-native";
import { AVATAR_IDS } from "@/constants/General";
import { Dispatch, SetStateAction } from "react";
import Button from "@/components/ui/buttons/Button";
import Text from "@/components/ui/generalUI/Text";
import ContentBox from "@/components/ui/generalUI/ContentBox";
import { Theme } from "tamagui";

interface AvatarSelectProps {
    avatarUrl: string,
    setAvatarUrl: Dispatch<SetStateAction<string>>;
    hideBack?: boolean;
    onBack: () => void;
    onSave: () => void;
}

const { width, height } = Dimensions.get('window');

export default function AvatarSelector({ avatarUrl, setAvatarUrl, hideBack, onBack, onSave }: AvatarSelectProps) {
    const theme = useTheme();
    return (
        // <View style={{
        //     justifyContent: "center",
        //     alignItems: "center",
        //     gap: 10,
        //     paddingBottom: 100,

        //     // flex: 1,
        // }}>
        <View style={{
            marginHorizontal: 24,
            gap: 14,
            alignItems: "center",
            backgroundColor: theme.background.val,
            padding: 14,
            borderRadius: 16,
            // paddingBottom: 100,
            maxHeight: height * 0.85
        }}>

            <Avatar
                size={100}
                avatarURL={avatarUrl}
            />
            <Text style={{ textAlign: "center" }} size={24}>Select an avatar</Text>
            <ScrollView borderRadius={20} contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                // padding: 20,
                alignItems: "center",
                justifyContent: "space-evenly",
                paddingBottom: 10,

            }}>
                {AVATAR_IDS.map((id) => (
                    <TouchableOpacity key={id} onPress={() => setAvatarUrl('https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/' + id + '.png')}>
                        <Avatar
                            size={90}
                            avatarURL={'https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/' + id + '.png'}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={{
                marginBottom: 20,
                marginTop: 10,
                flexDirection: "row",
                gap: 20,
            }}>
                {!hideBack && (
                    <Button
                        label="Back"
                        width={width * 0.40}
                        variant="pink"
                        onPress={onBack}
                    />
                )}
                <Button
                    label="Save"
                    width={width * (hideBack ? 0.8 : 0.4)}
                    variant="blue"
                    onPress={onSave}
                />
            </View>
        </View>
    )
}