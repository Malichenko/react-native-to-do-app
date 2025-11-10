import type { StyleProp, ViewStyle, TextStyle } from "react-native";
import { Text, Pressable, StyleSheet } from "react-native";

type Variant = "primary" | "secondary" | "danger";

type VariantStyles = {
  container: StyleProp<ViewStyle>;
  containerPressed: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
};

const getVariantStyles = (variant: Variant = "primary"): VariantStyles => {
  switch (variant) {
    case "primary":
      return {
        container: styles.primaryButton,
        containerPressed: styles.primaryButtonPressed,
        text: styles.primaryButtonText,
      };
    case "secondary":
      return {
        container: styles.secondaryButton,
        containerPressed: styles.secondaryButtonPressed,
        text: styles.secondaryButtonText,
      };
    case "danger":
      return {
        container: styles.dangerButton,
        containerPressed: styles.dangerButtonPressed,
        text: styles.dangerButtonText,
      };
    default:
      return {
        container: styles.primaryButton,
        containerPressed: styles.primaryButtonPressed,
        text: styles.primaryButtonText,
      };
  }
};

type ButtonProps = {
  children: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const Button = ({
  children,
  onPress,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
}: ButtonProps) => {
  const variantStyles = getVariantStyles(variant);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variantStyles.container,
        pressed && !disabled && variantStyles.containerPressed,
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          variantStyles.text,
          disabled && styles.buttonTextDisabled,
          textStyle,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonTextDisabled: {
    opacity: 0.7,
  },
  primaryButton: {
    backgroundColor: "#6366f1",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonPressed: {
    backgroundColor: "#4f46e5",
  },
  primaryButtonText: {
    color: "#ffffff",
  },
  secondaryButton: {
    backgroundColor: "#f3f4f6",
  },
  secondaryButtonPressed: {
    backgroundColor: "#e5e7eb",
  },
  secondaryButtonText: {
    color: "#6b7280",
  },
  dangerButton: {
    backgroundColor: "tomato",
    shadowColor: "tomato",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  dangerButtonPressed: {
    backgroundColor: "#ff6f61",
  },
  dangerButtonText: {
    color: "#ffffff",
  },
});
