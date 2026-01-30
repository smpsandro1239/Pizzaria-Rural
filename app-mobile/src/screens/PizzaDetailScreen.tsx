import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { AnimatedLoader } from "../components/AnimatedLoader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCartStore } from "../store/cart-store";
import { pizzasApi } from "../api/pizzas";

export const PizzaDetailScreen = ({ route }: any) => {
  const { addItem, favorites, toggleFavorite } = useCartStore();
  const pizzaId = route.params?.id;
  const [pizza, setPizza] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true);
        const data = await pizzasApi.getPizzas();
        const found = data.find((p: any) => p.id === pizzaId);
        if (found) {
          setPizza(found);
        } else {
          setError("Pizza não encontrada.");
        }
      } catch (err) {
        setError("Erro ao carregar detalhes.");
      } finally {
        setLoading(false);
      }
    };

    if (pizzaId) {
      fetchPizza();
    }
  }, [pizzaId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <AnimatedLoader />
      </View>
    );
  }

  if (error || !pizza) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || "Algo correu mal."}</Text>
      </View>
    );
  }

  const isFav = pizza && favorites.includes(pizza.id);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: pizza.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(pizza.id)}
        >
          <MaterialCommunityIcons
            name={isFav ? "heart" : "heart-outline"}
            size={32}
            color={isFav ? theme.colors.ruralRed : theme.colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{pizza.name}</Text>
          <Badge label={pizza.tag} />
        </View>
        <Text style={styles.description}>{pizza.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{pizza.price.toFixed(2)} €</Text>
          <Button
            label="Adicionar ao Carrinho"
            onPress={() => addItem({ id: pizza.id, name: pizza.name, price: pizza.price })}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.ruralRed,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: theme.spacing.xl,
    right: theme.spacing.xl,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: theme.spacing.sm,
    borderRadius: theme.radius.pill,
  },
  content: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    marginTop: -theme.spacing.xl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  name: {
    ...theme.typography.h1,
    color: theme.colors.ruralDark,
  },
  description: {
    ...theme.typography.body,
    color: "#666",
    lineHeight: 24,
    marginBottom: theme.spacing.xxl,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    ...theme.typography.h2,
    color: theme.colors.ruralRed,
  },
});
