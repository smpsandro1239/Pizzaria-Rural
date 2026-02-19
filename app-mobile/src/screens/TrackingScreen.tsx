import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { MotiView } from "moti";
import { useAppTheme } from "../theme";
import { Card } from "../components/Card";
import { AnimatedLoader } from "../components/AnimatedLoader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation/types";
import { getOrderStatus } from "../api/orders";
import { socket, connectSocket, disconnectSocket } from "../api/socket";

type RoutePropType = RouteProp<RootStackParamList, 'Tracking'>;

const STEPS = [
  { id: 1, label: "Pedido Recebido", icon: "clipboard-text-outline", status: "PENDING" },
  { id: 2, label: "A preparar", icon: "silverware-fork-knife", status: "PREPARING" },
  { id: 3, label: "No forno", icon: "fire", status: "BAKING" },
  { id: 4, label: "A caminho", icon: "bike", status: "ON_THE_WAY" },
  { id: 5, label: "Entregue", icon: "home-check", status: "DELIVERED" },
];

export const TrackingScreen = () => {
  const { colors, spacing, typography, radius } = useAppTheme();
  const route = useRoute<RoutePropType>();
  const { orderId } = route.params;

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const updateVisualStep = (status: string) => {
    const stepIndex = STEPS.findIndex(s => s.status === status);
    if (stepIndex !== -1) {
        setCurrentStep(stepIndex + 1);
    }
  };

  const fetchOrder = async () => {
    try {
      const data = await getOrderStatus(orderId);
      setOrder(data);
      updateVisualStep(data.status);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();

    // Configuração Socket.io
    connectSocket();

    socket.on("connect", () => {
        socket.emit("joinOrder", orderId);
    });

    socket.on("orderStatusUpdated", (data: { orderId: string, status: string }) => {
        if (data.orderId === orderId) {
            updateVisualStep(data.status);
            setOrder(prev => prev ? { ...prev, status: data.status } : null);
        }
    });

    return () => {
        socket.off("orderStatusUpdated");
        disconnectSocket();
    };
  }, [orderId]);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing.lg, marginTop: spacing.xl }]}>
        <AnimatedLoader />
        <Text style={[styles.title, { ...typography.h2, color: colors.text, marginTop: spacing.md }]}>
          Estado da sua Encomenda
        </Text>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>
          ID: {orderId}
        </Text>
      </View>

      <View style={[styles.mapContainer, { margin: spacing.lg, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.surface }]}>
        <Image
          source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=38.7167,-9.1399&zoom=14&size=600x300&markers=color:red%7C38.7167,-9.1399&markers=color:green%7C38.7180,-9.1420&key=AIza' }}
          style={styles.mapPlaceholderImage}
        />
        <View style={[styles.mapOverlay, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
          <MaterialCommunityIcons name="map-marker-radius" size={24} color="white" />
          <Text style={[typography.caption, { color: 'white', marginLeft: 8 }]}> Tracking em Tempo Real Ativo </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: spacing.lg }}>
        <View style={[styles.progressBarContainer, { marginBottom: spacing.xl, backgroundColor: colors.border, borderRadius: radius.pill, height: 8 }]}>
          <MotiView
            animate={{ width: `${(currentStep / STEPS.length) * 100}%`, backgroundColor: colors.primary }}
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
                        backgroundColor: isActive ? colors.primary : colors.border,
                        scale: isCurrent ? 1.3 : 1
                    }}
                    style={[styles.dot, { borderRadius: radius.pill }]}
                  />
                  {index < STEPS.length - 1 && (
                    <View style={[styles.verticalLine, { backgroundColor: isActive ? colors.primary : colors.border }]} />
                  )}
                </View>
                <View style={[styles.labelCol, { paddingBottom: spacing.xl }]}>
                  <View style={styles.labelHeader}>
                    <MaterialCommunityIcons
                        name={step.icon as any}
                        size={20}
                        color={isActive ? colors.primary : colors.textSecondary}
                        style={{ marginRight: spacing.sm }}
                    />
                    <Text style={[
                        styles.stepLabel,
                        {
                            ...typography.body,
                            color: isActive ? colors.text : colors.textSecondary,
                            fontWeight: isCurrent ? "700" : "400"
                        }
                    ]}>
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
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { alignItems: "center" },
  title: { textAlign: "center" },
  mapContainer: { height: 180, position: 'relative' },
  mapPlaceholderImage: { width: '100%', height: '100%', opacity: 0.8 },
  mapOverlay: { position: 'absolute', top: 10, left: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  progressBarContainer: { width: "100%", overflow: "hidden" },
  progressBar: { height: "100%" },
  timeline: { paddingVertical: 10 },
  stepRow: { flexDirection: "row" },
  indicatorCol: { width: 40, alignItems: "center" },
  dot: { width: 20, height: 20, justifyContent: "center", alignItems: "center", zIndex: 2 },
  verticalLine: { width: 2, flex: 1, position: "absolute", top: 20, bottom: -20, zIndex: 1 },
  labelCol: { flex: 1, paddingLeft: 10 },
  labelHeader: { flexDirection: "row", alignItems: "center" },
  stepLabel: {},
});
