import { createStackNavigator } from "react-navigation-stack";
import OffersScreen from "../screens/Offers/Offers";

const OffersScreenStack = createStackNavigator({
  Offers: {
    screen: OffersScreen,
    navigationOptions: () => ({
      title: "Mis Ofertas",
    }),
  },
});

export default OffersScreenStack;
