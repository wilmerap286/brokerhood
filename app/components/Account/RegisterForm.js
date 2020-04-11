import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
//import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
import Loading from "../Loading";
import MyAccount from "../../screens/Account/MyAccount";
import SRV from "../../utils/Service";
import CST from "../../utils/CustomSettings";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

function RegisterForm(props) {
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [nameBroker, setNameBroker] = useState("");
  const [companyBroker, setCompanyBroker] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const db = firebase.firestore(firebaseApp);

  const register = async () => {
    setIsVisibleLoading(true);
    if (!email || !password || !repeatPassword || !nameBroker) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("Email incorrecto");
      } else {
        if (password !== repeatPassword) {
          toastRef.current.show("Las contraseñas no son iguales");
        } else {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              //Se crea el broker en la base de datos remota
              createBroker();
            })
            .catch(() => {
              toastRef.current.show("Error al crear el usuario", 200);
            });
        }
      }
    }
    setIsVisibleLoading(false);
  };

  //Funcion que crea el primer miembro del grupo
  const createBroker = async () => {
    const user = firebase.auth().currentUser.uid;
    let val_broker = await SRV.createBroker(
      user,
      nameBroker,
      companyBroker,
      email
    );
    if (val_broker.type > 0) {
      const update = {
        displayName: nameBroker,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          navigation.navigate("MyAccount");
        })
        .catch(() => {
          setError("Error al actualizar el nombre");
          setIsVisibleLoading(false);
        });
    } else {
      setIsVisibleLoading(false);
      Alert.alert(val_broker.message);
    }
  };

  return (
    <View style={styles.formContainer} behavior="padding" enabled>
      <Input
        placeholder="Nombre"
        containerStyle={styles.inputForm}
        onChange={(e) => setNameBroker(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="account"
            iconStyle={styles.iconRigth}
          />
        }
      />
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
      <Input
        placeholder="Repetir Contraseña"
        password={true}
        secureTextEntry={hideRepeatPassword}
        containerStyle={styles.inputForm}
        onChange={(e) => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRigth}
            onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse a Brokerhood"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={register}
      />
      <Loading text="Creando cuenta..." isVisible={isVisibleLoading} />
    </View>
  );
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRigth: {
    color: "#c1c1c1",
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: CST.colorPrm,
  },
});
