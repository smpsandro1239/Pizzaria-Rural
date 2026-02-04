<<<<<<< HEAD
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
=======
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
>>>>>>> origin/main
import { MotiView } from "moti";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
<<<<<<< HEAD
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation/types";
=======
>>>>>>> origin/main

const HISTORY = [
  { id: "1", date: "25 Jan 2024", total: 15.5, status: "Entregue" },
  { id: "2", date: "18 Jan 2024", total: 10.5, status: "Entregue" },
];

<<<<<<< HEAD
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AccountScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius } = useAppTheme();
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
=======
export const AccountScreen = () => {
  const { colors, spacing, typography, radius } = useAppTheme();
>>>>>>> origin/main

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

<<<<<<< HEAD
      <Text style={[styles.sectionTitle, { ...typography.h3, color: colors.text, marginBottom: spacing.md }]}>Definições</Text>

      <Card style={{ marginBottom: spacing.xl, padding: 0 }}>
        <TouchableOpacity
          style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: colors.border }]}
          onPress={() => navigation.navigate("Addresses")}
        >
          <View style={styles.menuItemLeft}>
            <MaterialCommunityIcons name="map-marker-outline" size={24} color={colors.text} />
            <Text style={[typography.body, { color: colors.text, marginLeft: spacing.md }]}>Gerir Moradas</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: colors.border }]}
          onPress={() => navigation.navigate("SupportChat")}
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
          <Switch
            value={biometricsEnabled}
            onValueChange={setBiometricsEnabled}
            trackColor={{ false: colors.border, true: colors.ruralRed }}
          />
        </View>
      </Card>

=======
>>>>>>> origin/main
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

<<<<<<< HEAD
      <TouchableOpacity style={[styles.logoutButton, { marginTop: spacing.xl, marginBottom: spacing.xxl }]}>
=======
      <TouchableOpacity style={[styles.logoutButton, { marginTop: spacing.xl }]}>
>>>>>>> origin/main
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
<<<<<<< HEAD
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
=======
>>>>>>> origin/main
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
  logoutButton: {
    alignItems: "center",
  },
  logoutText: {},
});
