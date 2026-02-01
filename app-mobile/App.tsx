import React from "react";
import "./src/i18n";
import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Navigation } from "./src/navigation";

export default function App() {
  const linking = {
    prefixes: [Linking.createURL("/"), "pizzariarural://"],
    config: {
      screens: {
        MainTabs: {
          screens: {
            Home: "home",
            Menu: "menu",
            Favorites: "favorites",
            Account: "account",
          },
        },
        PizzaDetail: "pizza/:id",
        Checkout: "checkout",
        Tracking: "tracking/:orderId",
        Addresses: "addresses",
      },
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer linking={linking}>
        <Navigation />
        <StatusBar style="light" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
