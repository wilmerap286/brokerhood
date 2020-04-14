import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Avatar, Icon, Card, ListItem } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import SRV from "../../utils/Service";
import { updateItem } from "../../utils/Storage";
import { USER_INFO } from "../../constants";

export default function InfoUser(props) {
  const {
    userInfo,
    setReloadData,
    toastRef,
    setIsLoading,
    setTextLoading,
  } = props;
  const [uid, setUid] = useState(userInfo.brk_mail);

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
      let new_foto = { brk_avatar: user.photoURL };
      await updateItem(USER_INFO, JSON.stringify(new_foto));
      console.log(val_broker.broker);
      setReloadData(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      Alert.alert(val_broker.message);
    }
  };

  return (
    <>
      <View style={styles.viewUserInfo}>
        <Avatar
          rounded
          size="large"
          showEditButton
          onEditPress={changeAvatar}
          containerStyle={styles.userInfoAvatar}
          source={{
            uri: userInfo.brk_avatar
              ? userInfo.brk_avatar
              : "http://2020.aal-estate.com/files/brokerhood/avatar/avatar-01.png",
          }}
        />
        <View>
          <Text style={styles.displayName}>
            {userInfo.brk_name ? userInfo.brk_name : "ANONIMO"}
          </Text>
          <Text>{userInfo.brk_mail}</Text>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <ListItem
          key={1}
          title={userInfo.brk_company}
          leftIcon={
            <Icon
              type="material-community"
              name="shield-account-outline"
              color="#c2c2c2"
              size={25}
              underlayColor="#fff"
            />
          }
          bottomDivider
        />
        <ListItem
          key={2}
          title={userInfo.brk_cargo}
          leftIcon={
            <Icon
              type="material-community"
              name="seat-recline-extra"
              color="#c2c2c2"
              size={25}
              underlayColor="#fff"
            />
          }
          bottomDivider
        />
        <ListItem
          key={3}
          title={userInfo.brk_telefono}
          leftIcon={
            <Icon
              type="material-community"
              name="phone"
              color="#c2c2c2"
              size={25}
              underlayColor="#fff"
            />
          }
          bottomDivider
        />
        <ListItem
          key={4}
          title={userInfo.brk_ciudad}
          leftIcon={
            <Icon
              type="material-community"
              name="google-maps"
              color="#c2c2c2"
              size={25}
              underlayColor="#fff"
            />
          }
          bottomDivider
        />
      </View>
    </>
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
