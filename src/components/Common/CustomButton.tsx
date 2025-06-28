import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { ButtonProps } from "../../types/type";

const getBgVariantStyle = (
  variant: ButtonProps["bgVariant"],
  backgroundColor?: string
): ViewStyle => {
  if (backgroundColor) return { backgroundColor };

  switch (variant) {
    case "primary":
      return { backgroundColor: "#55847A" };
    case "danger":
      return { backgroundColor: "#EF4444" };
    case "success":
      return { backgroundColor: "#22C55E" };
    case "outline":
      return {
        backgroundColor: "transparent",
        borderColor: "#D4D4D4",
        borderWidth: 0.5,
      };
    default:
      return { backgroundColor: "#0286FF" };
  }
};

const getTextVariantStyle = (
  variant: ButtonProps["textVariant"],
  textColor?: string
): TextStyle => {
  if (textColor) return { color: textColor };

  switch (variant) {
    case "primary":
      return { color: "#000000" };
    case "secondary":
      return { color: "#F3F4F6" };
    case "danger":
      return { color: "#FEE2E2" };
    case "success":
      return { color: "#DCFCE7" };
    default:
      return { color: "#FFFFFF" };
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  backgroundColor,
  textColor,
  height,
  width,
  IconLeft,
  IconRight,
  style,
  textStyle,
  ...props
}: ButtonProps & {
  backgroundColor?: string;
  textColor?: string;
  height?: number | string;
  width?: number | string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        getBgVariantStyle(bgVariant, backgroundColor),
        { height, width },
        style,
      ]}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        style={[
          styles.buttonText,
          getTextVariantStyle(textVariant, textColor),
          textStyle,
        ]}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
});
