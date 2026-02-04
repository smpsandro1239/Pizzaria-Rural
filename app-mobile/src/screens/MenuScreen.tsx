import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { RootStackParamList } from "../navigation/types";
import { pizzasApi, Pizza } from "../api/pizzas";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { width } = Dimensions.get('window');

export const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius } = useAppTheme();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const data = await pizzasApi.getPizzas();
        setPizzas(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);

  const renderItem = ({ item }: { item: Pizza }) => (
    <Card
      style={[styles.card, { width: (width / 2) - spacing.lg - (spacing.md / 2) }]}
      onPress={() => navigation.navigate("PizzaDetail", { id: item.id })}
    >
      <Image source={{ uri: item.image }} style={[styles.image, { borderRadius: radius.md }]} />
      <View style={styles.cardContent}>
        <Text numberOfLines={1} style={[typography.body, { fontWeight: '700', color: colors.text }]}>{item.name}</Text>
        <Text numberOfLines={2} style={[typography.caption, { color: colors.textSecondary, marginTop: 4, height: 32 }]}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
<<<<<<< Updated upstream
          <Text style={[typography.h3, { color: colors.primary }]}>{item.price.toFixed(2)}€</Text>
=======
          <Text style={[typography.h3, { color: colors.primary }]}>{item.basePrice.toFixed(2)}€</Text>
>>>>>>> Stashed changes
          <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]}>
            <MaterialCommunityIcons name="plus" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : (
        <FlatList
          data={pizzas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ padding: spacing.lg }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      )}
    </View>
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
  card: {
    marginBottom: 16,
    padding: 8,
  },
  image: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    marginTop: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
