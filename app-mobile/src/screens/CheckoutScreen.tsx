import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppTheme } from "../theme";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useCartStore } from "../store/cart-store";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CheckoutScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography } = useAppTheme();
  const { items, total, clear, showToast } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });

  const handleOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      showToast("Por favor, preencha todos os campos.", "error");
      return;
    }

    if (items.length === 0) {
      showToast("O seu carrinho está vazio.", "error");
      return;
    }

    setLoading(true);
    // Simular pedido
    setTimeout(() => {
      setLoading(false);
      clear();
      showToast("Pedido realizado com sucesso!");
      navigation.replace("Tracking", { orderId: "12345" });
    }, 2000);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={[styles.content, { padding: spacing.lg }]}>
      <Text style={[styles.title, { ...typography.h2, color: colors.text, marginBottom: spacing.lg }]}>Finalizar Pedido</Text>

      <Card style={{ ...styles.section, marginBottom: spacing.lg }}>
        <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.md }}>Dados de Entrega</Text>
        <Input
          label="Nome Completo"
          placeholder="Como o devemos chamar?"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        <Input
          label="Telemóvel"
          placeholder="Para qualquer imprevisto"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
        />
        <Input
          label="Morada de Entrega"
          placeholder="Onde a pizza deve bater à porta?"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
        />
      </Card>

      <Card style={{ ...styles.section, marginBottom: spacing.lg }}>
        <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.md }}>Resumo</Text>
        {items.map((item) => (
          <View key={item.id} style={[styles.row, { marginBottom: spacing.sm }]}>
            <Text style={[typography.body, { color: colors.text }]}>{item.quantity}x {item.name}</Text>
            <Text style={[typography.body, { color: colors.text }]}>{(item.price * item.quantity).toFixed(2)} €</Text>
          </View>
        ))}
        <View style={[styles.row, { marginBottom: spacing.sm }]}>
          <Text style={[typography.body, { color: colors.text }]}>Taxa de Entrega</Text>
          <Text style={[typography.body, { color: colors.text }]}>2,00 €</Text>
        </View>
        <View style={[styles.row, styles.totalRow, { borderTopColor: colors.border, paddingTop: spacing.sm, marginTop: spacing.sm }]}>
          <Text style={[styles.totalText, { ...typography.h3, color: colors.text }]}>Total</Text>
          <Text style={[styles.totalPrice, { ...typography.h3, color: colors.ruralRed }]}>{(total() + 2).toFixed(2)} €</Text>
        </View>
      </Card>

      <Button label="Confirmar Encomenda" onPress={handleOrder} loading={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {},
  title: {},
  section: {},
  sectionTitle: {},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalRow: {
    borderTopWidth: 1,
  },
  totalText: {},
  totalPrice: {},
});
