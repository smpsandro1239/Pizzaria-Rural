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
  Platform
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useAppTheme } from "../theme";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { RootStackParamList } from "../navigation/types";
import { pizzasApi, Pizza } from "../api/pizzas";
import { useCartStore } from "../store/cart-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

type RoutePropType = RouteProp<RootStackParamList, 'PizzaDetail'>;
const { width } = Dimensions.get('window');

export const PizzaDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RoutePropType>();
  const { id } = route.params;
  const { colors, spacing, typography, radius } = useAppTheme();
  const { addItem } = useCartStore();

  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const data = await pizzasApi.getPizza(id);
        setPizza(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPizza();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!pizza) return null;

  const handleAddToCart = () => {
    addItem({
      id: pizza.id,
      name: pizza.name,
      price: pizza.price / 100,
      image: pizza.imageUrl || pizza.image || "",
      quantity: quantity,
    });
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MotiView
          from={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Image source={{ uri: pizza.imageUrl || pizza.image }} style={styles.image} />
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: 'white' }]}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="chevron-left" size={28} color="black" />
          </TouchableOpacity>
        </MotiView>

        <View style={[styles.content, { padding: spacing.lg }]}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={[typography.h1, { color: colors.text }]}>{pizza.name}</Text>
              <Text style={[typography.h3, { color: colors.primary, marginTop: 4 }]}>
                {(pizza.price / 100).toFixed(2)}€
              </Text>
            </View>
            {pizza.featured && <Badge label="Destaque" variant="primary" />}
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <Text style={[typography.bodyBold, { color: colors.text, marginBottom: spacing.sm }]}>Descrição</Text>
          <Text style={[typography.body, { color: colors.textSecondary, lineHeight: 24 }]}>
            {pizza.description}
          </Text>

          <View style={styles.section}>
            <Text style={[typography.bodyBold, { color: colors.text, marginBottom: spacing.md }]}>Quantidade</Text>
            <View style={[styles.quantityRow, { backgroundColor: colors.graySoft, borderRadius: radius.md }]}>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
                <MaterialCommunityIcons name="minus" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={[typography.h3, { color: colors.text, marginHorizontal: spacing.xl }]}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyBtn}>
                <MaterialCommunityIcons name="plus" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, {
        padding: spacing.lg,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border
      }]}>
        <Button
          title="Adicionar ao Carrinho"
          onPress={handleAddToCart}
          style={{ flex: 1 }}
          icon={<MaterialCommunityIcons name="cart-outline" size={20} color="white" />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: width, height: 350 },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
      android: { elevation: 5 }
    })
  },
  content: { borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -30, backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  divider: { height: 1, width: '100%', marginVertical: 24 },
  section: { marginTop: 32 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', padding: 4 },
  qtyBtn: { padding: 10 },
  footer: { flexDirection: 'row', alignItems: 'center' },
});
