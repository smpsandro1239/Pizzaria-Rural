import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../theme";
import { useAuthStore } from "../store/auth-store";

import { HomeScreen } from "../screens/HomeScreen";
import { MenuScreen } from "../screens/MenuScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { AccountScreen } from "../screens/AccountScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { TrackingScreen } from "../screens/TrackingScreen";
import { PizzaDetailScreen } from "../screens/PizzaDetailScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { AdminProductFormScreen } from "../screens/AdminProductFormScreen";
import { Toast } from "../components/Toast";
import { useCartStore } from "../store/cart-store";

import { MainTabsParamList, RootStackParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabsParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainTabs = () => {
  const { colors, spacing } = useAppTheme();
  const { user } = useAuthStore();
  const isAdmin = user?.role === "ADMIN";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 18,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-variant" color={color} size={24} />
          ),
          headerTitle: "Pizzaria Rural",
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pizza" color={color} size={24} />
          ),
          headerTitle: "Explorar Menu",
        }}
      />

      {isAdmin && (
        <Tab.Screen
          name="AdminPanel"
          component={MenuScreen}
          options={{
            tabBarLabel: "Admin",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="shield-check" color={color} size={24} />
            ),
            headerTitle: "Gestão de Produtos",
          }}
        />
      )}

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart-outline" color={color} size={24} />
          ),
          headerTitle: "Favoritos",
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={24} />
          ),
          headerTitle: "Perfil",
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const { toast, hideToast } = useCartStore();
  const { colors } = useAppTheme();
  const { loadSession } = useAuthStore();

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "700",
        },
        headerShadowVisible: false,
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
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Finalizar Pedido" }}
      />
      <Stack.Screen
        name="Tracking"
        component={TrackingScreen}
        options={{ title: "Estado do Pedido" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Entrar" }}
      />
      <Stack.Screen
        name="AdminProductForm"
        component={AdminProductFormScreen}
        options={{ title: "Produto" }}
      />
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
