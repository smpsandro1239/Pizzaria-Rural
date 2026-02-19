import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform,
  TextInput
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useAppTheme } from "../theme";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { RootStackParamList } from "../navigation/types";
import { pizzasApi, Pizza, Size, Crust } from "../api/pizzas";
import { reviewsApi } from "../api/reviews";
import { useCartStore } from "../store/cart-store";
import { useAuthStore } from "../store/auth-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

type RoutePropType = RouteProp<RootStackParamList, 'PizzaDetail'>;
const { width } = Dimensions.get('window');

const STEPS = ["Tamanho", "Massa", "Resumo"];

export const PizzaDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RoutePropType>();
  const { id } = route.params;
  const { colors, spacing, typography, radius } = useAppTheme();
  const { addItem, showToast } = useCartStore();
  const { user } = useAuthStore();

  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [crusts, setCrusts] = useState<Crust[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedCrust, setSelectedCrust] = useState<Crust | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Review states
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, s, c] = await Promise.all([
          pizzasApi.getPizza(id),
          pizzasApi.getSizes(),
          pizzasApi.getCrusts()
        ]);
        setPizza(p);
        setSizes(s);
        setCrusts(c);

        const defaultSize = s.find(size => size.name === "Média") || s[0];
        setSelectedSize(defaultSize || null);

        const defaultCrust = c.find(crust => crust.name === "Tradicional") || c[0];
        setSelectedCrust(defaultCrust || null);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!pizza) return null;

  const currentPrice = () => {
    let base = pizza.price;
    if (selectedSize && pizza.sizePrices) {
        const sp = pizza.sizePrices.find(p => p.sizeId === selectedSize.id);
        if (sp) base = sp.price;
    }
    const extra = selectedCrust?.extraPrice || 0;
    return (base + extra) * quantity;
  };

  const handleAddToCart = () => {
    addItem({
      id: pizza.id,
      name: `${pizza.name} (${selectedSize?.name}, ${selectedCrust?.name})`,
      price: currentPrice() / (quantity * 100),
      image: pizza.imageUrl || pizza.image || "",
      quantity: quantity,
    });
    navigation.goBack();
  };

  const handleSubmittingReview = async () => {
    if (!user) {
        showToast("Inicie sessão para avaliar.", "error");
        return;
    }
    setSubmittingReview(true);
    try {
        await reviewsApi.createReview({
            pizzaId: pizza.id,
            rating: newRating,
            comment: newComment,
            userName: user.name || user.email
        });
        showToast("Avaliação submetida!");
        setNewComment("");
        // Refresh pizza to get new reviews
        const updated = await pizzasApi.getPizza(id);
        setPizza(updated);
    } catch (err) {
        showToast("Erro ao submeter avaliação.", "error");
    } finally {
        setSubmittingReview(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Tamanho
        return (
          <MotiView from={{ opacity: 0, translateX: 50 }} animate={{ opacity: 1, translateX: 0 }} key="size">
            <Text style={[typography.h3, { marginBottom: spacing.md }]}>Escolha o Tamanho</Text>
            {sizes.map(size => (
              <TouchableOpacity
                key={size.id}
                style={[
                  styles.optionCard,
                  {
                    backgroundColor: selectedSize?.id === size.id ? colors.primary + '10' : colors.surface,
                    borderColor: selectedSize?.id === size.id ? colors.primary : colors.border,
                    borderRadius: radius.md,
                    padding: spacing.md,
                    marginBottom: spacing.sm,
                    borderWidth: 1
                  }
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <View style={styles.optionInfo}>
                    <Text style={[typography.bodyBold, { color: colors.text }]}>{size.name}</Text>
                    <Text style={[typography.caption, { color: colors.textSecondary }]}>Multiplicador: x{size.multiplier}</Text>
                </View>
                {selectedSize?.id === size.id && <MaterialCommunityIcons name="check-circle" size={24} color={colors.primary} />}
              </TouchableOpacity>
            ))}
          </MotiView>
        );
      case 1: // Massa
        return (
          <MotiView from={{ opacity: 0, translateX: 50 }} animate={{ opacity: 1, translateX: 0 }} key="crust">
            <Text style={[typography.h3, { marginBottom: spacing.md }]}>Tipo de Massa</Text>
            {crusts.map(crust => (
              <TouchableOpacity
                key={crust.id}
                style={[
                  styles.optionCard,
                  {
                    backgroundColor: selectedCrust?.id === crust.id ? colors.primary + '10' : colors.surface,
                    borderColor: selectedCrust?.id === crust.id ? colors.primary : colors.border,
                    borderRadius: radius.md,
                    padding: spacing.md,
                    marginBottom: spacing.sm,
                    borderWidth: 1
                  }
                ]}
                onPress={() => setSelectedCrust(crust)}
              >
                <View style={styles.optionInfo}>
                    <Text style={[typography.bodyBold, { color: colors.text }]}>{crust.name}</Text>
                    {crust.extraPrice > 0 && <Text style={[typography.caption, { color: colors.primary }]}>+${(crust.extraPrice/100).toFixed(2)}€</Text>}
                </View>
                {selectedCrust?.id === crust.id && <MaterialCommunityIcons name="check-circle" size={24} color={colors.primary} />}
              </TouchableOpacity>
            ))}
          </MotiView>
        );
      case 2: // Resumo + Reviews
        return (
            <MotiView from={{ opacity: 0, translateX: 50 }} animate={{ opacity: 1, translateX: 0 }} key="summary">
                <Text style={[typography.h3, { marginBottom: spacing.md }]}>Configuração Final</Text>
                <Card style={{ padding: spacing.md }}>
                    <View style={styles.summaryRow}>
                        <Text style={typography.body}>Tamanho:</Text>
                        <Text style={typography.bodyBold}>{selectedSize?.name}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={typography.body}>Massa:</Text>
                        <Text style={typography.bodyBold}>{selectedCrust?.name}</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />
                    <View style={styles.quantitySection}>
                        <Text style={typography.bodyBold}>Quantidade</Text>
                        <View style={[styles.quantityRow, { backgroundColor: colors.graySoft, borderRadius: radius.pill }]}>
                            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
                                <MaterialCommunityIcons name="minus" size={20} color={colors.text} />
                            </TouchableOpacity>
                            <Text style={[typography.h3, { marginHorizontal: spacing.lg }]}>{quantity}</Text>
                            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyBtn}>
                                <MaterialCommunityIcons name="plus" size={20} color={colors.text} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>

                {/* Reviews Section */}
                <View style={{ marginTop: spacing.xl }}>
                    <Text style={[typography.h3, { marginBottom: spacing.md }]}>Avaliações</Text>

                    {/* Add Review */}
                    {user && (
                        <View style={[styles.reviewForm, { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border }]}>
                            <Text style={typography.bodyBold}>Deixe a sua opinião</Text>
                            <View style={styles.starRow}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <TouchableOpacity key={star} onPress={() => setNewRating(star)}>
                                        <MaterialCommunityIcons
                                            name={star <= newRating ? "star" : "star-outline"}
                                            size={24}
                                            color={colors.primary}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <TextInput
                                style={[styles.reviewInput, { backgroundColor: colors.background, color: colors.text, borderRadius: radius.sm, padding: spacing.sm, marginTop: spacing.sm }]}
                                placeholder="Comentário (opcional)..."
                                value={newComment}
                                onChangeText={setNewComment}
                                multiline
                            />
                            <Button
                                label="Submeter"
                                size="small"
                                onPress={handleSubmittingReview}
                                loading={submittingReview}
                                style={{ marginTop: spacing.md }}
                            />
                        </View>
                    )}

                    {pizza.reviews && pizza.reviews.length > 0 ? (
                        pizza.reviews.map(review => (
                            <View key={review.id} style={[styles.reviewCard, { borderBottomColor: colors.border, paddingVertical: spacing.md }]}>
                                <View style={styles.reviewHeader}>
                                    <Text style={typography.bodyBold}>{review.userName}</Text>
                                    <View style={styles.starRow}>
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <MaterialCommunityIcons key={s} name={s <= review.rating ? "star" : "star-outline"} size={14} color={colors.primary} />
                                        ))}
                                    </View>
                                </View>
                                {review.comment && <Text style={[typography.body, { color: colors.textSecondary, marginTop: 4 }]}>{review.comment}</Text>}
                            </View>
                        ))
                    ) : (
                        <Text style={[typography.caption, { color: colors.textSecondary }]}>Ainda não há avaliações para esta pizza.</Text>
                    )}
                </View>
            </MotiView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Image source={{ uri: pizza.imageUrl || pizza.image }} style={styles.image} />
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: 'white' }]}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="chevron-left" size={28} color="black" />
          </TouchableOpacity>
        </MotiView>

        <View style={[styles.content, { padding: spacing.lg }]}>
          <Text style={[typography.h1, { color: colors.text }]}>{pizza.name}</Text>
          <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.xl }]}>{pizza.description}</Text>

          <View style={styles.stepperHeader}>
             {STEPS.map((step, idx) => (
                 <View key={step} style={styles.stepIndicator}>
                    <View style={[
                        styles.stepDot,
                        { backgroundColor: currentStep >= idx ? colors.primary : colors.border }
                    ]} />
                    <Text style={[
                        typography.caption,
                        { color: currentStep >= idx ? colors.primary : colors.textSecondary, marginTop: 4, fontWeight: currentStep === idx ? '700' : '400' }
                    ]}>{step}</Text>
                 </View>
             ))}
          </View>

          <View style={{ minHeight: 400 }}>
             {renderStepContent()}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, {
        padding: spacing.lg,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border
      }]}>
        <View style={{ marginRight: spacing.xl }}>
            <Text style={typography.caption}>Total Estimado</Text>
            <Text style={[typography.h2, { color: colors.primary }]}>{(currentPrice() / 100).toFixed(2)}€</Text>
        </View>

        {currentStep < STEPS.length - 1 ? (
            <Button
                title="Próximo Passo"
                onPress={() => setCurrentStep(currentStep + 1)}
                style={{ flex: 1 }}
                icon={<MaterialCommunityIcons name="arrow-right" size={20} color="white" />}
            />
        ) : (
            <Button
                title="Adicionar ao Carrinho"
                onPress={handleAddToCart}
                style={{ flex: 1 }}
                icon={<MaterialCommunityIcons name="cart-outline" size={20} color="white" />}
            />
        )}
      </View>
    </View>
  );
};

const Card = ({ children, style }: any) => {
    const { colors, radius } = useAppTheme();
    return <View style={[{ backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border }, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: width, height: 300 },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  content: { borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -30, backgroundColor: 'white' },
  stepperHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32, paddingHorizontal: 10 },
  stepIndicator: { alignItems: 'center', flex: 1 },
  stepDot: { width: 40, height: 4, borderRadius: 2 },
  optionCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  optionInfo: { flex: 1 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  divider: { height: 1, marginVertical: 16 },
  quantitySection: { alignItems: 'center', marginTop: 8 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', padding: 8, marginTop: 12 },
  qtyBtn: { padding: 8 },
  footer: { flexDirection: 'row', alignItems: 'center' },
  reviewForm: { marginTop: 16 },
  starRow: { flexDirection: 'row', marginVertical: 8 },
  reviewInput: { minHeight: 60, textAlignVertical: 'top' },
  reviewCard: { borderBottomWidth: 1 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
