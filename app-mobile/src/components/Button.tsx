import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Platform
} from "react-native";
import { useAppTheme } from "../theme";
import { MotiView } from "moti";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}: ButtonProps) => {
  const { colors, radius, spacing, typography } = useAppTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          button: { backgroundColor: colors.primary },
          text: { color: "#FFFFFF" },
        };
      case "secondary":
        return {
          button: { backgroundColor: colors.secondary },
          text: { color: colors.background },
        };
      case "outline":
        return {
          button: { backgroundColor: "transparent", borderWidth: 1, borderColor: colors.border },
          text: { color: colors.text },
        };
      case "ghost":
        return {
          button: { backgroundColor: "transparent" },
          text: { color: colors.text },
        };
      case "danger":
        return {
          button: { backgroundColor: colors.error },
          text: { color: "#FFFFFF" },
        };
      default:
        return {
          button: { backgroundColor: colors.primary },
          text: { color: "#FFFFFF" },
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          button: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
          text: { fontSize: 14 },
        };
      case "lg":
        return {
          button: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xxl },
          text: { fontSize: 18 },
        };
      default:
        return {
          button: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl },
          text: { fontSize: 16 },
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.baseButton,
        { borderRadius: radius.md },
        variantStyles.button,
        sizeStyles.button,
        (disabled || loading) && { opacity: 0.5 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.text.color} />
      ) : (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={styles.content}
        >
          {icon && <MotiView style={{ marginRight: spacing.sm }}>{icon}</MotiView>}
          <Text style={[
            styles.text,
            typography.button,
            variantStyles.text,
            sizeStyles.text,
            textStyle
          ]}>
            {title}
          </Text>
        </MotiView>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
      }
    }),
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
