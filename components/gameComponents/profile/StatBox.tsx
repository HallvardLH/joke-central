import { StyleSheet } from "react-native";
import { View } from "tamagui";
import Text from "@/components/ui/generalUI/Text";
import { useTheme } from "tamagui";

interface StatBoxProps {
    amount: string,
    label: string,
}

export default function StatBox(props: StatBoxProps) {
    const { amount, label } = props;
    const theme = useTheme();
    return (
        <View style={styles.container}>
            <Text shadow={theme.enableShadow.val === 1} color={theme.background.val} size={22}>{amount}</Text>
            <Text shadow={theme.enableShadow.val === 1} color={theme.background.val} size={16}>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between"

    }
})