import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";

const HISTORY = [
  { id: "1", date: "25 Jan 2024", total: 15.5, status: "Entregue" },
  { id: "2", date: "18 Jan 2024", total: 10.5, status: "Entregue" },
];

export const AccountScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>S</Text>
        </View>
        <Text style={styles.name}>Sandro</Text>
        <Text style={styles.email}>sandro@email.com</Text>
      </View>

      <Card style={styles.pointsCard}>
        <View style={styles.pointsInfo}>
          <Text style={styles.pointsTitle}>Pontos Rural</Text>
          <Text style={styles.pointsValue}>120 pts</Text>
        </View>
        <Text style={styles.pointsDesc}>Faltam 80 pontos para ganhar uma Margherita grátis!</Text>
      </Card>

      <Text style={styles.sectionTitle}>Histórico de Pedidos</Text>
      {HISTORY.map((item) => (
        <Card key={item.id} style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <Badge label={item.status} variant="success" />
          </View>
          <View style={styles.historyFooter}>
            <Text style={theme.typography.body}>Total: {item.total.toFixed(2)} €</Text>
            <TouchableOpacity>
              <Text style={styles.repeatText}>Repetir Pedido</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ))}

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.ruralCream,
  },
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.ruralRed,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },
  avatarText: {
    ...theme.typography.h1,
    color: theme.colors.white,
  },
  name: {
    ...theme.typography.h2,
    color: theme.colors.ruralDark,
  },
  email: {
    ...theme.typography.body,
    color: "#666",
  },
  pointsCard: {
    backgroundColor: theme.colors.ruralRed,
    marginBottom: theme.spacing.xl,
  },
  pointsInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  pointsTitle: {
    ...theme.typography.h3,
    color: theme.colors.white,
  },
  pointsValue: {
    ...theme.typography.h2,
    color: theme.colors.white,
  },
  pointsDesc: {
    ...theme.typography.caption,
    color: theme.colors.white,
    opacity: 0.9,
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
    color: theme.colors.ruralDark,
  },
  historyCard: {
    marginBottom: theme.spacing.md,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  historyDate: {
    ...theme.typography.body,
    fontWeight: "700",
  },
  historyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: theme.colors.graySoft,
    paddingTop: theme.spacing.sm,
  },
  repeatText: {
    ...theme.typography.body,
    color: theme.colors.ruralRed,
    fontWeight: "700",
  },
  logoutButton: {
    marginTop: theme.spacing.xl,
    alignItems: "center",
  },
  logoutText: {
    ...theme.typography.body,
    color: "#dc2626",
    fontWeight: "600",
  },
});
