export const motionDuration = {
  instant: 80,
  fast: 160,
  normal: 240,
  slow: 320,
  modal: 380,
  hero: 450,
};

export const motionDelay = {
  none: 0,
  xs: 40,
  sm: 80,
  md: 120,
};

export const motionEasing = {
  standard: [0.2, 0.0, 0.0, 1] as [number, number, number, number],
  decelerate: [0.0, 0.0, 0.0, 1] as [number, number, number, number],
  accelerate: [0.3, 0.0, 1, 1] as [number, number, number, number],
  spring: { damping: 14, stiffness: 180 },
};

export const motion = {
  duration: motionDuration,
  delay: motionDelay,
  easing: motionEasing,
};
