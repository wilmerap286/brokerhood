import React from "react";
import Navigation from "./app/navigations/Navigations";
import { firebaseApp } from "./app/utils/FireBase";
import { decode, encode } from "base-64";

export default function App() {
  if (!global.btoa) {
    global.btoa = encode;
  }
  if (!global.atob) {
    global.atob = decode;
  }

  return <Navigation />;
}
