import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppTheme } from "../theme";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCartStore } from "../store/cart-store";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CheckoutScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius } = useAppTheme();
  const { items, total, clear, showToast, addItem } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });

  // Fidelidade
  const [usePoints, setUsePoints] = useState(false);
  const userPoints = 120; // Mock: sincronizado com AccountScreen
  const discountPerPoint = 0.01;
  const maxPointsToUse = Math.min(userPoints, Math.floor((total() + 2) / discountPerPoint));
  const discount = usePoints ? maxPointsToUse * discountPerPoint : 0;

  const handleOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      showToast("Por favor, preenche todos os campos.", "error");
      return;
    }

    if (items.length === 0) {
      showToast("O teu carrinho está vazio.", "error");
      return;
    }

    setLoading(true);
    // Simular pedido
    setTimeout(() => {
      setLoading(false);
      clear();
      showToast(
        usePoints 
          ? `Pedido realizado! Resgataste ${maxPointsToUse} pontos.` 
          : "Pedido realizado com sucesso!"
      );
      navigation.replace("Tracking", { orderId: "12345" });
    }, 2000);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={[styles.content, { padding: spacing.lg }]}
      accessibilityLabel="Ecrã de finalização de encomenda"
    >
      <Text style={[styles.title, { ...typography.h2, color: colors.text, marginBottom: spacing.lg }]}>Finalizar Pedido</Text>

      <Card style={[styles.section, { marginBottom: spacing.lg }]}>
        <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.md }}>Dados de Entrega</Text>
        <Input
          label="Nome Completo"
          placeholder="Como te devemos chamar?"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          accessibilityLabel="Campo de nome completo"
        />
        <Input
          label="Telemóvel"
          placeholder="Para qualquer imprevisto"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          accessibilityLabel="Campo de número de telemóvel"
        />
        <Input
          label="Morada de Entrega"
          placeholder="Onde a pizza deve bater à porta?"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          accessibilityLabel="Campo de morada de entrega"
        />
      </Card>

      <View style={{ marginBottom: spacing.lg }}>
        <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.sm }}>Acompanhamentos?</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          accessibilityLabel="Sugestões de acompanhamentos"
        >
          {SUGGESTIONS.map((s) => (
            <TouchableOpacity
              key={s.id}
              onPress={() => addItem({ id: s.id, name: s.name, price: s.price, quantity: 1 })}
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
              accessibilityRole="button"
              accessibilityLabel={`Adicionar ${s.name} ao carrinho por ${s.price.toFixed(2)} euros`}
            >
              <MaterialCommunityIcons 
                name={s.icon as any} 
                size={20} 
                color={colors.ruralRed} 
                style={{ marginRight: spacing.xs }} 
              />
              <View>
                <Text style={{ ...typography.caption, color: colors.text, fontWeight: "700" }}>{s.name}</Text>
                <Text style={{ ...typography.caption, color: colors.ruralRed }}>+ {s.price.toFixed(2)} €</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Card style={[styles.section, { marginBottom: spacing.lg, padding: spacing.md }]}>
        <View style={styles.loyaltyRow}>
          <View style={{ flex: 1 }}>
            <Text style={{ ...typography.body, fontWeight: "700", color: colors.text }}>Usar Pontos de Fidelidade</Text>
            <Text style={{ ...typography.caption, color: colors.textSecondary }}>Tens {userPoints} pontos disponíveis</Text>
          </View>
          <Switch
            value={usePoints}
            onValueChange={setUsePoints}
            trackColor={{ false: colors.border, true: colors.ruralRed }}
            thumbColor={usePoints ? colors.white : colors.textSecondary}
            accessibilityLabel="Ativar uso de pontos de fidelidade"
            accessibilityHint={usePoints ? "Pontos ativados" : "Pontos desativados"}
          />
        </View>
        {usePoints && (
          <Text style={{ ...typography.caption, color: colors.ruralRed, marginTop: spacing.xs }}>
            Desconto de {discount.toFixed(2)} € aplicado!
          </Text>
        )}
      </Card>

      <Card style={[styles.section, { marginBottom: spacing.lg }]}>
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
        {usePoints && (
          <View style={[styles.row, { marginBottom: spacing.sm }]}>
            <Text style={[typography.body, { color: colors.ruralRed }]}>Desconto (Fidelidade)</Text>
            <Text style={[typography.body, { color: colors.ruralRed }]}>- {discount.toFixed(2)} €</Text>
          </View>
        )}
        <View style={[styles.row, styles.totalRow, { borderTopColor: colors.border, paddingTop: spacing.sm, marginTop: spacing.sm }]}>
          <Text style={[styles.totalText, { ...typography.h3, color: colors.text }]}>Total</Text>
          <Text style={[styles.totalPrice, { ...typography.h3, color: colors.ruralRed }]}>{(total() + 2 - discount).toFixed(2)} €</Text>
        </View>
      </Card>

      <Button 
        label="Confirmar Encomenda" 
        onPress={handleOrder} 
        loading={loading}
        accessibilityLabel={`Confirmar encomenda no valor de ${(total() + 2 - discount).toFixed(2)} euros`}
      />
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
  content: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
  },
  section: {
    padding: 16,
  },
  loyaltyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalRow: {
    borderTopWidth: 1,
  },
  totalText: {
    fontWeight: "700",
  },
  totalPrice: {
    fontWeight: "800",
  },
});