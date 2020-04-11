import React from "react";
import { View, Text } from "react-native";

export default function AddOffer(props) {
  const { navigation, brokerhood } = props;
  return (
    <View>
      <Text>Agregar Nueva Oferta {brokerhood.item.brokerhood.bkh_nombre}</Text>
    </View>
  );
}
