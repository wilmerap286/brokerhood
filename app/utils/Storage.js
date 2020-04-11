import { AsyncStorage } from "@react-native-community/async-storage";

export const saveItem = async (KeyName, KeyValue) => {
  try {
    return await AsyncStorage.setItem(KeyName, KeyValue);
  } catch (e) {
    return false;
  }
};

export const getItem = async (KeyName) => {
  try {
    return await AsyncStorage.getItem(KeyName);
  } catch (e) {
    return false;
  }
};

export const clearAll = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (e) {
    return false;
  }
};
