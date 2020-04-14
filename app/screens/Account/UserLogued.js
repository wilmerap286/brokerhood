import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import ActionButton from "react-native-action-button";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountOptions from "../../components/Account/AccountOption";
import CST from "../../utils/CustomSettings";
import SRV from "../../utils/Service";
import { getItem, deleteItem, updateItem, saveItem } from "../../utils/Storage";
import { USER_INFO } from "../../constants";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function UserLogued() {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [textLoading, setTextLoading] = useState("Cargando Datos");

  const toastRef = useRef();

  useEffect(() => {
    console.log("paso 1");
    getCurrUser();
    setReloadData(false);
    setIsLoading(false);
  }, [reloadData]);

  getCurrUser = async () => {
    const curr_user = firebase.auth().currentUser.uid;
    let data = await SRV.getBroker(curr_user);
    const usrAnt = await getItem(USER_INFO);
    console.log("paso 2");
    if (usrAnt) {
      const userResult = await updateItem(USER_INFO, JSON.stringify(data));
    } else {
      const userResult = await saveItem(USER_INFO, JSON.stringify(data));
    }

    console.log("paso 3");
    let cur_broker = await getItem(USER_INFO);
    cur_broker = JSON.parse(cur_broker);
    setUserInfo(cur_broker);
  };

  const cerrarSesion = async () => {
    await deleteItem(USER_INFO);
    firebase.auth().signOut();
  };

  return (
    <View style={styles.viewUserInfo}>
      <ImageBackground
        source={require("../../../assets/img/background.png")}
        resizeMode="cover"
        style={styles.bkgImage}
        imageStyle={styles.imageStyleCnt}
      >
        <InfoUser
          userInfo={userInfo}
          setReloadData={setReloadData}
          toastRef={toastRef}
          setIsLoading={setIsLoading}
          setTextLoading={setTextLoading}
        />
        <AccountOptions
          userInfo={userInfo}
          setReloadData={setReloadData}
          toastRef={toastRef}
        />
        <Toast ref={toastRef} position="center" opacity={0.5} />
        <Loading text="CARGANDO DATOS" isVisible={isLoading} />
      </ImageBackground>
      <CloseSession cerrarSesion={cerrarSesion} />
    </View>
  );
}

function CloseSession(props) {
  const { cerrarSesion } = props;
  return (
    <ActionButton
      buttonColor={CST.colorPrm}
      title="Cerra Sesión"
      onPress={() => firebase.auth().signOut()}
      renderIcon={(active) =>
        active ? (
          <Icon
            type="material-community"
            name="logout"
            color="#fff"
            size={30}
          />
        ) : (
          <Icon
            type="material-community"
            name="logout"
            color="#fff"
            size={30}
          />
        )
      }
    >
      <Icon type="material-community" name="logout" color="#fff" size={30} />
    </ActionButton>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    flex: 1,
    backgroundColor: "transparent",
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: CST.colorPrm,
  },
  btnCloseSessionText: {
    color: "#fff",
    fontWeight: "bold",
    zIndex: 2,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
    zIndex: 2,
  },
  bkgImage: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "transparent",
    marginLeft: 0,
  },
  imageStyleCnt: {},
});
