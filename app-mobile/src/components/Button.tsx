import React from "react";
import { Text, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import { MotiView, MotiText } from "moti";
import { theme } from "../theme";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "secondary":
        return { backgroundColor: theme.colors.ruralGreen };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: theme.colors.ruralRed,
        };
      case "ghost":
        return { backgroundColor: "transparent" };
      case "destructive":
        return { backgroundColor: "#dc2626" };
      default:
        return { backgroundColor: theme.colors.ruralRed };
    }
  };

  const getTextColor = () => {
    if (variant === "outline" || variant === "ghost") {
      return theme.colors.ruralRed;
    }
    return theme.colors.white;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.container,
        getVariantStyle(),
        { opacity: disabled || pressed ? 0.7 : 1 },
      ]}
    >
      <MotiView
        animate={{
          scale: disabled ? 1 : 1,
        }}
        transition={{
          type: "timing",
          duration: theme.motion.duration.fast,
        }}
        style={styles.inner}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} testID="button-loader" />
        ) : (
          <Text style={[styles.text, { color: getTextColor() }]}>{label}</Text>
        )}
      </MotiView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.pill,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...theme.typography.body,
    fontWeight: "600",
  },
});
