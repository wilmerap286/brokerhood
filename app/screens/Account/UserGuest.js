import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";
import CST from "../../utils/CustomSettings";

function UserGuest(props) {
  const { navigation } = props;

  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/img/user-guest.png")}
        style={styles.image}
        resize="container"
      />
      <Text style={styles.title}>OPTIMIZA - PERSONALIZA - INCREMENTA</Text>
      <Text style={styles.description}>
        TU TIEMPO - TUS ANUNCIOS - TUS RESULTADOS
      </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Mi Perfil"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}

export default withNavigation(UserGuest);

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 5,
    marginRight: 5,
  },
  image: {
    height: 500,
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 12,
    fontStyle: "italic",
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: CST.colorPrm,
  },
  btnContainer: {
    width: "95%",
  },
});
