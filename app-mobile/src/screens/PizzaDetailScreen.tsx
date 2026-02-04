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
import { pizzasApi, PizzaSize } from "../api/pizzas";

export const PizzaDetailScreen = ({ route }: any) => {
  const { colors, spacing, typography, radius } = useAppTheme();
  const { addItem, favorites, toggleFavorite, showToast } = useCartStore();
  const pizzaId = route.params?.id;

  const [pizza, setPizza] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para Tamanho
  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>(null);

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
          setSelectedSize(found.sizes[1]); // Selecionar Média por padrão
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

  const handleSubmitReview = () => {
    if (userRating === 0) {
      showToast("Por favor, seleciona uma classificação.", "error");
      return;
    }
    setIsSubmittingReview(true);
    setTimeout(() => {
      setIsSubmittingReview(false);
      setUserRating(0);
      setUserComment("");
      showToast("Obrigado pela tua avaliação!");
    }, 1500);
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <AnimatedLoader />
      </View>
    );
  }

  if (error || !pizza) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { ...typography.body, color: colors.error }]}>
          {error || "Algo correu mal."}
        </Text>
      </View>
    );
  }

  const isFav = pizza && favorites.includes(pizza.id);
  const currentPrice = pizza.basePrice * (selectedSize?.multiplier || 1);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.imageContainer, { height: 300 }]}>
        <Image source={{ uri: pizza.image }} style={styles.image} />
        <TouchableOpacity
          style={[styles.favoriteButton, { top: spacing.xl, right: spacing.xl, padding: spacing.sm, borderRadius: radius.pill }]}
          onPress={() => toggleFavorite(pizza.id)}
        >
          <MaterialCommunityIcons
            name={isFav ? "heart" : "heart-outline"}
            size={32}
            color={isFav ? colors.primary : "white"}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.content, { padding: spacing.xl, backgroundColor: colors.surface, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, marginTop: -spacing.xl }]}>
        <View style={[styles.header, { marginBottom: spacing.sm }]}>
          <Text style={[styles.name, { ...typography.h1, color: colors.text }]}>{pizza.name}</Text>
          <Badge label={pizza.tag} />
        </View>
        <View style={{ marginBottom: spacing.md }}>
          <StarRating rating={pizza.rating} count={pizza.reviewsCount} size={20} />
        </View>

        <Text style={[styles.description, { ...typography.body, color: colors.textSecondary, marginBottom: spacing.xl }]}>
          {pizza.description}
        </Text>

        {/* Seleção de Tamanho */}
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>Escolha o Tamanho</Text>
          <View style={styles.sizeRow}>
            {pizza.sizes.map((size: PizzaSize) => (
              <TouchableOpacity
                key={size.id}
                onPress={() => setSelectedSize(size)}
                style={[
                  styles.sizeButton,
                  {
                    borderColor: selectedSize?.id === size.id ? colors.primary : colors.border,
                    backgroundColor: selectedSize?.id === size.id ? colors.primary : colors.white,
                    borderRadius: radius.md
                  }
                ]}
              >
                <Text style={[typography.caption, { color: selectedSize?.id === size.id ? 'white' : colors.text, fontWeight: '700' }]}>
                  {size.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={[styles.sectionTitle, { ...typography.h3, color: colors.text, marginBottom: spacing.md }]}>
          Origem dos Ingredientes 🌿
        </Text>
        <IngredientSource ingredient="Farinha" source="Moinho da Aldeia (Grão Biológico)" icon="corn" />
        <IngredientSource ingredient="Tomate" source="Horta do Ti Manel" icon="food-apple" />
        <IngredientSource ingredient="Queijo" source="Queijaria da Serra" icon="cheese" />

        <View style={{ marginTop: spacing.xxl }}>
          <Text style={[styles.sectionTitle, { ...typography.h3, color: colors.text, marginBottom: spacing.md }]}>
            O que achaste desta pizza? ⭐
          </Text>
          <Card style={{ padding: spacing.md }}>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity key={s} onPress={() => setUserRating(s)}>
                  <MaterialCommunityIcons
                    name={s <= userRating ? "star" : "star-outline"}
                    size={32}
                    color={s <= userRating ? colors.primary : colors.border}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={[styles.reviewInput, { backgroundColor: colors.background, color: colors.text, borderRadius: radius.md, padding: spacing.sm, borderColor: colors.border }]}
              placeholder="Escreve aqui o teu comentário..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={3}
              value={userComment}
              onChangeText={setUserComment}
            />
            <Button
              label="Submeter Avaliação"
              onPress={handleSubmitReview}
              loading={isSubmittingReview}
              style={{ marginTop: spacing.md }}
              variant="secondary"
            />
          </Card>
        </View>

        <View style={{ marginTop: spacing.xxl }}>
          <ProductRecommendation
            pizzas={recommendations}
            onPress={(id) => {
              setLoading(true);
              const next = recommendations.find(p => p.id === id);
              setPizza(next);
              setSelectedSize(next.sizes[1]);
              setLoading(false);
            }}
          />
        </View>

        <View style={[styles.footer, { marginTop: spacing.xxl, marginBottom: spacing.xl }]}>
          <Text style={[styles.price, { ...typography.h2, color: colors.primary }]}>{currentPrice.toFixed(2)} €</Text>
          <Button
            label="Adicionar"
            onPress={() => addItem({ id: pizza.id, name: `${pizza.name} (${selectedSize?.name})`, price: currentPrice })}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {},
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  content: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {},
  description: {
    lineHeight: 24,
  },
  sizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeButton: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
  },
  sectionTitle: {},
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  reviewInput: {
    height: 80,
    borderWidth: 1,
    textAlignVertical: "top",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {},
});
