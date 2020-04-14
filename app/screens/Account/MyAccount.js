import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import UserGuest from "../Account/UserGuest";
import UserLogued from "../Account/UserLogued";
import { getItem } from "../../utils/Storage";
import { ACCESS_TOKEN } from "../../constants";

export default function MyAccount() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
      console.log("paso 0");
    });
  }, []);

  if (login === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }
  return login ? <UserLogued /> : <UserGuest setLogin={setLogin} />;
}
