const URL_2020 = "https://2020.aal-estate.com/api";
import { Alert } from "react-native";

class SRV {
  //Ciudades donde esta
  getCiudades() {
    return fetch(`${URL_2020}/13`, {
      method: "POST",
      body: JSON.stringify({
        tipo: 1,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }
  //Creacion del broker asociado al usuario registrado
  createBroker(
    user,
    nameBroker,
    companyBroker,
    email,
    telefonoBroker,
    cargoBroker,
    ciudad
  ) {
    return fetch(`${URL_2020}/101`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
        brk_name: nameBroker,
        brk_mail: email,
        brk_company: companyBroker,
        brk_cargo: cargoBroker,
        ciu_id: ciudad,
        brk_telefono: telefonoBroker,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  //Creacion del broker asociado al usuario registrado
  updateAvatar(user, url) {
    return fetch(`${URL_2020}/2`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
        brk_avatar: url,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  getBrokerhoods(user, search) {
    return fetch(`${URL_2020}/3`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
        search: search,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  getBrokerhoodsLimit(user, inicio) {
    return fetch(`${URL_2020}/4`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
        inicio: inicio,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  //Creacion del brokerhood y el mienbro admin
  createBrokerhood(
    user,
    nameBhood,
    asuntoBhood,
    precioInicial,
    precioFinal,
    avatarBhood
  ) {
    let uploadData = new FormData();
    uploadData.append("submit", "ok");
    uploadData.append("id_mobile", user);
    uploadData.append("bkh_name", nameBhood);
    uploadData.append("bkh_asunto", asuntoBhood);
    uploadData.append("bkh_minimo", precioInicial);
    uploadData.append("bkh_maximo", precioFinal);
    uploadData.append("bkh_avatar", {
      type: "image/jpeg",
      uri: avatarBhood,
      name: "uploadimagetmp.jpeg",
    });
    const headers = new Headers();
    headers.append("accept", "application/json");
    return fetch(`${URL_2020}/5`, {
      method: "POST",
      body: uploadData,
      headers,
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  getBroker(user) {
    return fetch(`${URL_2020}/6`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  //Actualizacion datos del broker asociado al usuario registrado
  updateDatosBroker(
    user,
    tipo,
    nameBroker,
    companyBroker,
    teleBroker,
    cargoBroker
  ) {
    return fetch(`${URL_2020}/7`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
        tipo: tipo,
        brk_name: nameBroker,
        brk_company: companyBroker,
        brk_telefono: teleBroker,
        brk_cargo: cargoBroker,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  updateMailBroker(user, tipo, mailBroker) {
    return fetch(`${URL_2020}/7`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
        tipo: tipo,
        brk_mail: mailBroker,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }
  //Fin de actualizacion datos del broker

  //Traer los miembros de un Brokerhood
  getBrokerhoodMembers(idBrokerhood) {
    return fetch(`${URL_2020}/8`, {
      method: "POST",
      body: JSON.stringify({
        bkh_id: idBrokerhood,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  //Traer los miembros de un Brokerhood
  getFindBrokers(idBrokerhood, nombreBroker, emailBroker, telefonoBroker) {
    return fetch(`${URL_2020}/10`, {
      method: "POST",
      body: JSON.stringify({
        bkh_id: idBrokerhood,
        brk_name: nombreBroker,
        brk_mail: emailBroker,
        brk_telefono: telefonoBroker,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  //Traer los miembros de un Brokerhood
  getFindBrokers2(idBrokerhood, nombreBroker) {
    return fetch(`${URL_2020}/10`, {
      method: "POST",
      body: JSON.stringify({
        bkh_id: idBrokerhood,
        brk_name: nombreBroker,
        brk_mail: "",
        brk_telefono: "",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  //Invitar contacto por email
  sendEmailContact(idBrokerhood, email) {
    return fetch(`${URL_2020}/11`, {
      method: "POST",
      body: JSON.stringify({
        bkh_id: idBrokerhood,
        contact_email: email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  //Creacion del brokerhood y el mienbro admin
  addMemberBroker(idBrokerhood, nmBrokerhood, brk_id, email) {
    return fetch(`${URL_2020}/12`, {
      method: "POST",
      body: JSON.stringify({
        bkh_id: idBrokerhood,
        bkh_name: nmBrokerhood,
        brk_id: brk_id,
        email: email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  getTiposEstate() {
    return fetch(`${URL_2020}/13`, {
      method: "POST",
      body: JSON.stringify({
        tipo: 2,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  //Creacion del brokerhood y el mienbro admin
  createOffer(
    brokerhood,
    imagesSelected,
    tipoEstate,
    motivoEstate,
    areaEstate,
    precioEstate,
    alcobasEstate,
    banosEstate,
    parkingEstate,
    nameEstate,
    addressEstate,
    describeEstate,
    latitudEstate,
    longitudEstate,
    latitudDeltaEstate,
    longitudDeltaEstate
  ) {
    console.log("probando");
    let uploadData = new FormData();
    uploadData.append("submit", "ok");
    uploadData.append("bkh_id", brokerhood.bkh_id);
    uploadData.append("brk_id", brokerhood.brk_id);
    uploadData.append("tin_id", tipoEstate);
    uploadData.append("mtv_id", motivoEstate);
    uploadData.append("ofr_area", areaEstate);
    uploadData.append("ofr_precio", precioEstate);
    uploadData.append("ofr_alcobas", alcobasEstate);
    uploadData.append("ofr_banos", banosEstate);
    uploadData.append("ofr_parking", parkingEstate);
    uploadData.append("ofr_name", nameEstate);
    uploadData.append("ofr_address", addressEstate);
    uploadData.append("ofr_nota", describeEstate);
    uploadData.append("ofr_latitud", latitudEstate);
    uploadData.append("ofr_latitudDelta", latitudDeltaEstate);
    uploadData.append("ofr_longitud", longitudEstate);
    uploadData.append("ofr_longitudDelta", longitudDeltaEstate);
    uploadData.append("ofr_image1", {
      type: "image/jpeg",
      uri: imagesSelected[0],
      name: "uploadimagetmp.jpg",
    });
    if (imagesSelected.length > 1) {
      uploadData.append("ofr_image2", {
        type: "image/jpeg",
        uri: imagesSelected[1],
        name: "uploadimagetmp.jpg",
      });
    }
    if (imagesSelected.length > 2) {
      uploadData.append("ofr_image3", {
        type: "image/jpeg",
        uri: imagesSelected[2],
        name: "uploadimagetmp.jpg",
      });
    }
    if (imagesSelected.length > 3) {
      uploadData.append("ofr_image4", {
        type: "image/jpeg",
        uri: imagesSelected[3],
        name: "uploadimagetmp.jpg",
      });
    }
    if (imagesSelected.length > 4) {
      uploadData.append("ofr_image5", {
        type: "image/jpeg",
        uri: imagesSelected[4],
        name: "uploadimagetmp.jpg",
      });
    }
    const headers = new Headers();
    headers.append("accept", "application/json");
    return fetch(`${URL_2020}/14`, {
      method: "POST",
      body: uploadData,
      headers,
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }

  //Creacion del brokerhood y el mienbro admin
  createOrder(
    brokerhood,
    tipoEstate,
    motivoEstate,
    areaEstate,
    curInicial,
    curFinal,
    alcobasEstate,
    banosEstate,
    parkingEstate,
    addressEstate,
    describeEstate
  ) {
    return fetch(`${URL_2020}/15`, {
      method: "POST",
      body: JSON.stringify({
        bkh_id: brokerhood.bkh_id,
        brk_id: brokerhood.brk_id,
        mbr_id: brokerhood.id,
        tin_id: tipoEstate,
        mtv_id: motivoEstate,
        ord_area: areaEstate,
        ord_desde: curInicial,
        ord_hasta: curFinal,
        ord_alcobas: alcobasEstate,
        ord_banos: banosEstate,
        ord_parking: parkingEstate,
        ord_address: addressEstate,
        ord_nota: describeEstate,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => response);
  }
}

export default new SRV();
