import React from "react";
import { StyleSheet, Text } from "react-native";
import { MotiView } from "moti";
import { theme } from "../theme";

interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "error" | "info";
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = "info" }) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case "success":
        return theme.colors.ruralGreen;
      case "warning":
        return "#f59e0b";
      case "error":
        return "#dc2626";
      default:
        return theme.colors.ruralRed;
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
      style={[styles.container, { backgroundColor: getBackgroundColor() }]}
    >
      <Text style={styles.text}>{label}</Text>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.pill,
    alignSelf: "flex-start",
  },
  text: {
    ...theme.typography.caption,
    color: theme.colors.white,
    fontWeight: "700",
  },
});
