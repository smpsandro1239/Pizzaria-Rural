import { colors } from "./colors";
import { spacing } from "./spacing";
import { radius } from "./radius";
import { typography } from "./typography";
import { motionDuration, motionDelay, motionEasing } from "./motion";

export const theme = {
  colors,
  spacing,
  radius,
  typography,
  motion: {
    duration: motionDuration,
    delay: motionDelay,
    easing: motionEasing,
  },
};

export type Theme = typeof theme;
