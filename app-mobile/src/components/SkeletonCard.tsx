import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { useAppTheme } from "../theme";

export const SkeletonCard = () => {
  const { colors, spacing, radius } = useAppTheme();
  const skeletonBg = colors.graySoft;

  const skeletonProps = {
    from: { opacity: 0.5 },
    animate: { opacity: 0.8 },
    transition: {
      type: "timing" as const,
      duration: 800,
      loop: true,
    },
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderRadius: radius.lg,
          borderColor: colors.border,
          borderWidth: 1,
          marginBottom: spacing.lg,
        },
      ]}
    >
      <MotiView {...skeletonProps} style={[styles.image, { backgroundColor: skeletonBg }]} />
      <View style={{ padding: spacing.md }}>
        <MotiView
          {...skeletonProps}
          style={[styles.title, { backgroundColor: skeletonBg, borderRadius: radius.xs }]}
        />
        <MotiView
          {...skeletonProps}
          style={[styles.price, { backgroundColor: skeletonBg, borderRadius: radius.xs, marginTop: 8 }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { overflow: "hidden" },
  image: { width: "100%", height: 140 },
  title: { width: "70%", height: 20 },
  price: { width: "30%", height: 20 },
});
