import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useAppTheme } from "../theme";
import { Card } from "./Card";

type RecommendationProps = {
  pizzas: any[];
  onPress: (id: string) => void;
};

export const ProductRecommendation = ({ pizzas, onPress }: RecommendationProps) => {
  const { colors, spacing, typography, radius } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { ...typography.h3, color: colors.text, marginBottom: spacing.md }]}>Também pode gostar...</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {pizzas.map((pizza) => (
          <TouchableOpacity key={pizza.id} onPress={() => onPress(pizza.id)} activeOpacity={0.8}>
            <Card style={{ ...styles.card, width: 160, marginRight: spacing.md }}>
              <Image source={{ uri: pizza.image }} style={[styles.image, { borderRadius: radius.md, marginBottom: spacing.xs }]} />
              <Text numberOfLines={1} style={[styles.name, { ...typography.body, fontWeight: "600", color: colors.text }]}>{pizza.name}</Text>
              <Text style={[styles.price, { ...typography.caption, color: colors.primary, fontWeight: "700" }]}>Desde {pizza.basePrice?.toFixed(2)} €</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 8 },
  title: {},
  scroll: { paddingBottom: 4 },
  card: { padding: 8 },
  image: { width: "100%", height: 100 },
  name: {},
  price: {},
});
