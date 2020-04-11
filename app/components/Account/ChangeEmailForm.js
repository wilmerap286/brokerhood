import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import { reauthenticate } from "../../utils/Api";
import CST from "../../utils/CustomSettings";

export default function CahngeEmailForm(props) {
  const { email, setIsVisibleModal, setReloadData, toastRef } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(null);

  const updateNewEmail = async () => {
    setError({});
    if (!newEmail || email === newEmail) {
      setError({ email: "El email no puede ser igual o estar vacio" });
    } else {
      if (!validateEmail(newEmail)) {
        setError({ email: "El email es incorrecto" });
      } else {
        setIsLoading(true);
        reauthenticate(password)
          .then(() => {
            firebase
              .auth()
              .currentUser.updateEmail(newEmail)
              .then(() => {
                setIsLoading(false);
                setReloadData(true);
                toastRef.current.show("Email actualizado correcatmente");
                setIsVisibleModal(false);
              })
              .catch(() => {
                setError({ email: "Error al actualizar el email" });
                setIsLoading(false);
              });
          })
          .catch(() => {
            setError({ password: "Contraseña Incorrecta" });
            setIsLoading(false);
          });
      }
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Email"
        containerStyle={styles.input}
        onChange={e => setNewEmail(e.nativeEvent.text)}
        defaultValue={email && email}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2"
        }}
        errorMessage={error.email}
      />
      <Input
        placeholder="Password"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hidePassword}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hidePassword ? "eye-outline" : "eye-off-outline",
          iconStyle: styles.iconRigth,
          onPress: () => setHidePassword(!hidePassword)
        }}
        errorMessage={error.password}
      />
      <Button
        title="Actualizar Email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnUpdate}
        onPress={updateNewEmail}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    width: "100%",
    marginTop: 20
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btnUpdate: {
    backgroundColor: CST.colorPrm
  },
  iconRigth: {
    color: "#c2c2c2"
  }
});
