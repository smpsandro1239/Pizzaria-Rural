import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppTheme } from "../theme";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { SwipeableRow } from "../components/SwipeableRow";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCartStore } from "../store/cart-store";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CheckoutScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius } = useAppTheme();
  const { items, total, clear, showToast, addItem, removeItem, addresses } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "Sandro",
    phone: "912345678",
    address: addresses.find(a => a.isDefault)?.street || ""
  });

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
        {addresses.length > 0 && (
          <View style={{ marginTop: spacing.md }}>
            <Text style={{ ...typography.caption, color: colors.textSecondary, marginBottom: spacing.sm }}>Ou escolhe uma morada guardada:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {addresses.map((a) => (
                <TouchableOpacity
                  key={a.id}
                  onPress={() => setFormData({ ...formData, address: a.street })}
                  style={{
                    padding: spacing.sm,
                    backgroundColor: formData.address === a.street ? colors.ruralRed + "20" : colors.background,
                    borderRadius: radius.sm,
                    marginRight: spacing.sm,
                    borderWidth: 1,
                    borderColor: formData.address === a.street ? colors.ruralRed : colors.border,
                  }}
                >
                  <Text style={{ ...typography.caption, color: formData.address === a.street ? colors.ruralRed : colors.text }}>{a.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </Card>

      <View style={{ marginBottom: spacing.lg }}>
        <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.sm }}>Acompanhamentos?</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {SUGGESTIONS.map((s) => (
            <TouchableOpacity
              key={s.id}
              onPress={() => addItem({ id: s.id, name: s.name, price: s.price })}
              style={{
                backgroundColor: colors.surface,
                padding: spacing.md,
                borderRadius: radius.md,
                marginRight: spacing.sm,
                borderWidth: 1,
                borderColor: colors.border,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name={s.icon as any} size={20} color={colors.ruralRed} style={{ marginRight: spacing.xs }} />
              <View>
                <Text style={{ ...typography.caption, color: colors.text, fontWeight: "700" }}>{s.name}</Text>
                <Text style={{ ...typography.caption, color: colors.ruralRed }}>+ {s.price.toFixed(2)} €</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Card style={{ ...styles.section, marginBottom: spacing.lg }}>
        <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.md }}>Resumo (Desliza para remover)</Text>
        {items.map((item) => (
          <SwipeableRow key={item.id} onDelete={() => removeItem(item.id)}>
            <View style={[styles.row, { marginBottom: spacing.sm, backgroundColor: colors.surface, padding: spacing.xs, borderRadius: 8 }]}>
              <Text style={[typography.body, { color: colors.text }]}>{item.quantity}x {item.name}</Text>
              <Text style={[typography.body, { color: colors.text }]}>{(item.price * item.quantity).toFixed(2)} €</Text>
            </View>
          </SwipeableRow>
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

const SUGGESTIONS = [
  { id: "s1", name: "Sumo Natural", price: 2.5, icon: "cup" },
  { id: "s2", name: "Mousse de Chocolate", price: 3.5, icon: "food-variant" },
];

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
