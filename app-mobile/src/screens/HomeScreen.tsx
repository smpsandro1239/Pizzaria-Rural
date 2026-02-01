import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppTheme } from "../theme";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { StarRating } from "../components/StarRating";
import { ReviewCard } from "../components/ReviewCard";
import { RootStackParamList } from "../navigation/types";
import { pizzasApi } from "../api/pizzas";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius } = useAppTheme();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await pizzasApi.getPizzas();
        setFavorites(data.slice(0, 2)); // Pegar apenas as duas primeiras como favoritas
      } catch (err) {
        console.error("Erro ao carregar favoritos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { paddingBottom: spacing.xxl }]}
    >
      <View style={[styles.hero, { backgroundColor: colors.ruralRed, padding: spacing.xl, paddingVertical: spacing.xxxl }]}>
        <Text style={[styles.heroTitle, { ...typography.h1, color: "white", marginBottom: spacing.sm }]}>
          {t("home.hero_title")}
        </Text>
        <Text style={[styles.heroSubtitle, { ...typography.body, color: "white", marginBottom: spacing.xl }]}>
          {t("home.hero_subtitle")}
        </Text>
        <Button
          label={t("common.order_now")}
          onPress={() => navigation.navigate("MainTabs", { screen: "Menu" } as any)}
        />
      </View>

      <View style={[styles.section, { padding: spacing.lg }]}>
        <Text style={[styles.sectionTitle, { ...typography.h2, color: colors.text, marginBottom: spacing.lg }]}>
          {t("home.favorites_title")}
        </Text>
        {loading ? (
          <ActivityIndicator color={colors.ruralRed} size="large" />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {favorites.map((pizza) => (
              <Card
                key={pizza.id}
                style={{ ...styles.pizzaCard, width: 200, marginRight: spacing.lg }}
                onPress={() => navigation.navigate("PizzaDetail", { id: pizza.id })}
              >
                <Image
                  source={{ uri: pizza.image }}
                  style={[styles.pizzaImage, { borderRadius: radius.md, marginBottom: spacing.sm }]}
                  contentFit="cover"
                  transition={200}
                />
                <Text style={[styles.pizzaName, { ...typography.h3, fontSize: 16, color: colors.text }]}>
                  {pizza.name}
                </Text>
                <View style={{ marginBottom: spacing.xs }}>
                  <StarRating rating={pizza.rating} showCount={false} size={12} />
                </View>
                <Text style={[styles.pizzaPrice, { ...typography.body, color: colors.ruralRed }]}>
                  {pizza.price.toFixed(2)} €
                </Text>
              </Card>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={[styles.section, { padding: spacing.lg }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { ...typography.h2, color: colors.text }]}>O que dizem os nossos clientes</Text>
          <MaterialCommunityIcons name="google" size={20} color={colors.textSecondary} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.horizontalList, { marginTop: spacing.md }]}>
          {MOCK_REVIEWS.map((review) => (
            <View key={review.id} style={{ marginRight: spacing.md }}>
              <ReviewCard {...review} />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.whyUs, { padding: spacing.lg, backgroundColor: colors.surface, margin: spacing.lg, borderRadius: radius.lg }]}>
        <Text style={[styles.sectionTitle, { ...typography.h2, color: colors.text, marginBottom: spacing.lg }]}>
          {t("home.why_us_title")}
        </Text>
        <View style={[styles.benefitRow, { marginBottom: spacing.md }]}>
          <Text style={[styles.benefitTitle, { ...typography.body, color: colors.text }]}>🚀 {t("home.fast_delivery")}</Text>
          <Text style={[styles.benefitDesc, { ...typography.caption, color: colors.textSecondary }]}>
            {t("home.fast_delivery_desc")}
          </Text>
        </View>
        <View style={[styles.benefitRow, { marginBottom: spacing.md }]}>
          <Text style={[styles.benefitTitle, { ...typography.body, color: colors.text }]}>🌿 {t("home.fresh_ingredients")}</Text>
          <Text style={[styles.benefitDesc, { ...typography.caption, color: colors.textSecondary }]}>
            {t("home.fresh_ingredients_desc")}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {},
  hero: {
    alignItems: "center",
    textAlign: "center",
  },
  heroTitle: {
    textAlign: "center",
  },
  heroSubtitle: {
    textAlign: "center",
    opacity: 0.9,
  },
  section: {},
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {},
  horizontalList: {
    flexDirection: "row",
  },
  pizzaCard: {},
  pizzaImage: {
    width: "100%",
    height: 120,
  },
  pizzaName: {},
  pizzaPrice: {
    fontWeight: "700",
  },
  whyUs: {},
  benefitRow: {},
  benefitTitle: {
    fontWeight: "700",
  },
  benefitDesc: {},
});
