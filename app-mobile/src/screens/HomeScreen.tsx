import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { SkeletonCard } from "../components/SkeletonCard";
import { RootStackParamList } from "../navigation/types";
import { pizzasApi, Pizza } from "../api/pizzas";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { width } = Dimensions.get('window');

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius } = useAppTheme();
  const [featured, setFeatured] = useState<Pizza[]>([]);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPizzas = await pizzasApi.getPizzas();
        setPizzas(allPizzas);
        const feat = allPizzas.filter(p => p.featured);
        setFeatured(feat.length > 0 ? feat.slice(0, 5) : allPizzas.slice(0, 3));
      } catch (err) {
        console.error("Erro ao carregar dados", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderFeaturedItem = ({ item }: { item: Pizza }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate("PizzaDetail", { id: item.id })}
      style={[styles.featuredCard, { width: width - 40, marginHorizontal: 20, borderRadius: radius.xl }]}
    >
      <Image source={{ uri: item.imageUrl || item.image }} style={[styles.featuredImage, { borderRadius: radius.xl }]} />
      <View style={[styles.featuredOverlay, { borderRadius: radius.xl }]}>
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200 }}
        >
          <Badge label="Destaque" variant="primary" style={{ marginBottom: spacing.xs }} />
          <Text style={[typography.h2, { color: 'white' }]}>{item.name}</Text>
          <Text style={[typography.body, { color: 'rgba(255,255,255,0.8)' }]}>A partir de {(item.price / 100).toFixed(2)}€</Text>
        </MotiView>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: spacing.huge }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginTop: spacing.lg }}>
        {loading ? (
          <View style={[styles.featuredCard, { width: width - 40, marginHorizontal: 20, borderRadius: radius.xl, backgroundColor: colors.graySoft }]} />
        ) : (
          <FlatList
            data={featured}
            renderItem={renderFeaturedItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `featured-${item.id}`}
          />
        )}
      </View>

      <View style={[styles.section, { padding: spacing.lg }]}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={[typography.h3, { color: colors.text }]}>Menu Principal</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>As nossas melhores criações</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("MainTabs", { screen: "Menu" } as any)}>
            <Text style={[typography.bodyBold, { color: colors.primary }]}>Ver tudo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {loading ? (
            [1, 2, 3, 4].map(i => <View key={i} style={{ width: '48%' }}><SkeletonCard /></View>)
          ) : (
            pizzas.slice(0, 6).map((pizza, index) => (
              <MotiView
                key={pizza.id}
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 50 }}
                style={{ width: '48%', marginBottom: spacing.lg }}
              >
                <Card
                  variant="outline"
                  onPress={() => navigation.navigate("PizzaDetail", { id: pizza.id })}
                  style={{ padding: 0 }}
                >
                  <Image source={{ uri: pizza.imageUrl || pizza.image }} style={styles.pizzaImage} />
                  <View style={{ padding: spacing.sm }}>
                    <Text numberOfLines={1} style={[typography.bodyBold, { color: colors.text }]}>
                      {pizza.name}
                    </Text>
                    <Text style={[typography.bodyBold, { color: colors.primary, marginTop: 4 }]}>
                      {(pizza.price / 100).toFixed(2)}€
                    </Text>
                  </View>
                </Card>
              </MotiView>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  featuredCard: { height: 220, position: 'relative', overflow: 'hidden' },
  featuredImage: { width: '100%', height: '100%' },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: '100%',
    justifyContent: 'flex-end'
  },
  section: {},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  pizzaImage: { width: '100%', height: 140, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
});
