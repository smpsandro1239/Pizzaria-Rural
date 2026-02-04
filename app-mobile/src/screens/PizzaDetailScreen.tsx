import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, TextInput } from "react-native";
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
import { pizzasApi } from "../api/pizzas";

export const PizzaDetailScreen = ({ route }: any) => {
  const { colors, spacing, typography, radius } = useAppTheme();
  const { addItem, favorites, toggleFavorite, showToast } = useCartStore();
  const pizzaId = route?.params?.id;

  const [pizza, setPizza] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          setRecommendations(data.filter((p: any) => p.id !== pizzaId && p.category === found.category).slice(0, 3));
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
    } else {
      setError("ID de pizza não especificado.");
      setLoading(false);
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
      <View style={[styles.centered, { backgroundColor: colors.background, padding: spacing.lg }]}>
        <MaterialCommunityIcons name="alert-circle" size={48} color={colors.error} />
        <Text style={[styles.errorText, { ...typography.h3, color: colors.error, marginTop: spacing.md, textAlign: "center" }]}>
          {error || "Algo correu mal."}
        </Text>
        <Button
          label="Voltar ao Menu"
          onPress={() => navigation.goBack()}
          variant="secondary"
          style={{ marginTop: spacing.xl }}
        />
      </View>
    );
  }

  const isFav = favorites.includes(pizza.id);
  const hasReviewed = userRating > 0 || userComment.length > 0;

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: spacing.xxl }}
      accessibilityLabel={`Detalhes da pizza ${pizza.name}`}
    >
      <View style={[styles.imageContainer, { height: 300 }]}>
        <Image 
          source={{ uri: pizza.image }} 
          style={styles.image} 
          resizeMode="cover"
          accessibilityLabel={`Imagem da pizza ${pizza.name}`}
        />
        <TouchableOpacity
          style={[
            styles.favoriteButton, 
            { 
              top: spacing.xl, 
              right: spacing.xl, 
              padding: spacing.sm, 
              borderRadius: radius.pill,
              backgroundColor: 'rgba(0,0,0,0.3)'
            }
          ]}
          onPress={() => toggleFavorite(pizza.id)}
          accessibilityRole="button"
          accessibilityLabel={isFav ? `Remover ${pizza.name} dos favoritos` : `Adicionar ${pizza.name} aos favoritos`}
          accessibilityState={{ selected: isFav }}
        >
          <MaterialCommunityIcons
            name={isFav ? "heart" : "heart-outline"}
            size={32}
            color={isFav ? colors.ruralRed : "white"}
          />
        </TouchableOpacity>
      </View>
      
      <View style={[
        styles.content, 
        { 
          padding: spacing.xl, 
          backgroundColor: colors.surface, 
          borderTopLeftRadius: radius.lg, 
          borderTopRightRadius: radius.lg, 
          marginTop: -spacing.xl 
        }
      ]}>
        <View style={[styles.header, { marginBottom: spacing.sm }]}>
          <Text style={[styles.name, { ...typography.h1, color: colors.text }]}>{pizza.name}</Text>
          <Badge label={pizza.tag} />
        </View>
        
        <View style={{ marginBottom: spacing.md }}>
          <StarRating rating={pizza.rating} count={pizza.reviewsCount} size={20} />
        </View>
        
        <Text style={[
          styles.description, 
          { ...typography.body, color: colors.textSecondary, marginBottom: spacing.xxl, lineHeight: 24 }
        ]}>
          {pizza.description}
        </Text>

        <Text style={[
          styles.sectionTitle, 
          { ...typography.h3, color: colors.text, marginBottom: spacing.md }
        ]}>
          Origem dos Ingredientes 🌿
        </Text>
        <IngredientSource ingredient="Farinha" source="Moinho da Aldeia (Grão Biológico)" icon="corn" />
        <IngredientSource ingredient="Tomate" source="Horta do Ti Manel" icon="food-apple" />
        <IngredientSource ingredient="Queijo" source="Queijaria da Serra" icon="cheese" />

        <View style={{ marginTop: spacing.xxl }}>
          <Text style={[
            styles.sectionTitle, 
            { ...typography.h3, color: colors.text, marginBottom: spacing.md }
          ]}>
            O que achaste desta pizza? ⭐
          </Text>
          <Card style={{ padding: spacing.md }}>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity 
                  key={s} 
                  onPress={() => setUserRating(s)}
                  accessibilityRole="button"
                  accessibilityLabel={`Classificar com ${s} estrelas`}
                >
                  <MaterialCommunityIcons
                    name={s <= userRating ? "star" : "star-outline"}
                    size={32}
                    color={s <= userRating ? colors.ruralRed : colors.border}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={[
                styles.reviewInput, 
                { 
                  backgroundColor: colors.background, 
                  color: colors.text, 
                  borderRadius: radius.md, 
                  padding: spacing.sm, 
                  borderColor: colors.border,
                  borderWidth: 1,
                  marginTop: spacing.sm,
                  minHeight: 80
                }
              ]}
              placeholder="Escreve aqui o teu comentário..."
              placeholderTextColor={colors.textSecondary}
              multiline
              textAlignVertical="top"
              value={userComment}
              onChangeText={setUserComment}
              accessibilityLabel="Caixa de comentário para avaliação"
              accessibilityHint="Máximo 200 caracteres"
            />
            <Button
              label="Submeter Avaliação"
              onPress={handleSubmitReview}
              loading={isSubmittingReview}
              disabled={userRating === 0 || isSubmittingReview}
              style={{ marginTop: spacing.md }}
              variant="secondary"
              accessibilityLabel={hasReviewed ? "Avaliação submetida" : "Submeter avaliação da pizza"}
            />
          </Card>
        </View>

        <View style={{ marginTop: spacing.xxl }}>
          <Text style={[
            styles.sectionTitle, 
            { ...typography.h3, color: colors.text, marginBottom: spacing.md }
          ]}>
            Também Podes Gostar 🍕
          </Text>
          <ProductRecommendation
            pizzas={recommendations}
            onPress={(id) => {
              setLoading(true);
              const next = recommendations.find(p => p.id === id);
              if (next) {
                setPizza(next);
                // Scroll to top when changing pizza
                setTimeout(() => {
                  // Note: Would need ref to ScrollView for proper scroll implementation
                }, 100);
              }
              setLoading(false);
            }}
          />
        </View>

        <View style={[
          styles.footer, 
          { 
            marginTop: spacing.xxl, 
            paddingTop: spacing.xl, 
            borderTopWidth: 1, 
            borderTopColor: colors.border,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }
        ]}>
          <Text style={[styles.price, { ...typography.h2, color: colors.ruralRed }]}>
            {pizza.price.toFixed(2)} €
          </Text>
          <Button
            label="Adicionar ao Carrinho"
            onPress={() => {
              addItem({ id: pizza.id, name: pizza.name, price: pizza.price, quantity: 1 });
              showToast(`"${pizza.name}" adicionada ao carrinho!`, "success");
            }}
            accessibilityLabel={`Adicionar ${pizza.name} ao carrinho por ${pizza.price.toFixed(2)} euros`}
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
  errorText: {
    fontSize: 18,
    textAlign: "center",
  },
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
    justifyContent: "center",
    alignItems: "center",
  },
  content: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "800",
    flex: 1,
  },
  description: {},
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
    gap: 8,
  },
  reviewInput: {
    fontSize: 16,
  },
  footer: {},
  price: {
    fontWeight: "800",
  },
});