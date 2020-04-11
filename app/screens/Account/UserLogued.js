import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import ActionButton from "react-native-action-button";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountGestion from "../../components/Account/AccountGestion";
import CST from "../../utils/CustomSettings";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function UserLogued() {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const user = firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
      console.log("USER LOGUED");
    })();
    setReloadData(false);
  }, [reloadData]);

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
        <Toast ref={toastRef} position="center" opacity={0.5} />
        <Loading text={textLoading} isVisible={isLoading} />
      </ImageBackground>
      <CloseSession />
    </View>
  );
}

function CloseSession(props) {
  const { navigation } = props;
  return (
    <ActionButton buttonColor={CST.colorPrm}>
      <ActionButton.Item
        buttonColor={"#06E396"}
        title="Cerra Sesión"
        onPress={() => firebase.auth().signOut()}
      >
        <Icon type="material-community" name="logout" color="#fff" size={30} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#D0D1D7"
        title="Actualizar Perfil"
        onPress={() =>
          navigation.navigate("AccountDetails", {
            InfoUser: InfoUser,
            setReloadData: setReloadData,
          })
        }
      >
        <Icon
          type="material-community"
          name="account-convert"
          color="#222"
          size={30}
        />
      </ActionButton.Item>
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
