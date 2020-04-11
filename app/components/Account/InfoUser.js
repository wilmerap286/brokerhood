import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import SRV from "../../utils/Service";

export default function InfoUser(props) {
  const {
    userInfo: { uid, displayName, email, photoURL },
    setReloadData,
    toastRef,
    setIsLoading,
    setTextLoading,
  } = props;

  const changeAvatar = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermissions.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Acceso a la galeria denegado");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        //Cancela la galeria
        toastRef.current.show("Proceso cancelado");
      } else {
        //Se carga la imagen se pasa la ruta y el nombre de usuario
        uploadImage(result.uri, uid).then(() => {
          //Imagen subida correctamente
          updatePhotoUrl(uid);
        });
      }
    }
  };

  const uploadImage = async (uri, nameImage) => {
    setTextLoading("Actualizando Avatar");
    setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`avatar/${nameImage}`);
    return ref.put(blob);
  };

  const updatePhotoUrl = (uid) => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (result) => {
        const update = {
          photoURL: result,
        };
        await firebase.auth().currentUser.updateProfile(update);
        updateBroker();
      })
      .catch(() => {
        //Error descargando la foto
        toastRef.current.show("Error al descargar la foto");
      });
  };

  const updateBroker = async () => {
    const user = firebase.auth().currentUser;
    let val_broker = await SRV.updateAvatar(
      firebase.auth().currentUser.uid,
      user.photoURL
    );
    if (val_broker.type > 0) {
      setReloadData(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      Alert.alert(val_broker.message);
    }
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={{
          uri: photoURL
            ? photoURL
            : "http://2020.aal-estate.com/files/brokerhood/avatar/avatar-01.png",
        }}
      />
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "ANONIMO"}
        </Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 20,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    paddingTop: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  listRight: {
    position: "absolute",
    right: 10,
    bottom: 25,
  },
});
