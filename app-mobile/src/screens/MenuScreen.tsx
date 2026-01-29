import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../theme";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { useCartStore } from "../store/cart-store";
import { FloatingCart } from "../components/FloatingCart";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PIZZAS = [
  {
    id: "1",
    name: "Margherita Rural",
    description: "Massa fina, molho de tomate caseiro e mozzarella fresca.",
    price: 8.5,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=300&q=80",
    tag: "Clássica",
  },
  {
    id: "2",
    name: "Pepperoni da Serra",
    description: "Pepperoni crocante com um toque picante da nossa serra.",
    price: 9.5,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80",
    tag: "Popular",
  },
  {
    id: "3",
    name: "Veggie da Horta",
    description: "Legumes frescos grelhados e manjericão fresco.",
    price: 9.0,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80",
    tag: "Vegetariana",
  },
];

export const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addItem, items, total } = useCartStore();

  const renderItem = ({ item }: { item: typeof PIZZAS[0] }) => (
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

  return (
    <View style={styles.container}>
      <FlatList
        data={PIZZAS}
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
