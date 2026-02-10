import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MotiView } from "moti";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation/types";
import { useAuthStore } from "../store/auth-store";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AccountScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, spacing, typography, radius } = useAppTheme();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert("Terminar Sessão", "Tem a certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: logout }
    ]);
  };

  if (!isAuthenticated) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <MaterialCommunityIcons name="account-lock-outline" size={80} color={colors.textSecondary} />
        <Text style={[typography.h2, { color: colors.text, marginTop: spacing.lg }]}>Entre na sua conta</Text>
        <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center', marginHorizontal: spacing.xl, marginTop: spacing.sm }]}>
          Aceda aos seus pedidos, favoritos e pontos de fidelidade.
        </Text>
        <Button
          title="Fazer Login"
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: spacing.xl, width: '80%' }}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { padding: spacing.lg }]}
    >
      <View style={[styles.header, { marginBottom: spacing.xl }]}>
        <View style={[styles.avatar, { backgroundColor: colors.graySoft, borderRadius: radius.full }]}>
          <Text style={[typography.h1, { color: colors.text }]}>
            {user?.name?.charAt(0) || user?.email.charAt(0)}
          </Text>
        </View>
        <Text style={[typography.h2, { color: colors.text }]}>{user?.name || "Utilizador"}</Text>
        <Text style={[typography.body, { color: colors.textSecondary }]}>{user?.email}</Text>
        {user?.role === 'ADMIN' && (
          <View style={[styles.adminBadge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[typography.caption, { color: colors.primary, fontWeight: '700' }]}>ADMINISTRADOR</Text>
          </View>
        )}
      </View>

      <Card style={{ ...styles.pointsCard, backgroundColor: colors.secondary, marginBottom: spacing.xl }}>
        <View style={[styles.pointsInfo, { marginBottom: spacing.sm }]}>
          <Text style={[typography.h3, { color: colors.background }]}>Fidelidade</Text>
          <Text style={[typography.h2, { color: colors.background }]}>{user?.points || 0} / 200 pts</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <MotiView
            from={{ width: 0 }}
            animate={{ width: `${Math.min(((user?.points || 0) / 200) * 100, 100)}%` }}
            transition={{ type: "timing", duration: 1000 }}
            style={[styles.progressBar, { backgroundColor: colors.primary }]}
          />
        </View>
      </Card>

      <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>Definições</Text>
      <Card style={{ marginBottom: spacing.xl, padding: 0 }}>
        <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
          <MaterialCommunityIcons name="map-marker-outline" size={22} color={colors.text} />
          <Text style={[typography.body, { color: colors.text, marginLeft: spacing.md, flex: 1 }]}>Gerir Moradas</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
          <MaterialCommunityIcons name="chat-question-outline" size={22} color={colors.text} />
          <Text style={[typography.body, { color: colors.text, marginLeft: spacing.md, flex: 1 }]}>Suporte Rural</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textSecondary} />
        </TouchableOpacity>
        <View style={styles.menuItem}>
          <MaterialCommunityIcons name="fingerprint" size={22} color={colors.text} />
          <Text style={[typography.body, { color: colors.text, marginLeft: spacing.md, flex: 1 }]}>Acesso Biométrico</Text>
          <Switch
            value={biometricsEnabled}
            onValueChange={setBiometricsEnabled}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
        </View>
      </Card>

      <Button
        title="Terminar Sessão"
        variant="outline"
        onPress={handleLogout}
        style={{ marginBottom: spacing.xxl }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {},
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { alignItems: "center" },
  avatar: { width: 80, height: 80, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  adminBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 8 },
  pointsCard: { padding: 20 },
  pointsInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressBarContainer: { height: 6, backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 3, overflow: "hidden" },
  progressBar: { height: "100%" },
  menuItem: { flexDirection: "row", alignItems: "center", padding: 16 },
});
