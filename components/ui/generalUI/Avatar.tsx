import { Image, View } from "tamagui"
import { SquarePen } from "@tamagui/lucide-icons";

interface AvatarProps {
    /** 
    * @property Size: The height and width of the picture, which have to be the same number
    * Defaults to 48
    */
    size?: number,
    avatarURL?: string,
    editable?: boolean;
    avatarBackgroundColor?: string,
}

export default function Avatar(props: AvatarProps) {
    const { size = 48, avatarURL, editable, avatarBackgroundColor = "$accentPurpleDark" } = props;
    return (
        <View>
            <Image height={size} width={size} backgroundColor={avatarBackgroundColor} source={{
                uri: avatarURL ? avatarURL : `https://oprhztiruewgtiajcdmo.supabase.co/storage/v1/object/public/avatars/default.png`,
            }} borderRadius={1000}></Image>
            {editable && (
                <View backgroundColor={'$main2'} style={{
                    position: "absolute",
                    bottom: -6,
                    right: -6,
                    padding: 6,
                    borderRadius: 100,
                }}>
                    <SquarePen size={size / 3.5} style={{

                    }} />
                </View>
            )}
        </View>

    )
}