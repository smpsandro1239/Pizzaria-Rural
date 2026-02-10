export type RootStackParamList = {
  MainTabs: undefined;
  PizzaDetail: { id: string };
  Checkout: undefined;
  Tracking: { orderId: string };
  AdminProductForm: { id?: string };
  Login: undefined;
};

export type MainTabsParamList = {
  Home: undefined;
  Menu: undefined;
  Favorites: undefined;
  Account: undefined;
  AdminPanel: undefined;
};
