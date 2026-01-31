import React from "react";
import { StyleSheet, Text } from "react-native";
import { MotiView } from "moti";
import { useAppTheme } from "../theme";

interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "error" | "info";
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = "info" }) => {
  const { colors, spacing, radius, typography } = useAppTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case "success":
        return colors.ruralGreen;
      case "warning":
        return "#f59e0b";
      case "error":
        return "#dc2626";
      default:
        return colors.ruralRed;
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        damping: 14,
      }}
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xs,
          borderRadius: radius.pill,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            ...typography.caption,
            color: colors.white,
          },
        ]}
      >
        {label}
      </Text>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
  },
  text: {
    fontWeight: "700",
  },
});
