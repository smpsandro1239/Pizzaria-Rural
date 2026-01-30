import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../theme";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { useCartStore } from "../store/cart-store";
import { RootStackParamList } from "../navigation/types";
import { pizzasApi, Pizza } from "../api/pizzas";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const FavoritesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addItem, favorites, toggleFavorite } = useCartStore();
  const [favoritePizzas, setFavoritePizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const allPizzas = await pizzasApi.getPizzas();
        const filtered = allPizzas.filter((p) => favorites.includes(p.id));
        setFavoritePizzas(filtered);
      } catch (err) {
        console.error("Erro ao carregar favoritos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  const renderItem = ({ item }: { item: Pizza }) => (
    <Card style={styles.card} onPress={() => navigation.navigate("PizzaDetail", { id: item.id })}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <MaterialCommunityIcons name="heart" size={24} color={theme.colors.ruralRed} />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          <Badge label={item.tag} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>{item.price.toFixed(2)} €</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addItem({ id: item.id, name: item.name, price: item.price })}
          >
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  if (favoritePizzas.length === 0 && !loading) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="heart-outline" size={80} color={theme.colors.graySoft} />
        <Text style={styles.emptyTitle}>Ainda não tens favoritos</Text>
        <Text style={styles.emptySubtitle}>Explora o nosso menu e guarda as pizzas que mais gostas!</Text>
        <Button
          label="Ver Menu"
          onPress={() => navigation.navigate("MainTabs", { screen: "Menu" } as any)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritePizzas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.title}>Os Teus Favoritos</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.ruralCream,
  },
  list: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.lg,
    color: theme.colors.ruralDark,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.ruralCream,
  },
  emptyTitle: {
    ...theme.typography.h2,
    marginTop: theme.spacing.lg,
    color: theme.colors.ruralDark,
  },
  emptySubtitle: {
    ...theme.typography.body,
    textAlign: "center",
    color: "#666",
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  card: {
    marginBottom: theme.spacing.lg,
    padding: 0,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 150,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.pill,
  },
  info: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  name: {
    ...theme.typography.h3,
    color: theme.colors.ruralDark,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    ...theme.typography.h3,
    color: theme.colors.ruralRed,
  },
  addButton: {
    backgroundColor: theme.colors.ruralRed,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.pill,
  },
  addButtonText: {
    color: theme.colors.white,
    fontWeight: "700",
  },
});
