import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import LottieView from "lottie-react-native";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

const INITIAL_STEPS = [
  { id: 1, label: "A preparar", active: true },
  { id: 2, label: "No forno", active: false },
  { id: 3, label: "A caminho", active: false },
  { id: 4, label: "Entregue", active: false },
];

export const TrackingScreen = () => {
  const { colors, spacing, typography } = useAppTheme();
  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [isDelivered, setIsDelivered] = useState(false);

  const simulateNextStep = () => {
    const nextStepIndex = steps.findIndex(s => !s.active);
    if (nextStepIndex === -1) return;

    const newSteps = steps.map((s, i) => ({
      ...s,
      active: i <= nextStepIndex,
    }));
    setSteps(newSteps);

    if (nextStepIndex === steps.length - 1) {
      setIsDelivered(true);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      {isDelivered && (
        <LottieView
          source={{ uri: "https://assets5.lottiefiles.com/packages/lf20_u4j3hybe.json" }} // Confetti
          autoPlay
          loop={false}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      )}

      <View style={[styles.header, { marginBottom: spacing.xxl }]}>
        <LottieView
          source={{
            uri: isDelivered
              ? "https://assets10.lottiefiles.com/packages/lf20_ebv8p7qf.json" // Success/Check
              : "https://assets9.lottiefiles.com/packages/lf20_myejig9v.json"  // Preparation
          }}
          autoPlay
          loop={!isDelivered}
          style={{ width: 200, height: 200 }}
        />
        <Text style={[styles.title, { ...typography.h2, color: colors.text, marginTop: spacing.md }]}>
          {isDelivered ? "Bom apetite! 🍕" : "A sua pizza está a ser preparada!"}
        </Text>
        <Text style={[styles.subtitle, { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs }]}>
          {isDelivered ? "O seu pedido foi entregue." : "Tempo estimado: 25-35 min"}
        </Text>
      </View>

      <Card style={{ ...styles.timeline, marginBottom: spacing.lg }}>
        {steps.map((step, index) => (
          <View key={step.id} style={styles.stepContainer}>
            <View style={[styles.indicatorContainer, { marginRight: spacing.md }]}>
              <MotiView
                animate={{
                  backgroundColor: step.active ? colors.ruralRed : colors.border,
                  scale: step.active ? 1.2 : 1,
                }}
                style={styles.indicator}
              />
              {index < steps.length - 1 && <View style={[styles.line, { backgroundColor: colors.border }]} />}
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

      <Card style={{ ...styles.details, backgroundColor: colors.surface, marginBottom: spacing.lg }}>
        <Text style={[styles.detailsTitle, { ...typography.h3, color: colors.text, marginBottom: spacing.sm }]}>Detalhes do Pedido #12345</Text>
        <Text style={[typography.body, { color: colors.text }]}>1x Margherita Rural</Text>
        <Text style={[typography.body, { color: colors.text }]}>Total: 10,50 €</Text>
      </Card>

      {!isDelivered && (
        <Button label="Simular Próximo Passo" onPress={simulateNextStep} variant="outline" />
      )}
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
