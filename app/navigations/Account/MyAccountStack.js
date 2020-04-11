import { createStackNavigator } from "react-navigation-stack";
import AccountScreen from "../../screens/Account/MyAccount";
import LoginScreen from "../../screens/Account/Login";
import RegisterScreen from "../../screens/Account/Register";

const AccountScreenStack = createStackNavigator({
  Account: {
    screen: AccountScreen,
    navigationOptions: () => ({
      title: "Mi Perfil",
    }),
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: "Login",
    }),
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: "Registro",
    }),
  },
});

export default AccountScreenStack;
