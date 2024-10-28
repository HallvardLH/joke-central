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
                uri: avatarURL ? avatarURL : process.env.EXPO_PUBLIC_DEFAULT_AVATAR_URL!,
            }} borderRadius={1000}></Image>
            {editable && (
                <View backgroundColor={"$accentBlueMedium"} style={{
                    position: "absolute",
                    bottom: -6,
                    right: -4,
                    padding: 6,
                    borderRadius: 100,
                }}>
                    <SquarePen color={"$background"} size={size / 4.5} style={{

                    }} />
                </View>
            )}
        </View>

    )
}