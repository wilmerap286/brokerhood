import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
import Loading from "../Loading";
import MyAccount from "../../screens/Account/MyAccount";
import CST from "../../utils/CustomSettings";
import SRV from "../../utils/Service";
import { saveItem, updateItem, getItem } from "../../utils/Storage";
import { ACCESS_TOKEN, USER_INFO } from "../../constants";

function LoginForm(props) {
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singin = async () => {
    setIsVisibleLoading(true);
    if (!email || !password) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("Email incorrecto");
      } else {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              navigation.navigate("MyAccount");
            })
            .catch(() => {
              toastRef.current.show("Email o Contraseña Incorrectos");
            });
        } catch (error) {
          Alert.alert("ERROR", error);
        }
      }
    }
    setIsVisibleLoading(false);
  };

  const traerBroker = async (navigation) => {
    const curr_user = firebase.auth().currentUser.uid;
    let data = await SRV.getBroker(curr_user);
    const usrAnt = await getItem(USER_INFO);
    console.log("paso 1");
    if (usrAnt) {
      const userResult = await updateItem(USER_INFO, JSON.stringify(data));
    } else {
      const userResult = await saveItem(USER_INFO, JSON.stringify(data));
    }
  };

  return (
    <View style={styles.formContainer} behavior="padding" enabled>
      <Input
        placeholder="Correo Electronico"
        keyboardType="email-address"
        containerStyle={styles.inputForm}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRigth}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        password={true}
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRigth}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Button
        title="Iniciar Sesion"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={singin}
      />
      <Loading text="Validando Credenciales..." isVisible={isVisibleLoading} />
    </View>
  );
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRigth: {
    color: "#c1c1c1",
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: CST.colorPrm,
  },
});
