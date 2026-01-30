import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { MotiView } from "moti";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { SkeletonCard } from "../components/SkeletonCard";
import { Button } from "../components/Button";
import { useCartStore } from "../store/cart-store";
import { FloatingCart } from "../components/FloatingCart";
import { RootStackParamList } from "../navigation/types";
import { pizzasApi } from "../api/pizzas";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
}

export const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius } = useAppTheme();
  const { addItem, items, total, favorites, toggleFavorite } = useCartStore();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPizzas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pizzasApi.getPizzas();
      setPizzas(data);
    } catch (err) {
      setError("Não foi possível carregar o menu. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const renderItem = ({ item, index }: { item: Pizza; index: number }) => {
    const isFav = favorites.includes(item.id);

    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 100 }}
      >
        <Card style={styles.card} onPress={() => navigation.navigate("PizzaDetail", { id: item.id })}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(item.id)}
            >
              <MaterialCommunityIcons
                name={isFav ? "heart" : "heart-outline"}
                size={24}
                color={isFav ? colors.ruralRed : "white"}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.info, { padding: spacing.lg }]}>
            <View style={[styles.header, { marginBottom: spacing.xs }]}>
              <Text style={[styles.name, { ...typography.h3, color: colors.text }]}>{item.name}</Text>
              <Badge label={item.tag} />
            </View>
            <Text style={[styles.description, { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.md }]}>
              {item.description}
            </Text>
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
      </MotiView>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={[1, 2, 3]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <SkeletonCard />}
          contentContainerStyle={[styles.list, { padding: spacing.lg }]}
          ListHeaderComponent={
            <Text style={[styles.title, { ...typography.h2, color: colors.text, marginBottom: spacing.lg }]}>
              As Nossas Pizzas
            </Text>
          }
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background, padding: spacing.xl }]}>
        <Text style={[styles.errorText, { ...typography.body, color: colors.error, marginBottom: spacing.lg }]}>
          {error}
        </Text>
        <Button label="Tentar Novamente" onPress={fetchPizzas} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ ...styles.list, padding: spacing.lg }}
        ListHeaderComponent={
          <Text style={{ ...styles.title, ...typography.h2, color: colors.text, marginBottom: spacing.lg }}>
            As Nossas Pizzas
          </Text>
        }
      />
      <FloatingCart
        count={items.length}
        total={total()}
        onPress={() => navigation.navigate("Checkout")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {},
  errorText: {
    textAlign: "center",
  },
  list: {},
  title: {},
  card: {
    marginBottom: 16,
    padding: 0,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 180,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 6,
    borderRadius: 99,
  },
  info: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {},
  description: {},
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
