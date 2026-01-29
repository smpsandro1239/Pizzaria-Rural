import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { theme } from "../theme";
import { Card } from "../components/Card";
import { AnimatedLoader } from "../components/AnimatedLoader";

const STEPS = [
  { id: 1, label: "A preparar", active: true },
  { id: 2, label: "No forno", active: false },
  { id: 3, label: "A caminho", active: false },
  { id: 4, label: "Entregue", active: false },
];

export const TrackingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AnimatedLoader />
        <Text style={styles.title}>A sua pizza está a ser preparada!</Text>
        <Text style={styles.subtitle}>Tempo estimado: 25-35 min</Text>
      </View>

      <Card style={styles.timeline}>
        {STEPS.map((step, index) => (
          <View key={step.id} style={styles.stepContainer}>
            <View style={styles.indicatorContainer}>
              <MotiView
                animate={{
                  backgroundColor: step.active ? theme.colors.ruralRed : theme.colors.graySoft,
                  scale: step.active ? 1.2 : 1,
                }}
                style={styles.indicator}
              />
              {index < STEPS.length - 1 && <View style={styles.line} />}
            </View>
            <Text
              style={[
                styles.stepLabel,
                { color: step.active ? theme.colors.ruralRed : "#999", fontWeight: step.active ? "700" : "400" },
              ]}
            >
              {step.label}
            </Text>
          </View>
        ))}
      </Card>

      <Card style={styles.details}>
        <Text style={styles.detailsTitle}>Detalhes do Pedido #12345</Text>
        <Text style={theme.typography.body}>1x Margherita Rural</Text>
        <Text style={theme.typography.body}>Total: 10,50 €</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.ruralCream,
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.xxl,
    marginTop: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.ruralDark,
    textAlign: "center",
    marginTop: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.body,
    color: "#666",
    marginTop: theme.spacing.xs,
  },
  timeline: {
    marginBottom: theme.spacing.lg,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  indicatorContainer: {
    alignItems: "center",
    width: 30,
    marginRight: theme.spacing.md,
  },
  indicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    zIndex: 1,
  },
  line: {
    width: 2,
    height: 44,
    backgroundColor: theme.colors.graySoft,
    position: "absolute",
    top: 16,
  },
  stepLabel: {
    ...theme.typography.body,
  },
  details: {
    backgroundColor: theme.colors.white,
  },
  detailsTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.sm,
    color: theme.colors.ruralDark,
  },
});
