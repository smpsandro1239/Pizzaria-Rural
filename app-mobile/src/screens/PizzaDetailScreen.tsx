import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useAppTheme } from "../theme";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { AnimatedLoader } from "../components/AnimatedLoader";
import { IngredientSource } from "../components/IngredientSource";
import { StarRating } from "../components/StarRating";
import { ProductRecommendation } from "../components/ProductRecommendation";
import { Card } from "../components/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCartStore } from "../store/cart-store";
import { pizzasApi, PizzaSize, CrustType, ExtraIngredient, MOCK_EXTRAS } from "../api/pizzas";
import { MotiView, AnimatePresence } from "moti";

export const PizzaDetailScreen = ({ route }: any) => {
  const { colors, spacing, typography, radius } = useAppTheme();
  const { addItem, favorites, toggleFavorite, showToast } = useCartStore();
  const pizzaId = route.params?.id;

  const [pizza, setPizza] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Configurador Passo-a-Passo
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>(null);
  const [selectedCrust, setSelectedCrust] = useState<CrustType | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<ExtraIngredient[]>([]);

  // Estados para Review
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true);
        const data = await pizzasApi.getPizzas();
        const found = data.find((p: any) => p.id === pizzaId);

        if (found) {
          setPizza(found);
          setSelectedSize(found.sizes[1]); // Média
          setSelectedCrust(found.crusts[1]); // Clássica
          setRecommendations(data.filter((p: any) => p.id !== pizzaId).slice(0, 3));
        } else {
          setError("Pizza não encontrada.");
        }
      } catch (err) {
        setError("Erro ao carregar detalhes.");
      } finally {
        setLoading(false);
      }
    };

    if (pizzaId) {
      fetchPizza();
    }
  }, [pizzaId]);

  const toggleExtra = (extra: ExtraIngredient) => {
    setSelectedExtras(prev =>
      prev.find(e => e.id === extra.id)
        ? prev.filter(e => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const calculateTotalPrice = () => {
    if (!pizza) return 0;
    const base = pizza.basePrice * (selectedSize?.multiplier || 1);
    const crust = selectedCrust?.price || 0;
    const extras = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    return base + crust + extras;
  };

  const handleAddToCart = () => {
    const extrasText = selectedExtras.length > 0 ? ` + ${selectedExtras.map(e => e.name).join(", ")}` : "";
    addItem({
      id: `${pizza.id}-${selectedSize?.id}-${selectedCrust?.id}-${selectedExtras.map(e => e.id).join("-")}`,
      name: `${pizza.name} (${selectedSize?.name}, ${selectedCrust?.name}${extrasText})`,
      price: calculateTotalPrice()
    });
  };

  if (loading) return <View style={[styles.centered, { backgroundColor: colors.background }]}><AnimatedLoader /></View>;
  if (error || !pizza) return <View style={[styles.centered, { backgroundColor: colors.background }]}><Text style={{ color: colors.error }}>{error}</Text></View>;

  const isFav = favorites.includes(pizza.id);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.imageContainer, { height: 250 }]}>
        <Image source={{ uri: pizza.image }} style={styles.image} />
        <TouchableOpacity
          style={[styles.favoriteButton, { top: spacing.md, right: spacing.md, padding: spacing.sm, borderRadius: radius.pill }]}
          onPress={() => toggleFavorite(pizza.id)}
        >
          <MaterialCommunityIcons name={isFav ? "heart" : "heart-outline"} size={28} color={isFav ? colors.primary : "white"} />
        </TouchableOpacity>
      </View>

      <View style={[styles.content, { padding: spacing.lg, backgroundColor: colors.surface, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, marginTop: -20 }]}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={[typography.h1, { color: colors.text, fontSize: 24 }]}>{pizza.name}</Text>
            <StarRating rating={pizza.rating} count={pizza.reviewsCount} size={16} />
          </View>
          <Badge label={pizza.tag} />
        </View>

        {/* Indicador de Passos */}
        <View style={styles.stepIndicator}>
          {[1, 2, 3].map(step => (
            <View key={step} style={[styles.stepDot, { backgroundColor: currentStep >= step ? colors.primary : colors.border }]} />
          ))}
        </View>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <MotiView from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0, translateX: 20 }} key="step1">
              <Text style={[typography.h3, { marginBottom: spacing.md }]}>1. Escolha o Tamanho</Text>
              <View style={styles.optionGrid}>
                {pizza.sizes.map((s: PizzaSize) => (
                  <TouchableOpacity key={s.id} onPress={() => setSelectedSize(s)} style={[styles.optionCard, { borderColor: selectedSize?.id === s.id ? colors.primary : colors.border, backgroundColor: selectedSize?.id === s.id ? colors.primary + '10' : colors.white }]}>
                    <Text style={[typography.body, { fontWeight: '700', color: selectedSize?.id === s.id ? colors.primary : colors.text }]}>{s.name}</Text>
                    <Text style={[typography.caption, { color: colors.textSecondary }]}>x{s.multiplier}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Button label="Próximo: Massa" onPress={() => setCurrentStep(2)} style={{ marginTop: spacing.lg }} />
            </MotiView>
          )}

          {currentStep === 2 && (
            <MotiView from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0, translateX: 20 }} key="step2">
              <Text style={[typography.h3, { marginBottom: spacing.md }]}>2. Tipo de Massa</Text>
              <View style={styles.optionGrid}>
                {pizza.crusts.map((c: CrustType) => (
                  <TouchableOpacity key={c.id} onPress={() => setSelectedCrust(c)} style={[styles.optionCard, { borderColor: selectedCrust?.id === c.id ? colors.primary : colors.border, backgroundColor: selectedCrust?.id === c.id ? colors.primary + '10' : colors.white }]}>
                    <Text style={[typography.body, { fontWeight: '700', color: selectedCrust?.id === c.id ? colors.primary : colors.text }]}>{c.name}</Text>
                    {c.price > 0 && <Text style={[typography.caption, { color: colors.primary }]}>+${c.price.toFixed(2)}€</Text>}
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.stepButtons}>
                <Button label="Voltar" variant="ghost" onPress={() => setCurrentStep(1)} style={{ flex: 1 }} />
                <Button label="Próximo: Extras" onPress={() => setCurrentStep(3)} style={{ flex: 2 }} />
              </View>
            </MotiView>
          )}

          {currentStep === 3 && (
            <MotiView from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0, translateX: 20 }} key="step3">
              <Text style={[typography.h3, { marginBottom: spacing.md }]}>3. Adicionar Extras</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
                {MOCK_EXTRAS.map((e) => {
                  const isActive = selectedExtras.find(x => x.id === e.id);
                  return (
                    <TouchableOpacity key={e.id} onPress={() => toggleExtra(e)} style={[styles.extraItem, { borderColor: isActive ? colors.primary : colors.border, backgroundColor: isActive ? colors.primary : colors.white }]}>
                      <Text style={{ color: isActive ? 'white' : colors.text, fontWeight: '600' }}>{e.name}</Text>
                      <Text style={{ color: isActive ? 'white' : colors.primary, fontSize: 12 }}>+${e.price.toFixed(2)}€</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <View style={styles.stepButtons}>
                <Button label="Voltar" variant="ghost" onPress={() => setCurrentStep(2)} style={{ flex: 1 }} />
                <Button label="Finalizar Escolha" onPress={() => setCurrentStep(4)} style={{ flex: 2 }} />
              </View>
            </MotiView>
          )}

          {currentStep === 4 && (
            <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key="summary">
              <Text style={[typography.h3, { marginBottom: spacing.md }]}>Resumo da tua Pizza</Text>
              <Card style={{ marginBottom: spacing.lg }}>
                <Text style={typography.body}>Tamanho: <Text style={{ fontWeight: '700' }}>{selectedSize?.name}</Text></Text>
                <Text style={typography.body}>Massa: <Text style={{ fontWeight: '700' }}>{selectedCrust?.name}</Text></Text>
                {selectedExtras.length > 0 && (
                  <Text style={typography.body}>Extras: <Text style={{ fontWeight: '700' }}>{selectedExtras.map(e => e.name).join(", ")}</Text></Text>
                )}
              </Card>
              <View style={styles.footer}>
                <Text style={[typography.h2, { color: colors.primary }]}>{calculateTotalPrice().toFixed(2)} €</Text>
                <Button label="Adicionar ao Carrinho" onPress={handleAddToCart} />
              </View>
              <TouchableOpacity onPress={() => setCurrentStep(1)} style={{ marginTop: spacing.md, alignItems: 'center' }}>
                <Text style={{ color: colors.textSecondary }}>Recomeçar configuração</Text>
              </TouchableOpacity>
            </MotiView>
          )}
        </AnimatePresence>

        <View style={{ marginTop: spacing.xxl }}>
           <ProductRecommendation pizzas={recommendations} onPress={(id) => {}} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  imageContainer: { position: "relative", width: "100%" },
  image: { width: "100%", height: "100%" },
  favoriteButton: { position: "absolute", backgroundColor: "rgba(0,0,0,0.3)" },
  content: { },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
  stepIndicator: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  stepDot: { width: 40, height: 4, borderRadius: 2, marginHorizontal: 4 },
  optionGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  optionCard: { width: '48%', padding: 16, borderWidth: 2, borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  stepButtons: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  extraItem: { paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1, borderRadius: 20, marginRight: 10, alignItems: 'center' },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
});
