import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { RootStackParamList } from "../navigation/types";
import { pizzasApi, Pizza } from "../api/pizzas";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthStore } from "../store/auth-store";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius } = useAppTheme();
  const { user } = useAuthStore();
  const isAdmin = user?.role === "ADMIN";

  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPizzas = async () => {
    setLoading(true);
    try {
      const data = await pizzasApi.getPizzas();
      setPizzas(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const handleDelete = async (id: string) => {
    try {
        await pizzasApi.deletePizza(id);
        fetchPizzas();
    } catch (err) {
        console.error(err);
    }
  };

  const renderItem = ({ item }: { item: Pizza }) => (
    <Card
      variant="outline"
      style={styles.card}
      onPress={() => navigation.navigate("PizzaDetail", { id: item.id })}
    >
      <View style={styles.cardContent}>
        <Image source={{ uri: item.imageUrl || item.image }} style={[styles.image, { borderRadius: radius.md }]} />
        <View style={styles.info}>
          <View style={styles.infoHead}>
            <Text style={[typography.bodyBold, { color: colors.text }]}>{item.name}</Text>
            {item.featured && <Badge label="Destaque" variant="primary" />}
          </View>
          <Text numberOfLines={2} style={[typography.caption, { color: colors.textSecondary, marginTop: 4 }]}>
            {item.description}
          </Text>
          <Text style={[typography.h3, { color: colors.primary, marginTop: 8 }]}>
            {(item.price / 100).toFixed(2)}€
          </Text>
        </View>
      </View>

      {isAdmin && (
        <View style={[styles.adminActions, { borderTopColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.adminBtn, { backgroundColor: colors.graySoft }]}
            onPress={() => navigation.navigate("AdminProductForm", { id: item.id })}
          >
            <MaterialCommunityIcons name="pencil" size={18} color={colors.text} />
            <Text style={[typography.caption, { color: colors.text, fontWeight: '600', marginLeft: 6 }]}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.adminBtn, { backgroundColor: colors.error + '15' }]}
            onPress={() => handleDelete(item.id)}
          >
            <MaterialCommunityIcons name="trash-can-outline" size={18} color={colors.error} />
            <Text style={[typography.caption, { color: colors.error, fontWeight: '600', marginLeft: 6 }]}>Apagar</Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isAdmin && (
        <View style={[styles.adminHeader, { padding: spacing.lg }]}>
          <TouchableOpacity
            style={[styles.addNewBtn, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate("AdminProductForm", {})}
          >
            <MaterialCommunityIcons name="plus" size={24} color="white" />
            <Text style={[typography.button, { color: 'white', marginLeft: 8 }]}>Novo Produto</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <ActivityIndicator color={colors.primary} size="large" style={{ marginTop: spacing.xl }} />
      ) : (
        <FlatList
          data={pizzas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  adminHeader: { width: '100%' },
  addNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12
  },
  card: { marginBottom: 16, padding: 12 },
  cardContent: { flexDirection: 'row' },
  image: { width: 90, height: 90 },
  info: { flex: 1, marginLeft: 16 },
  infoHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  adminActions: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    justifyContent: 'flex-end'
  },
  adminBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8
  },
});
