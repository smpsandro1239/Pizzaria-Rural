import React from "react";
import { StyleSheet, Pressable, ViewStyle, AccessibilityRole } from "react-native";
import { MotiView } from "moti";
import { useAppTheme } from "../theme";

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  accessibilityLabel,
  accessibilityRole = onPress ? "button" : undefined,
}) => {
  const { colors, spacing, radius, motion } = useAppTheme();

  const containerStyle = [
    styles.container,
    {
      backgroundColor: colors.card,
      padding: spacing.lg,
      borderRadius: radius.lg,
    },
    style,
  ];

  const content = (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: motion.duration.normal,
      }}
      style={containerStyle}
      accessibilityLabel={onPress ? undefined : accessibilityLabel}
      accessibilityRole={onPress ? undefined : accessibilityRole}
    >
      {children}
    </MotiView>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: false }}
        accessibilityHint={accessibilityLabel ? undefined : "Toque para interagir"}
        style={({ pressed }) => [
          {
            transform: [{ scale: pressed ? 0.98 : 1 }],
            transition: `transform ${motion.duration.fast}ms`,
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