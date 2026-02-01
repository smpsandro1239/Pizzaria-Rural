import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../theme";

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: number;
  showCount?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, count, size = 16, showCount = true }) => {
  const { colors, typography, spacing } = useAppTheme();

  return (
    <View
      style={styles.container}
      accessibilityLabel={`Avaliação de ${rating.toFixed(1)} estrelas`}
    >
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <MaterialCommunityIcons
            key={star}
            name={star <= rating ? "star" : star - 0.5 <= rating ? "star-half-full" : "star-outline"}
            size={size}
            color="#FFD700"
          />
        ))}
      </View>
      {showCount && (
        <Text style={[styles.text, { ...typography.caption, color: colors.textSecondary, marginLeft: spacing.xs }]}>
          {rating.toFixed(1)} {count !== undefined && `(${count})`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
  },
  text: {
    fontWeight: "600",
  },
});
