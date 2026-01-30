import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { useCartStore } from "../store/cart-store";
import { RootStackParamList } from "../navigation/types";
import { pizzasApi, Pizza } from "../api/pizzas";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const FavoritesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius } = useAppTheme();
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
          style={[styles.favoriteButton, { top: spacing.md, right: spacing.md, padding: spacing.xs, borderRadius: radius.pill }]}
          onPress={() => toggleFavorite(item.id)}
        >
          <MaterialCommunityIcons name="heart" size={24} color={colors.ruralRed} />
        </TouchableOpacity>
      </View>
      <View style={[styles.info, { padding: spacing.lg }]}>
        <View style={[styles.header, { marginBottom: spacing.sm }]}>
          <Text style={[styles.name, { ...typography.h3, color: colors.text }]}>{item.name}</Text>
          <Badge label={item.tag} />
        </View>
        <View style={styles.footer}>
          <Text style={[styles.price, { ...typography.h3, color: colors.ruralRed }]}>{item.price.toFixed(2)} €</Text>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.ruralRed, borderRadius: radius.pill, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm }]}
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
      <View style={[styles.emptyContainer, { backgroundColor: colors.background, padding: spacing.xl }]}>
        <MaterialCommunityIcons name="heart-outline" size={80} color={colors.border} />
        <Text style={[styles.emptyTitle, { ...typography.h2, color: colors.text, marginTop: spacing.lg }]}>Ainda não tens favoritos</Text>
        <Text style={[styles.emptySubtitle, { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm, marginBottom: spacing.xl }]}>Explora o nosso menu e guarda as pizzas que mais gostas!</Text>
        <Button
          label="Ver Menu"
          onPress={() => navigation.navigate("MainTabs", { screen: "Menu" } as any)}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={favoritePizzas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.list, { padding: spacing.lg }]}
        ListHeaderComponent={<Text style={[styles.title, { ...typography.h2, color: colors.text, marginBottom: spacing.lg }]}>Os Teus Favoritos</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {},
  title: {},
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {},
  emptySubtitle: {
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
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
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  info: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {},
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {},
  addButton: {},
  addButtonText: {
    color: "white",
    fontWeight: "700",
  },
});
