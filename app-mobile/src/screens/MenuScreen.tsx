import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../theme";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { AnimatedLoader } from "../components/AnimatedLoader";
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
  const { addItem, items, total } = useCartStore();
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

  const renderItem = ({ item }: { item: Pizza }) => (
    <Card style={styles.card} onPress={() => navigation.navigate("PizzaDetail", { id: item.id })}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          <Badge label={item.tag} />
        </View>
        <Text style={styles.description}>{item.description}</Text>
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

  if (loading) {
    return (
      <View style={styles.centered}>
        <AnimatedLoader />
        <Text style={styles.loadingText}>A carregar sabores...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button label="Tentar Novamente" onPress={fetchPizzas} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.title}>As Nossas Pizzas</Text>
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
    backgroundColor: theme.colors.ruralCream,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.ruralCream,
  },
  loadingText: {
    ...theme.typography.body,
    marginTop: theme.spacing.md,
    color: theme.colors.ruralDark,
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.ruralRed,
    marginBottom: theme.spacing.lg,
    textAlign: "center",
  },
  list: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.lg,
    color: theme.colors.ruralDark,
  },
  card: {
    marginBottom: theme.spacing.lg,
    padding: 0,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  name: {
    ...theme.typography.h3,
    color: theme.colors.ruralDark,
  },
  description: {
    ...theme.typography.caption,
    color: "#666",
    marginBottom: theme.spacing.md,
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
