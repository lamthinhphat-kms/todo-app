import {MMKV} from 'react-native-mmkv';

const MMKVStorage = new MMKV();

export const saveToMMKVStorage = (key: string, value: string) => {
  MMKVStorage.set(key, value);
};

export const getStringFromsaveToMMKVStorage = (
  key: string,
): string | undefined => {
  let value = MMKVStorage.getString(key);
  return value;
};

export const getNumberFromsaveToMMKVStorage = (
  key: string,
): number | undefined => {
  let value = MMKVStorage.getNumber(key);
  return value;
};

export const getBooleanFromsaveToMMKVStorage = (
  key: string,
): boolean | undefined => {
  let value = MMKVStorage.getBoolean(key);
  return value;
};