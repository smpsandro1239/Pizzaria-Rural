import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Platform,
  TouchableOpacity
} from "react-native";
import { useAppTheme } from "../theme";
import { MotiView } from "moti";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: "elevated" | "outline" | "ghost";
}

export const Card = ({
  children,
  style,
  onPress,
  variant = "outline"
}: CardProps) => {
  const { colors, radius, spacing } = useAppTheme();

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.base,
        {
          borderRadius: radius.lg,
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: variant === "outline" ? 1 : 0,
        },
        variant === "elevated" && styles.elevated,
        style,
      ]}
    >
      <MotiView
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 300 }}
      >
        {children}
      </MotiView>
    </Container>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
    padding: 16,
  },
  elevated: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }
    }),
  },
});
