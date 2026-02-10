import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useAppTheme } from "../theme";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { RootStackParamList } from "../navigation/types";
import { pizzasApi } from "../api/pizzas";

type RoutePropType = RouteProp<RootStackParamList, 'AdminProductForm'>;

export const AdminProductFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RoutePropType>();
  const id = route.params?.id;
  const isEditing = !!id;

  const { colors, spacing, typography, radius } = useAppTheme();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      const fetchPizza = async () => {
        try {
          const pizza = await pizzasApi.getPizza(id!);
          setForm({
            name: pizza.name,
            description: pizza.description,
            price: (pizza.price / 100).toString(),
            imageUrl: pizza.imageUrl || pizza.image || "",
            featured: pizza.featured,
          });
        } catch (err) {
          Alert.alert("Erro", "Não foi possível carregar os dados da pizza.");
          navigation.goBack();
        } finally {
          setFetching(false);
        }
      };
      fetchPizza();
    }
  }, [id]);

  const handleSave = async () => {
    if (!form.name || !form.price || !form.imageUrl) {
      Alert.alert("Erro", "Nome, preço e imagem são obrigatórios.");
      return;
    }

    setLoading(true);
    const pizzaData = {
      ...form,
      price: Math.round(parseFloat(form.price) * 100),
    };

    try {
      if (isEditing) {
        await pizzasApi.updatePizza(id!, pizzaData);
        Alert.alert("Sucesso", "Produto atualizado com sucesso!");
      } else {
        await pizzasApi.createPizza(pizzaData);
        Alert.alert("Sucesso", "Produto criado com sucesso!");
      }
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Ocorreu um erro ao guardar o produto.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={[typography.h2, { color: colors.text, marginBottom: spacing.lg }]}>
          {isEditing ? "Editar Produto" : "Novo Produto"}
        </Text>

        <Card variant="outline" style={{ marginBottom: spacing.xl }}>
          <Input
            label="Nome do Produto"
            placeholder="Ex: Margherita Premium"
            value={form.name}
            onChangeText={(v) => setForm({ ...form, name: v })}
          />
          <Input
            label="Preço (€)"
            placeholder="Ex: 12.50"
            keyboardType="numeric"
            value={form.price}
            onChangeText={(v) => setForm({ ...form, price: v })}
          />
          <Input
            label="Descrição"
            placeholder="Descrição detalhada do produto..."
            multiline
            numberOfLines={3}
            value={form.description}
            onChangeText={(v) => setForm({ ...form, description: v })}
          />
          <Input
            label="URL da Imagem"
            placeholder="https://..."
            value={form.imageUrl}
            onChangeText={(v) => setForm({ ...form, imageUrl: v })}
          />

          {form.imageUrl ? (
            <View style={styles.previewContainer}>
              <Text style={[typography.caption, { marginBottom: 8 }]}>Preview:</Text>
              <Image source={{ uri: form.imageUrl }} style={[styles.preview, { borderRadius: radius.md }]} />
            </View>
          ) : null}

          <View style={styles.switchRow}>
            <View>
              <Text style={[typography.bodyBold, { color: colors.text }]}>Produto em Destaque</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>Aparece no banner da home</Text>
            </View>
            <Switch
              value={form.featured}
              onValueChange={(v) => setForm({ ...form, featured: v })}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </Card>

        <Button
          title={isEditing ? "Guardar Alterações" : "Criar Produto"}
          onPress={handleSave}
          loading={loading}
        />

        {isEditing && (
          <Button
            title="Cancelar"
            variant="ghost"
            onPress={() => navigation.goBack()}
            style={{ marginTop: spacing.md }}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  previewContainer: { marginTop: 8, marginBottom: 16 },
  preview: { width: '100%', height: 180, backgroundColor: '#f0f0f0' },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
});
