import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { theme } from "../theme";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { useCartStore } from "../store/cart-store";

export const PizzaDetailScreen = ({ route }: any) => {
  const { addItem } = useCartStore();
  // Em produção, buscaríamos os dados pelo ID
  const pizza = {
    id: route.params?.id || "1",
    name: "Margherita Rural",
    description: "Massa fina, molho de tomate caseiro, mozzarella fresca e manjericão. Uma receita tradicional que nunca falha.",
    price: 8.5,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=600&q=80",
    tag: "Clássica",
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: pizza.image }} style={styles.image} />
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
  image: {
    width: "100%",
    height: 300,
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
