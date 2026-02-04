import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { RootStackParamList } from "../navigation/types";
import { pizzasApi } from "../api/pizzas";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius } = useAppTheme();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await pizzasApi.getPizzas();
        setFavorites(data.slice(0, 4));
      } catch (err) {
        console.error("Erro ao carregar favoritos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const CATEGORIES = [
    { id: '1', name: 'Promoções', icon: 'sale' },
    { id: '2', name: 'Pizzas', icon: 'pizza' },
    { id: '3', name: 'Entradas', icon: 'food-croissant' },
    { id: '4', name: 'Bebidas', icon: 'cup-water' },
    { id: '5', name: 'Sobremesas', icon: 'ice-cream' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: spacing.xxl }}
    >
      {/* Banner Promocional */}
<<<<<<< Updated upstream
      <ScrollView
        horizontal
        pagingEnabled
=======
      <ScrollView
        horizontal
        pagingEnabled
>>>>>>> Stashed changes
        showsHorizontalScrollIndicator={false}
        style={styles.bannerScroll}
      >
        <TouchableOpacity style={[styles.banner, { width: width - (spacing.lg * 2), marginHorizontal: spacing.lg, backgroundColor: colors.primary, borderRadius: radius.lg }]}>
<<<<<<< Updated upstream
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80' }}
            style={[styles.bannerImage, { borderRadius: radius.lg }]}
=======
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80' }}
            style={[styles.bannerImage, { borderRadius: radius.lg }]}
>>>>>>> Stashed changes
          />
          <View style={styles.bannerOverlay}>
            <Text style={[typography.h2, { color: 'white' }]}>MENU PARA 2</Text>
            <Text style={[typography.body, { color: 'white' }]}>Apenas 15.95€</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Categorias Circulares */}
<<<<<<< Updated upstream
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
=======
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
>>>>>>> Stashed changes
        style={[styles.categoriesScroll, { marginTop: spacing.xl }]}
        contentContainerStyle={{ paddingHorizontal: spacing.lg }}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.categoryItem} onPress={() => navigation.navigate("MainTabs", { screen: "Menu" } as any)}>
            <View style={[styles.categoryCircle, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <MaterialCommunityIcons name={cat.icon as any} size={28} color={colors.primary} />
            </View>
            <Text style={[typography.caption, { color: colors.text, marginTop: spacing.xs, fontWeight: '600' }]}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Secção de Produtos em Grelha */}
      <View style={[styles.section, { padding: spacing.lg }]}>
        <View style={styles.sectionHeader}>
          <Text style={[typography.h3, { color: colors.text }]}>As mais pedidas</Text>
          <TouchableOpacity onPress={() => navigation.navigate("MainTabs", { screen: "Menu" } as any)}>
            <Text style={[typography.body, { color: colors.primary, fontWeight: '700' }]}>Ver tudo</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} size="large" style={{ marginTop: spacing.xl }} />
        ) : (
          <View style={styles.grid}>
            {favorites.map((pizza) => (
              <Card
                key={pizza.id}
                style={[styles.gridCard, { width: (width / 2) - spacing.lg - (spacing.md / 2) }]}
                onPress={() => navigation.navigate("PizzaDetail", { id: pizza.id })}
              >
                <Image source={{ uri: pizza.image }} style={[styles.pizzaImage, { borderRadius: radius.md }]} />
                <Text numberOfLines={1} style={[typography.body, { fontWeight: '700', color: colors.text, marginTop: spacing.sm }]}>
                  {pizza.name}
                </Text>
                <Text style={[typography.h3, { color: colors.primary, marginTop: spacing.xs }]}>
<<<<<<< Updated upstream
                  {pizza.price.toFixed(2)}€
=======
                  {pizza.basePrice.toFixed(2)}€
>>>>>>> Stashed changes
                </Text>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]}>
                  <MaterialCommunityIcons name="plus" size={20} color="white" />
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerScroll: {
    marginTop: 16,
  },
  banner: {
    height: 180,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  categoriesScroll: {},
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    marginBottom: 16,
    padding: 8,
  },
  pizzaImage: {
    width: '100%',
    height: 120,
  },
  addButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
