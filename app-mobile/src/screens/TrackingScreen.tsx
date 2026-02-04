import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
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
  const [currentStep] = useState(4);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing.lg, marginTop: spacing.xl }]}>
        <AnimatedLoader />
        <Text style={[styles.title, { ...typography.h2, color: colors.text, marginTop: spacing.md }]}>
          Estado da sua Encomenda
        </Text>
        <Text style={[styles.subtitle, { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs }]}>
          Tempo estimado: 15 min
        </Text>
      </View>

      {/* Mapa Visual Placeholder para Web/Dev */}
      <View style={[styles.mapContainer, { margin: spacing.lg, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.surface }]}>
<<<<<<< Updated upstream
        <Image
          source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=38.7167,-9.1399&zoom=14&size=600x300&markers=color:red%7C38.7167,-9.1399&markers=color:green%7C38.7180,-9.1420&key=YOUR_API_KEY_HERE' }}
=======
        <Image
          source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=38.7167,-9.1399&zoom=14&size=600x300&markers=color:red%7C38.7167,-9.1399&markers=color:green%7C38.7180,-9.1420&key=YOUR_API_KEY_HERE' }}
>>>>>>> Stashed changes
          style={styles.mapPlaceholderImage}
        />
        <View style={[styles.mapOverlay, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
          <MaterialCommunityIcons name="map-marker-radius" size={24} color="white" />
          <Text style={[typography.caption, { color: 'white', marginLeft: 8 }]}>
            Mapa Rural Ativo
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: spacing.lg }}>
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
<<<<<<< Updated upstream

=======

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

                <View style={[styles.labelCol, { paddingBottom: spacing.xl }]}>
                  <View style={styles.labelHeader}>
                    <MaterialCommunityIcons
                      name={step.icon as any}
                      size={20}
                      color={isActive ? colors.ruralRed : colors.textSecondary}
=======

                <View style={[styles.labelCol, { paddingBottom: spacing.xl }]}>
                  <View style={styles.labelHeader}>
                    <MaterialCommunityIcons
                      name={step.icon as any}
                      size={20}
                      color={isActive ? colors.ruralRed : colors.textSecondary}
>>>>>>> Stashed changes
                      style={{ marginRight: spacing.sm }}
                    />
                    <Text
                      style={[
                        styles.stepLabel,
<<<<<<< Updated upstream
                        {
                          ...typography.body,
                          color: isActive ? colors.text : colors.textSecondary,
                          fontWeight: isCurrent ? "700" : "400"
=======
                        {
                          ...typography.body,
                          color: isActive ? colors.text : colors.textSecondary,
                          fontWeight: isCurrent ? "700" : "400"
>>>>>>> Stashed changes
                        },
                      ]}
                    >
                      {step.label}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </Card>
      </View>
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
  mapContainer: {
    height: 180,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  mapPlaceholderImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  mapOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
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
});
