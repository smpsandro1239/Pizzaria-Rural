import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useAppTheme } from "../theme";
import { Card } from "./Card";
<<<<<<< Updated upstream
import { StarRating } from "./StarRating";
=======
>>>>>>> Stashed changes

type RecommendationProps = {
  pizzas: any[];
  onPress: (id: string) => void;
};

export const ProductRecommendation = ({ pizzas, onPress }: RecommendationProps) => {
  const { colors, spacing, typography, radius } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { ...typography.h3, color: colors.text, marginBottom: spacing.md }]}>
        Também pode gostar...
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {pizzas.map((pizza) => (
<<<<<<< Updated upstream
          <TouchableOpacity
            key={pizza.id}
=======
          <TouchableOpacity
            key={pizza.id}
>>>>>>> Stashed changes
            onPress={() => onPress(pizza.id)}
            activeOpacity={0.8}
          >
            <Card style={{ ...styles.card, width: 160, marginRight: spacing.md }}>
<<<<<<< Updated upstream
              <Image
                source={{ uri: pizza.image }}
                style={[styles.image, { borderRadius: radius.md, marginBottom: spacing.xs }]}
=======
              <Image
                source={{ uri: pizza.image }}
                style={[styles.image, { borderRadius: radius.md, marginBottom: spacing.xs }]}
>>>>>>> Stashed changes
              />
              <Text numberOfLines={1} style={[styles.name, { ...typography.body, fontWeight: "600", color: colors.text }]}>
                {pizza.name}
              </Text>
<<<<<<< Updated upstream
              <Text style={[styles.price, { ...typography.caption, color: colors.ruralRed, fontWeight: "700" }]}>
                {pizza.price.toFixed(2)} €
=======
              <Text style={[styles.price, { ...typography.caption, color: colors.primary, fontWeight: "700" }]}>
                Desde {pizza.basePrice?.toFixed(2) || pizza.price?.toFixed(2)} €
>>>>>>> Stashed changes
              </Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  title: {},
  scroll: {
    paddingBottom: 4,
  },
  card: {
    padding: 8,
  },
  image: {
    width: "100%",
    height: 100,
  },
  name: {},
  price: {},
});
