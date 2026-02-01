import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../theme";

interface SwipeableRowProps {
  children: React.ReactNode;
  onDelete: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

export const SwipeableRow: React.FC<SwipeableRowProps> = ({ children, onDelete }) => {
  const { colors, spacing } = useAppTheme();
  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = Math.max(event.translationX, -SCREEN_WIDTH);
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withSpring(-SCREEN_WIDTH, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(onDelete)();
          }
        });
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withSpring(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
    return { opacity };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle, { backgroundColor: colors.error }]}>
        <MaterialCommunityIcons name="delete-outline" size={24} color="white" />
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={rStyle}>{children}</Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
    borderRadius: 12,
  },
});
