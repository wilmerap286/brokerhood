import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import SRV from "../../utils/Service";
import CST from "../../utils/CustomSettings";

export default function CahngeNameForm(props) {
  const { displayName, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newName, setNewName] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newTele, setNewTele] = useState("");
  const [newCargo, setNewCargo] = useState("");
  const [newCiudad, setNewCiudad] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currBroker, setCurrBroker] = useState("");

  useEffect(() => {
    //Se invoca funcion asyncrona que obtiene el broker asociado al usuario
    const traerBroker = async () => {
      const curr_user = firebase.auth().currentUser.uid;
      let data = await SRV.getBroker(curr_user);
      setCurrBroker(data);
      setNewName(data.brk_name);
      setNewCompany(data.brk_company);
      setNewEmail(data.brk_mail);
      setNewTele(data.brk_telefono);
      setNewCiudad(data.brk_ciudad);
      setNewCargo(data.brk_cargo);
    };

    //Se invoca la funcion Async
    traerBroker();
  }, []);

  const updateNewName = async () => {
    setError({});
    if (
      !newName ||
      !newCompany ||
      !newEmail ||
      !newCargo ||
      !newTele ||
      !newCiudad
    ) {
      let objError = {};
      !newName && (objError.nombre = "No puede estar vacio");
      !newCompany && (objError.company = "Debe registrar la compañia");
      !newEmail && (objError.email = "No puede estar vacio");
      !newCargo && (objError.cargo = "Registre el cargo ocupado");
      !newTele && (objError.telefono = "Registre numero de contacto");
      !newCiudad && (objError.ciudad = "Debe registrar la ciudad");
      setError(objError);
    } else {
      setIsLoading(true);
      const update = {
        displayName: newName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          updateBroker();
        })
        .catch(() => {
          setError("Error al actualizar el nombre");
          setIsLoading(false);
        });
    }
  };

  const updateBroker = async () => {
    let val_broker = await SRV.updateDatosBroker(
      firebase.auth().currentUser.uid,
      newName,
      newCompany,
      newEmail,
      newTele,
      newCargo,
      newCiudad
    );
    if (val_broker.type > 0) {
      setIsLoading(false);
      setReloadData(true);
      toastRef.current.show("Nombre actualizado correcatmente");
      setIsVisibleModal(false);
    } else {
      setIsLoading(false);
      Alert.alert(val_broker.message);
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        onChange={(e) => setNewName(e.nativeEvent.text)}
        defaultValue={currBroker.brk_name && currBroker.brk_name}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error.nombre}
      />
      <Input
        placeholder="Compañía"
        containerStyle={styles.input}
        onChange={(e) => setNewCompany(e.nativeEvent.text)}
        defaultValue={currBroker.brk_company && currBroker.brk_company}
        rightIcon={{
          type: "material-community",
          name: "shield-account-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error.company}
      />
      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        containerStyle={styles.input}
        onChange={(e) => setNewEmail(e.nativeEvent.text)}
        defaultValue={currBroker.brk_mail && currBroker.brk_mail}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        errorMessage={error.email}
      />
      <Input
        placeholder="Telefono"
        keyboardType="phone-pad"
        containerStyle={styles.input}
        onChange={(e) => setNewTele(e.nativeEvent.text)}
        defaultValue={currBroker.brk_telefono && currBroker.brk_telefono}
        rightIcon={{
          type: "material-community",
          name: "phone",
          color: "#c2c2c2",
        }}
        errorMessage={error.telefono}
      />
      <Input
        placeholder="Cargo que Ocupa"
        containerStyle={styles.input}
        onChange={(e) => setNewCargo(e.nativeEvent.text)}
        defaultValue={currBroker.brk_cargo && currBroker.brk_cargo}
        rightIcon={{
          type: "material-community",
          name: "seat-recline-extra",
          color: "#c2c2c2",
        }}
        errorMessage={error.cargo}
      />
      <Input
        placeholder="Ciudad de Residencia"
        containerStyle={styles.input}
        onChange={(e) => setNewCiudad(e.nativeEvent.text)}
        defaultValue={currBroker.brk_ciudad && currBroker.brk_ciudad}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: "#c2c2c2",
        }}
        errorMessage={error.ciudad}
      />
      <Button
        title="Actualizar Perfil"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnUpdate}
        onPress={updateNewName}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    width: "100%",
    marginTop: 20,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btnUpdate: {
    backgroundColor: CST.colorPrm,
  },
});
