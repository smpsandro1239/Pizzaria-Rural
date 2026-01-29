import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../theme";

interface FloatingCartProps {
  count: number;
  total: number;
  onPress: () => void;
}

export const FloatingCart: React.FC<FloatingCartProps> = ({ count, total, onPress }) => {
  if (count === 0) return null;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 50 }}
      style={styles.container}
    >
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.left}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
          <MaterialCommunityIcons name="cart" size={24} color={theme.colors.white} />
        </View>
        <Text style={styles.total}>{total.toFixed(2)} €</Text>
        <Text style={styles.checkout}>Ver Carrinho</Text>
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: theme.spacing.xl,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 10,
  },
  button: {
    backgroundColor: theme.colors.ruralGreen,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    backgroundColor: theme.colors.ruralRed,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -10,
    left: -10,
    zIndex: 1,
  },
  badgeText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: "700",
  },
  total: {
    ...theme.typography.body,
    color: theme.colors.white,
    fontWeight: "700",
  },
  checkout: {
    ...theme.typography.body,
    color: theme.colors.white,
    fontWeight: "700",
  },
});
