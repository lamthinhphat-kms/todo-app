import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToLocalStorage = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const getValueFromLocalStorage = async (
  key: string,
): Promise<string> => {
  let value = await AsyncStorage.getItem(key);
  return value ?? '';
};
