import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "../theme";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuthStore } from "../store/auth-store";
import { api } from "../api/client";

export const LoginScreen = () => {
  const { colors, spacing, typography } = useAppTheme();
  const navigation = useNavigation();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      setUser(response.data.user, response.data.access_token);
      navigation.goBack();
    } catch (err: any) {
      console.error(err);
      Alert.alert("Erro de Autenticação", "Email ou palavra-passe incorretos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView contentContainerStyle={[styles.content, { padding: spacing.xl }]}>
        <View style={styles.header}>
          <Text style={[typography.h1, { color: colors.text }]}>Bem-vindo</Text>
          <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
            Inicie sessão para continuar
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="E-mail"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Palavra-passe"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            style={{ marginTop: spacing.lg }}
          />

          <View style={styles.footer}>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              Ainda não tem conta?
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={[typography.caption, { color: colors.primary, fontWeight: '700', marginLeft: spacing.xs }]}>
                Registar-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  content: { flexGrow: 1, justifyContent: "center" },
  header: { marginBottom: 32 },
  form: { width: "100%" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 32 },
});
