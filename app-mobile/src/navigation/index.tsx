import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../theme";

import { HomeScreen } from "../screens/HomeScreen";
import { MenuScreen } from "../screens/MenuScreen";
import { AccountScreen } from "../screens/AccountScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { TrackingScreen } from "../screens/TrackingScreen";
import { PizzaDetailScreen } from "../screens/PizzaDetailScreen";

import { MainTabsParamList, RootStackParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabsParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.ruralRed,
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopColor: theme.colors.graySoft,
        },
        headerStyle: {
          backgroundColor: theme.colors.ruralRed,
        },
        headerTintColor: theme.colors.white,
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
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.ruralRed,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontWeight: "700",
        },
        animation: "slide_from_right",
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
    </Stack.Navigator>
  );
};
