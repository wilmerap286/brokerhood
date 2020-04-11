import { createStackNavigator } from "react-navigation-stack";
import OrdersScreen from "../screens/Orders/Orders";
import AddOrderScreen from "../screens/Orders/AddOrder";

const OrdersScreenStack = createStackNavigator({
  Orders: {
    screen: OrdersScreen,
    navigationOptions: () => ({
      title: "Mis Peticiones",
    }),
  },
  AddOrder: {
    screen: AddOrderScreen,
    navigationOptions: () => ({
      title: "Mis Peticiones",
    }),
  },
});

export default OrdersScreenStack;
