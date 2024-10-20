import Avatar from "@/components/ui/generalUI/Avatar";
import { View, ScrollView } from "tamagui";
import { TouchableOpacity, Dimensions } from "react-native";
import { AVATAR_IDS } from "@/constants/General";
import { Dispatch, SetStateAction } from "react";
import Button from "@/components/ui/buttons/Button";

interface AvatarSelectProps {
    avatarUrl: string,
    setAvatarUrl: Dispatch<SetStateAction<string>>;
    onBack: () => void;
    onSave: () => void;
}

const { width } = Dimensions.get('window');

export default function AvatarSelector({ avatarUrl, setAvatarUrl, onBack, onSave }: AvatarSelectProps) {

    return (
        <View style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            paddingBottom: 100,
            // flex: 1,
        }}>
            <Avatar
                size={100}
                avatarURL={avatarUrl}
            />
            <ScrollView borderRadius={20} contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                padding: 20,
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
                <Button
                    label="Back"
                    width={width * 0.40}
                    variant="pink"
                    onPress={onBack}
                />
                <Button
                    label="Save"
                    width={width * 0.40}
                    variant="blue"
                    onPress={onSave}
                />
            </View>
        </View>
    )
}