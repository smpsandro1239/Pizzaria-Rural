import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppTheme } from "../theme";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCartStore } from "../store/cart-store";
import { useAuthStore } from "../store/auth-store";
import { RootStackParamList } from "../navigation/types";
import { createOrder } from "../api/orders";
import { validateCoupon } from "../api/coupons";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CheckoutScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius } = useAppTheme();
  const { items, total, clear, showToast } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
    address: ""
  });

  const [usePoints, setUsePoints] = useState(false);
  const userPoints = user?.points || 0;
  const discountPerPoint = 0.01;
  const maxPointsToUse = Math.min(userPoints, Math.floor((total() + 2) / discountPerPoint));
  const loyaltyDiscount = usePoints ? maxPointsToUse * discountPerPoint : 0;

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; type: string; value: number } | null>(null);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setPromoLoading(true);
    try {
      const result = await validateCoupon(promoCode, total() * 100);
      setAppliedPromo(result);
      showToast("Cupão aplicado com sucesso!");
    } catch (err: any) {
      console.error(err);
      showToast(err.response?.data?.message || "Cupão inválido.", "error");
      setAppliedPromo(null);
    } finally {
      setPromoLoading(false);
    }
  };

  const calculatePromoDiscount = () => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === "PERCENT") {
        return (total() * appliedPromo.value) / 100;
    }
    return appliedPromo.value / 100; // FIXED value in cents
  };

  const promoDiscount = calculatePromoDiscount();
  const finalTotal = total() + 2 - loyaltyDiscount - promoDiscount;

  const handleOrder = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      showToast("Por favor, preencha todos os campos.", "error");
      return;
    }
    if (items.length === 0) {
      showToast("O seu carrinho está vazio.", "error");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        delivery: true,
        items: items.map(item => ({
          pizzaId: item.id,
          quantity: item.quantity
        }))
      };

      const result = await createOrder(orderPayload);

      clear();
      showToast("Pedido realizado com sucesso!");
      navigation.replace("Tracking", { orderId: result.id });
    } catch (err: any) {
      console.error(err);
      showToast(err.response?.data?.message || "Erro ao realizar pedido.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={[styles.content, { padding: spacing.lg }]}>
      <Text style={[styles.title, { ...typography.h2, color: colors.text, marginBottom: spacing.lg }]}>Finalizar Pedido</Text>

      <Card style={{ ...styles.section, marginBottom: spacing.lg }}>
        <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.md }}>Dados de Entrega</Text>
        <Input label="Nome Completo" value={formData.name} onChangeText={(text) => setFormData({ ...formData, name: text })} />
        <Input label="Telemóvel" keyboardType="phone-pad" value={formData.phone} onChangeText={(text) => setFormData({ ...formData, phone: text })} />
        <Input label="Morada de Entrega" value={formData.address} onChangeText={(text) => setFormData({ ...formData, address: text })} />
      </Card>

      <Card style={{ ...styles.section, marginBottom: spacing.lg }}>
        <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.md }}>Cupão de Desconto</Text>
        <View style={styles.promoRow}>
          <View style={{ flex: 1, marginRight: spacing.sm }}>
            <Input
                placeholder="Ex: RURAL10"
                value={promoCode}
                onChangeText={setPromoCode}
                autoCapitalize="characters"
                editable={!appliedPromo}
            />
          </View>
          {appliedPromo ? (
              <Button label="Remover" variant="outline" onPress={() => setAppliedPromo(null)} />
          ) : (
              <Button label="Aplicar" onPress={handleApplyPromo} loading={promoLoading} />
          )}
        </View>
        {appliedPromo && (
            <Text style={[typography.caption, { color: colors.success, marginTop: 4 }]}>
                Cupão {appliedPromo.code} aplicado (-{appliedPromo.type === 'PERCENT' ? `${appliedPromo.value}%` : `${(appliedPromo.value/100).toFixed(2)}€`})
            </Text>
        )}
      </Card>

      <Card style={{ ...styles.section, marginBottom: spacing.lg, padding: spacing.md }}>
        <View style={styles.loyaltyRow}>
          <View style={{ flex: 1 }}>
            <Text style={{ ...typography.body, fontWeight: "700", color: colors.text }}>Usar Pontos de Fidelidade</Text>
            <Text style={{ ...typography.caption, color: colors.textSecondary }}>Tens {userPoints} pontos disponíveis</Text>
          </View>
          <Switch value={usePoints} onValueChange={setUsePoints} trackColor={{ false: colors.border, true: colors.primary }} />
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
                <Text style={[typography.body, { color: colors.success }]}>Desconto Fidelidade</Text>
                <Text style={[typography.body, { color: colors.success }]}>- {loyaltyDiscount.toFixed(2)} €</Text>
            </View>
        )}
        {promoDiscount > 0 && (
            <View style={[styles.row, { marginBottom: spacing.sm }]}>
                <Text style={[typography.body, { color: colors.success }]}>Desconto Cupão</Text>
                <Text style={[typography.body, { color: colors.success }]}>- {promoDiscount.toFixed(2)} €</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {},
  title: {},
  section: {},
  promoRow: { flexDirection: 'row', alignItems: 'center' },
  loyaltyRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  totalRow: { borderTopWidth: 1 },
  totalText: {},
  totalPrice: {},
});
