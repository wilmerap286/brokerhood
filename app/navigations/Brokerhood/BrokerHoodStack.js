import { createStackNavigator } from "react-navigation-stack";
import BrokerHoodScreen from "../../screens/Brokerhood/MyBrokerHoods";

const BrokerHoodScreenStack = createStackNavigator({
  BrokerHoods: {
    screen: BrokerHoodScreen,
    navigationOptions: () => ({
      title: "Mis Brokerhoods",
    }),
  },
});

export default BrokerHoodScreenStack;
