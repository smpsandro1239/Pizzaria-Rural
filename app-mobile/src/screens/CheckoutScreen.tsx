import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../theme";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useCartStore } from "../store/cart-store";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CheckoutScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { items, total, clear } = useCartStore();
  const [loading, setLoading] = useState(false);

  const handleOrder = () => {
    setLoading(true);
    // Simular pedido
    setTimeout(() => {
      setLoading(false);
      clear();
      navigation.replace("Tracking", { orderId: "12345" });
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Finalizar Pedido</Text>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Dados de Entrega</Text>
        <Input label="Nome Completo" placeholder="Como o devemos chamar?" />
        <Input label="Telemóvel" placeholder="Para qualquer imprevisto" keyboardType="phone-pad" />
        <Input label="Morada de Entrega" placeholder="Onde a pizza deve bater à porta?" />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo</Text>
        {items.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={theme.typography.body}>{item.quantity}x {item.name}</Text>
            <Text style={theme.typography.body}>{(item.price * item.quantity).toFixed(2)} €</Text>
          </View>
        ))}
        <View style={styles.row}>
          <Text style={theme.typography.body}>Taxa de Entrega</Text>
          <Text style={theme.typography.body}>2,00 €</Text>
        </View>
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalPrice}>{(total() + 2).toFixed(2)} €</Text>
        </View>
      </Card>

      <Button label="Confirmar Encomenda" onPress={handleOrder} loading={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.ruralCream,
  },
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.ruralDark,
    marginBottom: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
    color: theme.colors.ruralDark,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.graySoft,
    paddingTop: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  totalText: {
    ...theme.typography.h3,
    color: theme.colors.ruralDark,
  },
  totalPrice: {
    ...theme.typography.h3,
    color: theme.colors.ruralRed,
  },
});
