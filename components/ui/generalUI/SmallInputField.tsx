import { View, TextInput, TextInputProps, StyleSheet, StyleProp, TextStyle } from "react-native";
import { textStyles } from "./Text";
import { componentColors, colors } from "../misc/Colors";
import Text from "./Text";
import { useTheme } from "tamagui";

interface SmallInputFieldProps extends TextInputProps {
    label?: string;
    placeholderTextColor?: string;
    style?: StyleProp<TextStyle>;
}

export default function SmallInputField(props: SmallInputFieldProps) {
    const { label, placeholderTextColor = componentColors.text.placeholder, style, ...rest } = props;
    const theme = useTheme();

    const styles = StyleSheet.create({
        input: {
            paddingHorizontal: 20,
            textAlignVertical: "center",
            backgroundColor: theme.background.val,
            borderColor: theme.accentPurpleDarkest.val,
            borderWidth: 3,
            borderRadius: 15,
            minHeight: 42,
        },
    })

    return (
        <View>
            {label && (
                <Text style={{ marginLeft: 20 }} shadow={false} color={colors.blue.medium}>{label}</Text>
            )}
            <TextInput
                style={[textStyles.text, { color: theme.text1.val }, styles.input, style]}
                placeholderTextColor={theme.textPlaceholder.val}
                {...rest}
            />
        </View>
    )
}