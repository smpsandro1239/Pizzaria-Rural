import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { MotiView } from "moti";
import { theme } from "../theme";

const { width } = Dimensions.get("window");

export const SkeletonCard = () => {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "timing",
          duration: 1000,
          loop: true,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <MotiView
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "timing",
              duration: 1000,
              loop: true,
            }}
            style={styles.title}
          />
          <MotiView
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "timing",
              duration: 1000,
              loop: true,
            }}
            style={styles.badge}
          />
        </View>
        <MotiView
          from={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "timing",
            duration: 1000,
            loop: true,
          }}
          style={styles.description}
        />
        <MotiView
          from={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "timing",
            duration: 1000,
            loop: true,
          }}
          style={styles.descriptionShort}
        />
        <View style={styles.footer}>
          <MotiView
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "timing",
              duration: 1000,
              loop: true,
            }}
            style={styles.price}
          />
          <MotiView
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "timing",
              duration: 1000,
              loop: true,
            }}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing.lg,
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
    backgroundColor: theme.colors.graySoft,
  },
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  title: {
    width: "60%",
    height: 24,
    backgroundColor: theme.colors.graySoft,
    borderRadius: theme.radius.sm,
  },
  badge: {
    width: 80,
    height: 24,
    backgroundColor: theme.colors.graySoft,
    borderRadius: theme.radius.pill,
  },
  description: {
    width: "100%",
    height: 14,
    backgroundColor: theme.colors.graySoft,
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing.xs,
  },
  descriptionShort: {
    width: "80%",
    height: 14,
    backgroundColor: theme.colors.graySoft,
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing.lg,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    width: 60,
    height: 24,
    backgroundColor: theme.colors.graySoft,
    borderRadius: theme.radius.sm,
  },
  button: {
    width: 100,
    height: 36,
    backgroundColor: theme.colors.graySoft,
    borderRadius: theme.radius.pill,
  },
});
