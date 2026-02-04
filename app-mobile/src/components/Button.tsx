import React from "react";
import { Text, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import { MotiView } from "moti";
import { useAppTheme } from "../theme";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  accessibilityLabel,
}) => {
  const { colors, spacing, radius, typography, motion } = useAppTheme();

  const getVariantStyle = () => {
    switch (variant) {
      case "secondary":
        return { backgroundColor: colors.ruralGreen };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colors.ruralRed,
        };
      case "ghost":
        return { backgroundColor: "transparent" };
      case "destructive":
        return { backgroundColor: "#dc2626" };
      default:
        return { backgroundColor: colors.ruralRed };
    }
  };

  const getTextColor = () => {
    if (variant === "outline" || variant === "ghost") {
      return colors.ruralRed;
    }
    return colors.white;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      style={({ pressed }) => [
        styles.container,
        getVariantStyle(),
        {
          opacity: disabled || pressed ? 0.7 : 1,
          paddingVertical: spacing.lg,
          paddingHorizontal: spacing.xl,
          borderRadius: radius.pill,
        },
      ]}
    >
      <MotiView
        animate={{
          scale: disabled ? 1 : 1,
        }}
        transition={{
          type: "timing",
          duration: motion.duration.fast,
        }}
        style={styles.inner}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} testID="button-loader" />
        ) : (
          <Text
            style={[
              styles.text,
              {
                ...typography.body,
                color: getTextColor(),
              },
            ]}
          >
            {label}
          </Text>
        )}
      </MotiView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontWeight: "600",
  },
});
