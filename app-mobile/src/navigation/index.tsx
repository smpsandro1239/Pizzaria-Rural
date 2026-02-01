import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../theme";

import { HomeScreen } from "../screens/HomeScreen";
import { MenuScreen } from "../screens/MenuScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { AccountScreen } from "../screens/AccountScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { TrackingScreen } from "../screens/TrackingScreen";
import { PizzaDetailScreen } from "../screens/PizzaDetailScreen";
<<<<<<< HEAD
import { AddressesScreen } from "../screens/AddressesScreen";
=======
>>>>>>> origin/main
import { Toast } from "../components/Toast";
import { useCartStore } from "../store/cart-store";

import { MainTabsParamList, RootStackParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabsParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainTabs = () => {
  const { colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.ruralRed,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.ruralRed,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerTitle: "Pizzaria Rural",
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pizza" color={color} size={size} />
          ),
          headerTitle: "Nosso Menu",
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
          headerTitle: "Os Meus Favoritos",
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Conta",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerTitle: "A Minha Conta",
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const { toast, hideToast } = useCartStore();
  const { colors } = useAppTheme();

  return (
    <>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.ruralRed,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "700",
        },
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PizzaDetail"
        component={PizzaDetailScreen}
        options={{ title: "Detalhes" }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Checkout" }}
      />
      <Stack.Screen
        name="Tracking"
        component={TrackingScreen}
        options={{ title: "Seguir Pedido" }}
      />
<<<<<<< HEAD
      <Stack.Screen
        name="Addresses"
        component={AddressesScreen}
        options={{ title: "Minhas Moradas" }}
      />
=======
>>>>>>> origin/main
    </Stack.Navigator>
    <Toast
      visible={toast.visible}
      message={toast.message}
      type={toast.type}
      onHide={hideToast}
    />
    </>
  );
};
