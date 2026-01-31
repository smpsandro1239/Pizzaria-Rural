import React from "react";
import { StyleSheet } from "react-native";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../theme";

export const AnimatedLoader = () => {
  const { colors, motion } = useAppTheme();

  return (
    <MotiView
      from={{ rotate: "0deg" }}
      animate={{ rotate: "360deg" }}
      transition={{
        loop: true,
        repeatReverse: false,
        type: "timing",
        duration: 1200,
        easing: motion.easing.standard as any,
      }}
      style={styles.container}
    >
      <MaterialCommunityIcons name="pizza" size={48} color={colors.ruralRed} />
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
