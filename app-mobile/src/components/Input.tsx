import React, { useState } from "react";
import { TextInput, StyleSheet, TextInputProps, Text, View } from "react-native";
import { MotiView } from "moti";
import { useAppTheme } from "../theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, style: customStyle, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colors, spacing, radius, typography, motion } = useAppTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.md }]}>
      {label && (
        <Text
          style={[
            styles.label,
            { ...typography.caption, color: colors.text, marginBottom: spacing.xs },
          ]}
        >
          {label}
        </Text>
      )}
      <MotiView
        animate={{
          borderColor: error
            ? colors.error
            : isFocused
            ? colors.ruralRed
            : colors.border,
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{
          type: "timing",
          duration: motion.duration.fast,
        }}
        style={[
          styles.inputContainer,
          {
            borderRadius: radius.md,
            backgroundColor: colors.surface,
            paddingHorizontal: spacing.md,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            { ...typography.body, color: colors.text },
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.textSecondary}
          accessibilityLabel={label}
          accessibilityHint={props.placeholder}
          {...props}
        />
      </MotiView>
      {error && (
        <Text style={[styles.errorText, { ...typography.caption, color: colors.error, marginTop: spacing.xs }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontWeight: "600",
  },
  inputContainer: {
    borderWidth: 2,
    height: 52,
    justifyContent: "center",
  },
  input: {
    flex: 1,
  },
  errorText: {},
});
