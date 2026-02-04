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
  const userPoints = 120;
  const discountPerPoint = 0.01;
  const maxPointsToUse = Math.min(userPoints, Math.floor((total() + 2) / discountPerPoint));
  const loyaltyDiscount = usePoints ? maxPointsToUse * discountPerPoint : 0;

  // Cupão
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "RURAL5") {
      setAppliedPromo({ code: "RURAL5", discount: 5.0 });
      showToast("Cupão de 5€ aplicado!");
    } else if (promoCode.toUpperCase() === "TELE20") {
      setAppliedPromo({ code: "TELE20", discount: total() * 0.2 });
      showToast("Cupão de 20% aplicado!");
    } else {
      showToast("Cupão inválido.", "error");
    }
  };

  const finalTotal = total() + 2 - loyaltyDiscount - (appliedPromo?.discount || 0);

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

      {/* Cupão de Desconto */}
      <Card style={{ ...styles.section, marginBottom: spacing.lg }}>
        <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.md }}>Cupão de Desconto</Text>
        <View style={styles.promoRow}>
          <View style={{ flex: 1, marginRight: spacing.sm }}>
            <Input
              placeholder="Ex: RURAL5"
              value={promoCode}
              onChangeText={setPromoCode}
              autoCapitalize="characters"
            />
          </View>
          <Button
            label="Aplicar"
            onPress={handleApplyPromo}
            style={{ height: 52, minHeight: 52 }}
          />
        </View>
        {appliedPromo && (
          <Text style={{ ...typography.caption, color: colors.success, marginTop: spacing.xs }}>
            Cupão {appliedPromo.code} ativo (-{appliedPromo.discount.toFixed(2)}€)
          </Text>
        )}
      </Card>

      <Card style={{ ...styles.section, marginBottom: spacing.lg, padding: spacing.md }}>
        <View style={styles.loyaltyRow}>
          <View style={{ flex: 1 }}>
            <Text style={{ ...typography.body, fontWeight: "700", color: colors.text }}>Usar Pontos de Fidelidade</Text>
            <Text style={{ ...typography.caption, color: colors.textSecondary }}>Tens {userPoints} pontos disponíveis</Text>
          </View>
          <Switch
            value={usePoints}
            onValueChange={setUsePoints}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
        </View>
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

        {loyaltyDiscount > 0 && (
          <View style={[styles.row, { marginBottom: spacing.sm }]}>
            <Text style={[typography.body, { color: colors.primary }]}>Desconto Fidelidade</Text>
            <Text style={[typography.body, { color: colors.primary }]}>- {loyaltyDiscount.toFixed(2)} €</Text>
          </View>
        )}

        {appliedPromo && (
          <View style={[styles.row, { marginBottom: spacing.sm }]}>
            <Text style={[typography.body, { color: colors.primary }]}>Desconto Cupão</Text>
            <Text style={[typography.body, { color: colors.primary }]}>- {appliedPromo.discount.toFixed(2)} €</Text>
          </View>
        )}

        <View style={[styles.row, styles.totalRow, { borderTopColor: colors.border, paddingTop: spacing.sm, marginTop: spacing.sm }]}>
          <Text style={[styles.totalText, { ...typography.h3, color: colors.text }]}>Total</Text>
          <Text style={[styles.totalPrice, { ...typography.h3, color: colors.primary }]}>{Math.max(0, finalTotal).toFixed(2)} €</Text>
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
  promoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  totalText: {},
  totalPrice: {},
});
