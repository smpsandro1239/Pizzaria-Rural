import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { RootStackParamList } from "../navigation/types";

const HISTORY = [
  { id: "1", date: "25 Jan 2024", total: 15.5, status: "Entregue" },
  { id: "2", date: "18 Jan 2024", total: 10.5, status: "Entregue" },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AccountScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius, motion } = useAppTheme();
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { padding: spacing.lg }]}
      accessibilityLabel="Ecrã da conta do utilizador"
    >
      {/* Profile Header */}
      <View style={[styles.header, { marginBottom: spacing.xl }]}>
        <View style={[styles.avatar, { backgroundColor: colors.ruralRed, borderRadius: radius.xxl }]}>
          <Text style={[styles.avatarText, { ...typography.h1, color: colors.white }]}>S</Text>
        </View>
        <Text style={[styles.name, { ...typography.h2, color: colors.text }]}>Sandro</Text>
        <Text style={[styles.email, { ...typography.body, color: colors.textSecondary }]}>sandro@email.com</Text>
      </View>

      {/* Loyalty Points Card */}
      <Card style={[styles.pointsCard, { backgroundColor: colors.ruralRed, marginBottom: spacing.xl }]}>
        <View style={[styles.pointsInfo, { marginBottom: spacing.sm }]}>
          <Text style={[styles.pointsTitle, { ...typography.h3, color: colors.white }]}>Programa de Fidelidade</Text>
          <Text style={[styles.pointsValue, { ...typography.h2, color: colors.white }]}>120 / 200 pts</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <MotiView
            from={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ type: "timing", duration: motion.duration.slow }}
            style={[styles.progressBar, { backgroundColor: colors.gold }]}
          />
        </View>
        <Text style={[styles.pointsDesc, { ...typography.caption, color: colors.white, opacity: 0.9, marginTop: spacing.md }]}>
          Faltam 80 pontos para a tua próxima Margherita grátis! 🍕
        </Text>
      </Card>

      {/* Settings Section */}
      <Text style={[styles.sectionTitle, { ...typography.h3, color: colors.text, marginBottom: spacing.md }]}>Definições</Text>
<<<<<<< Updated upstream

      <Card style={{ marginBottom: spacing.xl, padding: 0 }}>
        <TouchableOpacity
=======

      <Card style={{ marginBottom: spacing.xl, padding: 0 }}>
        <TouchableOpacity
>>>>>>> Stashed changes
          style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: colors.border }]}
          onPress={() => navigation.navigate("Addresses")}
          accessibilityRole="button"
          accessibilityLabel="Gerir moradas de entrega"
        >
          <View style={styles.menuItemLeft}>
            <MaterialCommunityIcons name="map-marker-outline" size={24} color={colors.text} />
            <Text style={[typography.body, { color: colors.text, marginLeft: spacing.md }]}>Gerir Moradas</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

<<<<<<< Updated upstream
        <TouchableOpacity
=======
        <TouchableOpacity
>>>>>>> Stashed changes
          style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: colors.border }]}
          onPress={() => navigation.navigate("SupportChat")}
          accessibilityRole="button"
          accessibilityLabel="Abrir chat de suporte com a equipa Rural Pizza"
        >
          <View style={styles.menuItemLeft}>
            <MaterialCommunityIcons name="chat-question-outline" size={24} color={colors.text} />
            <Text style={[typography.body, { color: colors.text, marginLeft: spacing.md }]}>Suporte Rural</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <MaterialCommunityIcons name="fingerprint" size={24} color={colors.text} />
            <Text style={[typography.body, { color: colors.text, marginLeft: spacing.md }]}>Acesso Biométrico</Text>
          </View>
<<<<<<< Updated upstream
          <Switch
            value={biometricsEnabled}
=======
          <Switch
            value={biometricsEnabled}
>>>>>>> Stashed changes
            onValueChange={setBiometricsEnabled}
            trackColor={{ false: colors.border, true: colors.ruralRed }}
            thumbColor={biometricsEnabled ? colors.white : colors.textSecondary}
            accessibilityLabel="Ativar autenticação biométrica"
            accessibilityHint={biometricsEnabled ? "Biométrico ativado" : "Biométrico desativado"}
          />
        </View>
      </Card>

      {/* Order History */}
      <Text style={[styles.sectionTitle, { ...typography.h3, color: colors.text, marginBottom: spacing.md }]}>Histórico de Pedidos</Text>
      {HISTORY.map((item) => (
        <Card key={item.id} style={[styles.historyCard, { marginBottom: spacing.md }]}>
          <View style={[styles.historyHeader, { marginBottom: spacing.sm }]}>
            <Text style={[styles.historyDate, { ...typography.body, fontWeight: "700", color: colors.text }]}>{item.date}</Text>
            <Badge label={item.status} variant="success" />
          </View>
          <View style={[styles.historyFooter, { borderTopColor: colors.border, paddingTop: spacing.sm }]}>
            <Text style={[typography.body, { color: colors.text }]}>Total: {item.total.toFixed(2)} €</Text>
            <TouchableOpacity
              onPress={() => {/* Implement repeat order logic */}}
              accessibilityRole="button"
              accessibilityLabel={`Repetir pedido de ${item.date}`}
            >
              <Text style={[styles.repeatText, { ...typography.body, color: colors.ruralRed, fontWeight: "700" }]}>Repetir Pedido</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ))}

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.logoutButton, { marginTop: spacing.xl, marginBottom: spacing.xxl }]}
        onPress={() => {/* Implement logout logic */}}
        accessibilityRole="button"
        accessibilityLabel="Terminar sessão na aplicação Rural Pizza"
      >
        <Text style={[styles.logoutText, { ...typography.body, color: colors.error, fontWeight: "600" }]}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
  },
  email: {
    fontSize: 16,
    opacity: 0.8,
  },
  pointsCard: {
    padding: 16,
  },
  pointsInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsTitle: {
    fontSize: 18,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
  pointsDesc: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  historyCard: {
    padding: 16,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyDate: {
    fontSize: 16,
  },
  historyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
  },
  repeatText: {
    fontSize: 16,
  },
  logoutButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 16,
  },
});