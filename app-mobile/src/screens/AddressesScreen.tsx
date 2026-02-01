import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { useAppTheme } from "../theme";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card } from "../components/Card";
import { useCartStore, Address } from "../store/cart-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const AddressesScreen = () => {
  const { colors, spacing, typography, radius } = useAppTheme();
  const { addresses, addAddress, removeAddress, setDefaultAddress } = useCartStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [label, setLabel] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleAdd = () => {
    if (!label || !street || !city || !zipCode) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    addAddress({ label, street, city, zipCode, isDefault: addresses.length === 0 });
    setLabel("");
    setStreet("");
    setCity("");
    setZipCode("");
    setShowAddForm(false);
  };

  const renderAddress = ({ item }: { item: Address }) => (
    <Card style={styles.addressCard}>
      <View style={styles.addressHeader}>
        <View style={styles.labelContainer}>
          <MaterialCommunityIcons
            name={item.label.toLowerCase().includes("casa") ? "home" : "briefcase"}
            size={20}
            color={colors.ruralRed}
          />
          <Text style={[styles.label, { ...typography.body, color: colors.text, marginLeft: spacing.xs }]}>
            {item.label}
          </Text>
        </View>
        <TouchableOpacity onPress={() => removeAddress(item.id)}>
          <MaterialCommunityIcons name="delete-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.street, { ...typography.caption, color: colors.textSecondary }]}>
        {item.street}
      </Text>
      <Text style={[styles.city, { ...typography.caption, color: colors.textSecondary }]}>
        {item.zipCode} {item.city}
      </Text>
      {!item.isDefault && (
        <TouchableOpacity
          style={styles.defaultButton}
          onPress={() => setDefaultAddress(item.id)}
        >
          <Text style={[styles.defaultText, { color: colors.ruralRed, ...typography.caption }]}>
            Definir como padrão
          </Text>
        </TouchableOpacity>
      )}
      {item.isDefault && (
        <View style={[styles.badge, { backgroundColor: colors.ruralGreen + "20" }]}>
          <Text style={[styles.badgeText, { color: colors.ruralGreen }]}>Padrão</Text>
        </View>
      )}
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { ...typography.h2, color: colors.text }]}>Minhas Moradas</Text>
        <TouchableOpacity onPress={() => setShowAddForm(!showAddForm)}>
          <MaterialCommunityIcons name={showAddForm ? "close" : "plus"} size={24} color={colors.ruralRed} />
        </TouchableOpacity>
      </View>

      {showAddForm ? (
        <View style={styles.form}>
          <Input label="Identificação (Ex: Casa, Trabalho)" value={label} onChangeText={setLabel} placeholder="Casa" />
          <Input label="Rua e Número" value={street} onChangeText={setStreet} placeholder="Rua das Flores, 123" />
          <View style={styles.row}>
            <View style={{ flex: 2, marginRight: spacing.sm }}>
              <Input label="Cidade" value={city} onChangeText={setCity} placeholder="Braga" />
            </View>
            <View style={{ flex: 1 }}>
              <Input label="Cód. Postal" value={zipCode} onChangeText={setZipCode} placeholder="4700-000" />
            </View>
          </View>
          <Button label="Guardar Morada" onPress={handleAdd} />
        </View>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={renderAddress}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { ...typography.body, color: colors.textSecondary, marginTop: spacing.xxl }]}>
              Ainda não tens moradas guardadas.
            </Text>
          }
          contentContainerStyle={{ paddingBottom: spacing.xxl }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {},
  form: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
  },
  addressCard: {
    marginBottom: 12,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontWeight: "700",
  },
  street: {},
  city: {},
  defaultButton: {
    marginTop: 8,
  },
  defaultText: {
    fontWeight: "600",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
  emptyText: {
    textAlign: "center",
  },
});
