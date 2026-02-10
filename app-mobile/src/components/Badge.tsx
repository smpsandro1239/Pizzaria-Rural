import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { useAppTheme } from "../theme";

interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "success" | "outline" | "danger";
  style?: ViewStyle;
}

export const Badge = ({ label, variant = "primary", style }: BadgeProps) => {
  const { colors, radius, spacing } = useAppTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return { bg: colors.primary + "15", text: colors.primary };
      case "secondary":
        return { bg: colors.secondary + "15", text: colors.secondary };
      case "success":
        return { bg: colors.success + "15", text: colors.success };
      case "danger":
        return { bg: colors.error + "15", text: colors.error };
      case "outline":
        return { bg: "transparent", text: colors.textSecondary, border: 1 };
      default:
        return { bg: colors.graySoft, text: colors.textSecondary };
    }
  };

  const v = getVariantStyles();

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: v.bg,
        borderRadius: radius.full,
        borderColor: colors.border,
        borderWidth: v.border || 0,
      },
      style
    ]}>
      <Text style={[styles.text, { color: v.text }]}>{label.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
