import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MotiView } from "moti";
import LottieView from "lottie-react-native";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";

const STEPS = [
  { id: 1, label: "A preparar", active: true },
  { id: 2, label: "No forno", active: false },
  { id: 3, label: "A caminho", active: false },
  { id: 4, label: "Entregue", active: false },
];

export const TrackingScreen = () => {
  const { colors, spacing, typography } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <View style={[styles.header, { marginBottom: spacing.xxl }]}>
        <LottieView
          source={{ uri: "https://assets9.lottiefiles.com/packages/lf20_myejig9v.json" }} // Pizza preparation animation
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text style={[styles.title, { ...typography.h2, color: colors.text, marginTop: spacing.md }]}>A sua pizza está a ser preparada!</Text>
        <Text style={[styles.subtitle, { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs }]}>Tempo estimado: 25-35 min</Text>
      </View>

      <Card style={{ ...styles.timeline, marginBottom: spacing.lg }}>
        {STEPS.map((step, index) => (
          <View key={step.id} style={styles.stepContainer}>
            <View style={[styles.indicatorContainer, { marginRight: spacing.md }]}>
              <MotiView
                animate={{
                  backgroundColor: step.active ? colors.ruralRed : colors.border,
                  scale: step.active ? 1.2 : 1,
                }}
                style={styles.indicator}
              />
              {index < STEPS.length - 1 && <View style={[styles.line, { backgroundColor: colors.border }]} />}
            </View>
            <Text
              style={[
                styles.stepLabel,
                { ...typography.body, color: step.active ? colors.ruralRed : colors.textSecondary, fontWeight: step.active ? "700" : "400" },
              ]}
            >
              {step.label}
            </Text>
          </View>
        ))}
      </Card>

      <Card style={{ ...styles.details, backgroundColor: colors.surface }}>
        <Text style={[styles.detailsTitle, { ...typography.h3, color: colors.text, marginBottom: spacing.sm }]}>Detalhes do Pedido #12345</Text>
        <Text style={[typography.body, { color: colors.text }]}>1x Margherita Rural</Text>
        <Text style={[typography.body, { color: colors.text }]}>Total: 10,50 €</Text>
      </Card>
    </View>
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
  subtitle: {},
  timeline: {},
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  indicatorContainer: {
    alignItems: "center",
    width: 30,
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
    position: "absolute",
    top: 16,
  },
  stepLabel: {},
  details: {},
  detailsTitle: {},
});
