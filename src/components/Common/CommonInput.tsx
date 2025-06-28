import {
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    StyleSheet,
} from "react-native";

import { InputFieldProps } from "../../types/type";
import { Feather } from '@expo/vector-icons';
import { useState } from "react";

const InputField = ({
    label,
    icon,
    secureTextEntry = false,
    labelStyle,
    containerStyle,
    inputStyle,
    iconStyle,
    PlaceHolder,
    ...props
}: InputFieldProps) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPasswordField = secureTextEntry;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.wrapper}>
                    <Text style={[styles.label, labelStyle]}>{label}</Text>
                    <View style={[styles.inputContainer, containerStyle]}>
                        {icon && (
                            <Image source={icon} style={[styles.icon, iconStyle]} />
                        )}
                        <TextInput
                            style={[styles.input, inputStyle]}
                            secureTextEntry={isPasswordField && !isPasswordVisible}
                            placeholder={PlaceHolder}
                            {...props}

                        />
                        {isPasswordField && (
                            <Text
                                onPress={() => setIsPasswordVisible(prev => !prev)}
                                style={styles.eyeToggle}
                            >
                                <Feather name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="#333" />
                            </Text>
                        )}


                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default InputField;

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 8,
        width: "100%",
    },
    label: {
        fontSize: 16,
        fontFamily: "JakartaSemiBold",
        marginBottom: 12,
        fontWeight:"semibold"
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#f5f5f5", // Tailwind's neutral-100
        borderRadius: 10, // full rounded
        borderWidth: 1,
        borderColor: "#f5f5f5", // same as bg, focus logic can be added with state
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 16,
    },
    input: {
        flex: 1,
        borderRadius: 10,
        padding: 16,
        fontFamily: "JakartaSemiBold",
        fontSize: 14,
        textAlign: "left",
    },
    eyeToggle: {
        position: "absolute",
        right: 16,
        fontSize: 18,
    },

});
