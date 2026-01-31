import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { useAppTheme } from "../theme";

export const SkeletonCard = () => {
  const { colors, spacing, radius, isDark } = useAppTheme();
  const skeletonBg = isDark ? "#2C2C2E" : colors.graySoft;

  const skeletonProps = {
    from: { opacity: 0.5 },
    animate: { opacity: 1 },
    transition: {
      type: "timing" as const,
      duration: 1000,
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
          marginBottom: spacing.lg,
        },
      ]}
    >
      <MotiView {...skeletonProps} style={[styles.image, { backgroundColor: skeletonBg }]} />
      <View style={[styles.content, { padding: spacing.lg }]}>
        <View style={[styles.header, { marginBottom: spacing.md }]}>
          <MotiView
            {...skeletonProps}
            style={[styles.title, { backgroundColor: skeletonBg, borderRadius: radius.sm }]}
          />
          <MotiView
            {...skeletonProps}
            style={[styles.badge, { backgroundColor: skeletonBg, borderRadius: radius.pill }]}
          />
        </View>
        <MotiView
          {...skeletonProps}
          style={[
            styles.description,
            { backgroundColor: skeletonBg, borderRadius: radius.sm, marginBottom: spacing.xs },
          ]}
        />
        <MotiView
          {...skeletonProps}
          style={[
            styles.descriptionShort,
            { backgroundColor: skeletonBg, borderRadius: radius.sm, marginBottom: spacing.lg },
          ]}
        />
        <View style={styles.footer}>
          <MotiView
            {...skeletonProps}
            style={[styles.price, { backgroundColor: skeletonBg, borderRadius: radius.sm }]}
          />
          <MotiView
            {...skeletonProps}
            style={[styles.button, { backgroundColor: skeletonBg, borderRadius: radius.pill }]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    width: "60%",
    height: 24,
  },
  badge: {
    width: 80,
    height: 24,
  },
  description: {
    width: "100%",
    height: 14,
  },
  descriptionShort: {
    width: "80%",
    height: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    width: 60,
    height: 24,
  },
  button: {
    width: 100,
    height: 36,
  },
});
