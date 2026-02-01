import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../theme";
import { Card } from "./Card";

interface ReviewCardProps {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ author, rating, comment, date }) => {
  const { colors, spacing, typography, radius } = useAppTheme();

  return (
    <Card style={[styles.container, { backgroundColor: colors.surface, padding: spacing.md }]}>
      <View style={styles.header}>
        <Text style={[styles.author, { ...typography.body, color: colors.text, fontWeight: "700" }]}>{author}</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <MaterialCommunityIcons
              key={star}
              name={star <= rating ? "star" : "star-outline"}
              size={14}
              color="#FFD700"
            />
          ))}
        </View>
      </View>
      <Text style={[styles.comment, { ...typography.caption, color: colors.text, marginVertical: spacing.xs }]} numberOfLines={3}>
        "{comment}"
      </Text>
      <Text style={[styles.date, { ...typography.caption, color: colors.textSecondary, fontSize: 10 }]}>{date}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 240,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  author: {},
  stars: {
    flexDirection: "row",
  },
  comment: {
    fontStyle: "italic",
  },
  date: {},
});
