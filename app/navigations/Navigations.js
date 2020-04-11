import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import OffersScreenStack from "./OffersStack";
import OrdersScreenStack from "./OrdersStack";
import AccountScreenStack from "./Account/MyAccountStack";

const NavigationStacks = createBottomTabNavigator(
  {
    Offers: {
      screen: OffersScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Ofertas",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="city-variant-outline"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    Orders: {
      screen: OrdersScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Peticiones",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="home-city-outline"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    Account: {
      screen: AccountScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="account-circle-outline"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: "Account",
    order: ["Account", "Offers", "Orders"],
    tabBarOptions: {
      inactiveTintColor: "#66C6F1",
      activeTintColor: "#6A3E98",
    },
  }
);

export default createAppContainer(NavigationStacks);
