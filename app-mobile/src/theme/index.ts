import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { radius } from "./radius";
import { motion } from "./motion";

export const useAppTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? darkTheme : lightTheme;

  return {
    colors,
    spacing,
    typography,
    radius,
    motion,
    isDark,
  };
};

export const theme = {
  colors: lightTheme,
  spacing,
  typography,
  radius,
  motion,
};
