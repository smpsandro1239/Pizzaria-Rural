import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MotiView } from "moti";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { AnimatedLoader } from "../components/AnimatedLoader";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const STEPS = [
  { id: 1, label: "Pedido Recebido", icon: "clipboard-text-outline" },
  { id: 2, label: "A preparar", icon: "silverware-fork-knife" },
  { id: 3, label: "No forno", icon: "fire" },
  { id: 4, label: "A caminho", icon: "bike" },
  { id: 5, label: "Entregue", icon: "home-check" },
];

export const TrackingScreen = () => {
  const { colors, spacing, typography, radius } = useAppTheme();
  const [currentStep, setCurrentStep] = useState(1);

  // Simular progresso automático para demonstração
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length ? prev + 1 : 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <View style={[styles.header, { marginBottom: spacing.xl, marginTop: spacing.xl }]}>
        <AnimatedLoader />
        <Text style={[styles.title, { ...typography.h2, color: colors.text, marginTop: spacing.md }]}>
          Estado da sua Encomenda
        </Text>
        <Text style={[styles.subtitle, { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs }]}>
          Tempo estimado: {30 - currentStep * 5} min
        </Text>
      </View>

      <View style={[styles.progressBarContainer, { marginBottom: spacing.xl, backgroundColor: colors.border, borderRadius: radius.pill, height: 8 }]}>
        <MotiView
          animate={{
            width: `${(currentStep / STEPS.length) * 100}%`,
            backgroundColor: colors.ruralRed,
          }}
          transition={{ type: "timing", duration: 1000 }}
          style={styles.progressBar}
        />
      </View>

      <Card style={styles.timeline}>
        {STEPS.map((step, index) => {
          const isActive = step.id <= currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <View key={step.id} style={styles.stepRow}>
              <View style={styles.indicatorCol}>
                <MotiView
                  animate={{
                    backgroundColor: isActive ? colors.ruralRed : colors.border,
                    scale: isCurrent ? 1.3 : 1,
                  }}
                  style={[styles.dot, { borderRadius: radius.pill }]}
                >
                  {isActive && (
                    <MaterialCommunityIcons name="check" size={10} color="white" />
                  )}
                </MotiView>
                {index < STEPS.length - 1 && (
                  <View style={[styles.verticalLine, { backgroundColor: isActive ? colors.ruralRed : colors.border }]} />
                )}
              </View>

              <View style={[styles.labelCol, { paddingBottom: spacing.xl }]}>
                <View style={styles.labelHeader}>
                  <MaterialCommunityIcons
                    name={step.icon as any}
                    size={20}
                    color={isActive ? colors.ruralRed : colors.textSecondary}
                    style={{ marginRight: spacing.sm }}
                  />
                  <Text
                    style={[
                      styles.stepLabel,
                      {
                        ...typography.body,
                        color: isActive ? colors.text : colors.textSecondary,
                        fontWeight: isCurrent ? "700" : "400"
                      },
                    ]}
                  >
                    {step.label}
                  </Text>
                </View>
                {isCurrent && (
                  <MotiView
                    from={{ opacity: 0, translateY: -5 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    style={{ marginTop: spacing.xs }}
                  >
                    <Text style={[typography.caption, { color: colors.ruralRed }]}>
                      Estamos a tratar disto agora...
                    </Text>
                  </MotiView>
                )}
              </View>
            </View>
          );
        })}
      </Card>

      <Card style={{ ...styles.courierCard, marginTop: spacing.xl, backgroundColor: colors.surface }}>
        <View style={styles.courierInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.border, borderRadius: radius.pill }]}>
            <MaterialCommunityIcons name="account" size={30} color={colors.textSecondary} />
          </View>
          <View style={{ marginLeft: spacing.md }}>
            <Text style={[typography.body, { fontWeight: "700", color: colors.text }]}>Carlos Entregas</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>O seu estafeta rural</Text>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={[styles.callButton, { backgroundColor: colors.ruralRed, borderRadius: radius.pill, padding: spacing.sm }]}>
            <MaterialCommunityIcons name="phone" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  progressBarContainer: {
    width: "100%",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
  timeline: {
    paddingVertical: 10,
  },
  stepRow: {
    flexDirection: "row",
  },
  indicatorCol: {
    width: 40,
    alignItems: "center",
  },
  dot: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    position: "absolute",
    top: 20,
    bottom: -20,
    zIndex: 1,
  },
  labelCol: {
    flex: 1,
    paddingLeft: 10,
  },
  labelHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepLabel: {},
  courierCard: {
    padding: 15,
  },
  courierInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  callButton: {},
});
