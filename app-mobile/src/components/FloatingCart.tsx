import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../theme";

interface FloatingCartProps {
  count: number;
  total: number;
  onPress: () => void;
}

export const FloatingCart: React.FC<FloatingCartProps> = ({ count, total, onPress }) => {
  const { colors, spacing, radius, typography } = useAppTheme();
  if (count === 0) return null;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 50 }}
      style={[styles.container, { bottom: spacing.xl, left: spacing.lg, right: spacing.lg }]}
    >
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.ruralGreen, padding: spacing.lg, borderRadius: radius.lg }]} onPress={onPress}>
        <View style={styles.left}>
          <View style={[styles.badge, { backgroundColor: colors.ruralRed }]}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
          <MaterialCommunityIcons name="cart" size={24} color="white" />
        </View>
        <Text style={[styles.total, { ...typography.body, color: "white" }]}>{total.toFixed(2)} €</Text>
        <Text style={[styles.checkout, { ...typography.body, color: "white" }]}>Ver Carrinho</Text>
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
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
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },
  total: {
    fontWeight: "700",
  },
  checkout: {
    fontWeight: "700",
  },
});
