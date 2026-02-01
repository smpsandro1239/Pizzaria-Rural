import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HISTORY = [
  { id: "1", date: "25 Jan 2024", total: 15.5, status: "Entregue" },
  { id: "2", date: "18 Jan 2024", total: 10.5, status: "Entregue" },
];

export const AccountScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={[styles.content, { padding: spacing.lg }]}>
      <View style={[styles.header, { marginBottom: spacing.xl }]}>
        <View style={[styles.avatar, { backgroundColor: colors.ruralRed, borderRadius: 40 }]}>
          <Text style={[styles.avatarText, { ...typography.h1, color: "white" }]}>S</Text>
        </View>
        <Text style={[styles.name, { ...typography.h2, color: colors.text }]}>Sandro</Text>
        <Text style={[styles.email, { ...typography.body, color: colors.textSecondary }]}>sandro@email.com</Text>
      </View>

      <Card style={{ ...styles.pointsCard, backgroundColor: colors.ruralRed, marginBottom: spacing.xl }}>
        <View style={[styles.pointsInfo, { marginBottom: spacing.sm }]}>
          <Text style={[styles.pointsTitle, { ...typography.h3, color: "white" }]}>Programa de Fidelidade</Text>
          <Text style={[styles.pointsValue, { ...typography.h2, color: "white" }]}>120 / 200 pts</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <MotiView
            from={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ type: "timing", duration: 1000 }}
            style={styles.progressBar}
          />
        </View>
        <Text style={[styles.pointsDesc, { ...typography.caption, color: "white", opacity: 0.9, marginTop: spacing.md }]}>
          Faltam 80 pontos para a tua próxima Margherita grátis! 🍕
        </Text>
      </Card>

      <Text style={[styles.sectionTitle, { ...typography.h3, color: colors.text, marginBottom: spacing.md }]}>Histórico de Pedidos</Text>
      {HISTORY.map((item) => (
        <Card key={item.id} style={{ ...styles.historyCard, marginBottom: spacing.md }}>
          <View style={[styles.historyHeader, { marginBottom: spacing.sm }]}>
            <Text style={[styles.historyDate, { ...typography.body, fontWeight: "700", color: colors.text }]}>{item.date}</Text>
            <Badge label={item.status} variant="success" />
          </View>
          <View style={[styles.historyFooter, { borderTopColor: colors.border, paddingTop: spacing.sm }]}>
            <Text style={[typography.body, { color: colors.text }]}>Total: {item.total.toFixed(2)} €</Text>
            <TouchableOpacity>
              <Text style={[styles.repeatText, { ...typography.body, color: colors.ruralRed, fontWeight: "700" }]}>Repetir Pedido</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ))}

      <Card style={{ ...styles.settingsCard, marginTop: spacing.lg }}>
        <Text style={[styles.cardTitle, { ...typography.h3, color: colors.text, marginBottom: spacing.md }]}>Configurações</Text>
        <TouchableOpacity
          style={[styles.settingRow, { marginBottom: spacing.md }]}
          onPress={() => navigation.navigate("Addresses")}
        >
          <Text style={[styles.settingLabel, { ...typography.body, color: colors.text }]}>📍 Minhas Moradas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settingRow, { marginBottom: spacing.md }]}>
          <Text style={[styles.settingLabel, { ...typography.body, color: colors.text }]}>🔔 Notificações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={[styles.settingLabel, { ...typography.body, color: colors.text }]}>🌓 Modo Escuro</Text>
        </TouchableOpacity>
      </Card>

      <TouchableOpacity style={[styles.logoutButton, { marginTop: spacing.xl }]}>
        <Text style={[styles.logoutText, { ...typography.body, color: colors.error, fontWeight: "600" }]}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {},
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
  avatarText: {},
  name: {},
  email: {},
  pointsCard: {},
  pointsInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsTitle: {},
  pointsValue: {},
  progressBarContainer: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFD700", // Gold color for progress
  },
  pointsDesc: {},
  sectionTitle: {},
  historyCard: {},
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyDate: {},
  historyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
  },
  repeatText: {},
  settingsCard: {},
  cardTitle: {},
  settingRow: {},
  settingLabel: {},
  logoutButton: {
    alignItems: "center",
  },
  logoutText: {},
});
