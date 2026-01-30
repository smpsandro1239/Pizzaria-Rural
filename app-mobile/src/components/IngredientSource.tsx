import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../theme";

interface IngredientSourceProps {
  ingredient: string;
  source: string;
  icon: string;
}

export const IngredientSource: React.FC<IngredientSourceProps> = ({ ingredient, source, icon }) => {
  const { colors, spacing, typography, radius } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, padding: spacing.md, borderRadius: radius.md, marginBottom: spacing.sm }]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.ruralCream, marginRight: spacing.md }]}>
        <MaterialCommunityIcons name={icon as any} size={20} color={colors.ruralRed} />
      </View>
      <View>
        <Text style={[styles.ingredient, { ...typography.caption, color: colors.textSecondary }]}>{ingredient}</Text>
        <Text style={[styles.source, { ...typography.body, color: colors.text, fontWeight: "700" }]}>{source}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  ingredient: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  source: {
    fontSize: 14,
  },
});
