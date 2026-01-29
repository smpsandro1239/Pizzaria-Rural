import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../theme";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Pizza tradicional com sabor de aldeia</Text>
        <Text style={styles.heroSubtitle}>Feita no momento, entregue quentinha à sua porta.</Text>
        <Button
          label="Pedir Agora"
          onPress={() => navigation.navigate("MainTabs", { screen: "Menu" } as any)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>As Nossas Favoritas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          <Card style={styles.pizzaCard} onPress={() => {}}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=300&q=80" }}
              style={styles.pizzaImage}
            />
            <Text style={styles.pizzaName}>Margherita Rural</Text>
            <Text style={styles.pizzaPrice}>8,50 €</Text>
          </Card>

          <Card style={styles.pizzaCard} onPress={() => {}}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80" }}
              style={styles.pizzaImage}
            />
            <Text style={styles.pizzaName}>Pepperoni da Serra</Text>
            <Text style={styles.pizzaPrice}>9,50 €</Text>
          </Card>
        </ScrollView>
      </View>

      <View style={styles.whyUs}>
        <Text style={styles.sectionTitle}>Porquê a Pizzaria Rural?</Text>
        <View style={styles.benefitRow}>
          <Text style={styles.benefitTitle}>🚀 Entrega Rápida</Text>
          <Text style={styles.benefitDesc}>Fome não espera, nós também não.</Text>
        </View>
        <View style={styles.benefitRow}>
          <Text style={styles.benefitTitle}>🌿 Ingredientes Frescos</Text>
          <Text style={styles.benefitDesc}>Diretamente da horta para o seu prato.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.ruralCream,
  },
  content: {
    paddingBottom: theme.spacing.xxl,
  },
  hero: {
    backgroundColor: theme.colors.ruralRed,
    padding: theme.spacing.xl,
    paddingVertical: theme.spacing.xxxl,
    alignItems: "center",
    textAlign: "center",
  },
  heroTitle: {
    ...theme.typography.h1,
    color: theme.colors.white,
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },
  heroSubtitle: {
    ...theme.typography.body,
    color: theme.colors.white,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
    opacity: 0.9,
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.ruralDark,
    marginBottom: theme.spacing.lg,
  },
  horizontalList: {
    flexDirection: "row",
  },
  pizzaCard: {
    width: 200,
    marginRight: theme.spacing.lg,
  },
  pizzaImage: {
    width: "100%",
    height: 120,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm,
  },
  pizzaName: {
    ...theme.typography.h3,
    fontSize: 16,
    color: theme.colors.ruralDark,
  },
  pizzaPrice: {
    ...theme.typography.body,
    color: theme.colors.ruralRed,
    fontWeight: "700",
  },
  whyUs: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    margin: theme.spacing.lg,
    borderRadius: theme.radius.lg,
  },
  benefitRow: {
    marginBottom: theme.spacing.md,
  },
  benefitTitle: {
    ...theme.typography.body,
    fontWeight: "700",
    color: theme.colors.ruralDark,
  },
  benefitDesc: {
    ...theme.typography.caption,
    color: "#666",
  },
});
