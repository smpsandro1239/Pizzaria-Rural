import React from "react";
import { StyleSheet, Pressable, ViewStyle } from "react-native";
import { MotiView } from "moti";
import { useAppTheme } from "../theme";

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
<<<<<<< HEAD
  accessibilityLabel?: string;
}

export const Card: React.FC<CardProps> = ({ children, onPress, style, accessibilityLabel }) => {
=======
}

export const Card: React.FC<CardProps> = ({ children, onPress, style }) => {
>>>>>>> origin/main
  const { colors, spacing, radius, motion } = useAppTheme();

  const content = (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: motion.duration.normal,
      }}
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          padding: spacing.lg,
          borderRadius: radius.lg,
        },
        style,
      ]}
    >
      {children}
    </MotiView>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
<<<<<<< HEAD
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
=======
>>>>>>> origin/main
        style={({ pressed }) => [
          {
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
