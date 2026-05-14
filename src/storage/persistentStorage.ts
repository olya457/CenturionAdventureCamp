import {NativeModules, Platform, Settings} from 'react-native';

type NativeStorage = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<boolean>;
  removeItem: (key: string) => Promise<boolean>;
};

const memory: Record<string, string | undefined> = {};

const nativeStorage = NativeModules.CenturionStorage as
  | NativeStorage
  | undefined;

async function getItem(key: string) {
  if (nativeStorage) {
    return nativeStorage.getItem(key);
  }

  if (Platform.OS === 'ios') {
    const value = Settings.get(key);
    return typeof value === 'string' ? value : null;
  }

  return memory[key] ?? null;
}

async function setItem(key: string, value: string) {
  if (nativeStorage) {
    await nativeStorage.setItem(key, value);
    return;
  }

  if (Platform.OS === 'ios') {
    Settings.set({[key]: value});
    return;
  }

  memory[key] = value;
}

async function removeItem(key: string) {
  if (nativeStorage) {
    await nativeStorage.removeItem(key);
    return;
  }

  if (Platform.OS === 'ios') {
    Settings.set({[key]: ''});
    return;
  }

  delete memory[key];
}

export const persistentStorage = {
  async getJSON<T>(key: string, fallback: T) {
    try {
      const value = await getItem(key);
      return value ? (JSON.parse(value) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  async setJSON<T>(key: string, value: T) {
    await setItem(key, JSON.stringify(value));
  },
  removeItem,
};
