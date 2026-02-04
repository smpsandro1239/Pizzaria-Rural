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
        return { backgroundColor: colors.ruralRedDestructive || "#dc2626" };
      default:
        return { backgroundColor: colors.ruralRed };
    }
  };

  const getTextColor = () => {
    if (variant === "outline" || variant === "ghost") {
      return colors.ruralRed;
    }
    if (variant === "destructive") {
      return colors.white;
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
      accessibilityHint={loading ? "A carregar" : undefined}
      style={({ pressed }) => [
        styles.container,
        getVariantStyle(),
        {
          opacity: disabled || loading ? 0.6 : pressed ? 0.85 : 1,
          paddingVertical: spacing.lg,
          paddingHorizontal: spacing.xl,
          borderRadius: radius.pill,
          borderWidth: variant === "outline" ? 2 : 0,
          borderColor: variant === "outline" ? colors.ruralRed : "transparent",
        },
      ]}
    >
      <MotiView
        animate={{
          scale: loading ? 0.95 : 1,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 200,
        }}
        style={styles.inner}
      >
        {loading ? (
          <ActivityIndicator 
            color={getTextColor()} 
            size="small"
            accessibilityLabel={`${label} a carregar`}
            testID="button-loader"
          />
        ) : (
          <Text
            style={[
              styles.text,
              typography.button,
              {
                color: getTextColor(),
                fontFamily: typography.fontFamily.bold,
              },
            ]}
            selectable={false}
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
    minWidth: 120,
    overflow: "hidden",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});