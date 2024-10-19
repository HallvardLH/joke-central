import { View, TextInput, TextInputProps, StyleSheet, StyleProp, TextStyle } from "react-native";
import { textStyles } from "./Text";
import { componentColors, colors } from "../misc/Colors";
import Text from "./Text";

interface SmallInputFieldProps extends TextInputProps {
    label?: string;
    placeholderTextColor?: string;
    style?: StyleProp<TextStyle>;
}

export default function SmallInputField(props: SmallInputFieldProps) {
    const { label, placeholderTextColor = componentColors.text.placeholder, style, ...rest } = props;
    return (
        <View>
            {label && (
                <Text style={{ marginLeft: 20 }} shadow={false} color={colors.blue.medium}>{label}</Text>
            )}
            <TextInput
                style={[textStyles.text, { color: colors.blue.dark }, styles.input, style]}
                placeholderTextColor={placeholderTextColor}
                {...rest}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 20,
        textAlignVertical: "center",
        backgroundColor: "#C2FDFF",
        borderRadius: 50,
        minHeight: 40,
    },
})