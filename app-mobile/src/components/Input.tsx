import React, { useState } from "react";
import { TextInput, StyleSheet, TextInputProps, Text, View } from "react-native";
import { MotiView } from "moti";
import { theme } from "../theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <MotiView
        animate={{
          borderColor: error
            ? "#dc2626"
            : isFocused
            ? theme.colors.ruralRed
            : theme.colors.graySoft,
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{
          type: "timing",
          duration: theme.motion.duration.fast,
        }}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#999"
          {...props}
        />
      </MotiView>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    width: "100%",
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.ruralDark,
    marginBottom: theme.spacing.xs,
    fontWeight: "600",
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    height: 52,
    justifyContent: "center",
  },
  input: {
    ...theme.typography.body,
    color: theme.colors.ruralDark,
  },
  errorText: {
    ...theme.typography.caption,
    color: "#dc2626",
    marginTop: theme.spacing.xs,
  },
});
