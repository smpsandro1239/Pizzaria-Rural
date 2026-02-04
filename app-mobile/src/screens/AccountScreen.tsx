import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MotiView } from "moti";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AccountScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography } = useAppTheme();
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={[styles.content, { padding: spacing.lg }]}>
      <View style={[styles.header, { marginBottom: spacing.xl }]}>
        <View style={[styles.avatar, { backgroundColor: colors.primary, borderRadius: 40 }]}>
          <Text style={[typography.h1, { color: "white" }]}>S</Text>
        </View>
        <Text style={[typography.h2, { color: colors.text }]}>Sandro</Text>
        <Text style={[typography.body, { color: colors.textSecondary }]}>sandro@email.com</Text>
      </View>

      <Card style={{ ...styles.pointsCard, backgroundColor: colors.primary, marginBottom: spacing.xl }}>
        <View style={[styles.pointsInfo, { marginBottom: spacing.sm }]}>
          <Text style={[typography.h3, { color: "white" }]}>Fidelidade</Text>
          <Text style={[typography.h2, { color: "white" }]}>120 / 200 pts</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <MotiView from={{ width: 0 }} animate={{ width: "60%" }} transition={{ type: "timing", duration: 1000 }} style={styles.progressBar} />
        </View>
      </Card>

      <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>Definições</Text>
      <Card style={{ marginBottom: spacing.xl, padding: 0 }}>
        <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: colors.border }]} onPress={() => navigation.navigate("Addresses")}>
          <MaterialCommunityIcons name="map-marker-outline" size={24} color={colors.text} />
          <Text style={[typography.body, { color: colors.text, marginLeft: spacing.md, flex: 1 }]}>Gerir Moradas</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: colors.border }]} onPress={() => navigation.navigate("SupportChat")}>
          <MaterialCommunityIcons name="chat-question-outline" size={24} color={colors.text} />
          <Text style={[typography.body, { color: colors.text, marginLeft: spacing.md, flex: 1 }]}>Suporte Rural</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <View style={styles.menuItem}>
          <MaterialCommunityIcons name="fingerprint" size={24} color={colors.text} />
          <Text style={[typography.body, { color: colors.text, marginLeft: spacing.md, flex: 1 }]}>Acesso Biométrico</Text>
          <Switch value={biometricsEnabled} onValueChange={setBiometricsEnabled} trackColor={{ false: colors.border, true: colors.primary }} />
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {},
  header: { alignItems: "center" },
  avatar: { width: 80, height: 80, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  pointsCard: {},
  pointsInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressBarContainer: { height: 8, backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 4, overflow: "hidden" },
  progressBar: { height: "100%", backgroundColor: "#FFD700" },
  menuItem: { flexDirection: "row", alignItems: "center", padding: 16 },
});
