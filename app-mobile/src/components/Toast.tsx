import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { MotiView, AnimatePresence } from "moti";
import { theme } from "../theme";

interface ToastProps {
  visible: boolean;
  message: string;
  type?: "success" | "error";
  onHide: () => void;
}

export const Toast = ({ visible, message, type = "success", onHide }: ToastProps) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  return (
    <AnimatePresence>
      {visible && (
        <MotiView
          from={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -50 }}
          style={[
            styles.container,
            { backgroundColor: type === "success" ? "#4CAF50" : theme.colors.ruralRed },
          ]}
        >
          <Text style={styles.text}>{message}</Text>
        </MotiView>
      )}
    </AnimatePresence>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    ...theme.typography.body,
    color: theme.colors.white,
    fontWeight: "700",
    textAlign: "center",
  },
});
