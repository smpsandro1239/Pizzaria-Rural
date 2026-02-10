import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle
} from "react-native";
import { useAppTheme } from "../theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input = ({ label, error, containerStyle, ...props }: InputProps) => {
  const { colors, radius, spacing, typography } = useAppTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[
          typography.caption,
          { color: colors.text, marginBottom: spacing.xs, fontWeight: "600" }
        ]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.error : colors.border,
            borderRadius: radius.md,
            color: colors.text,
            padding: spacing.md,
          },
        ]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
      {error && (
        <Text style={[typography.caption, { color: colors.error, marginTop: spacing.xs }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    fontSize: 16,
  },
});
