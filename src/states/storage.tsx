import {Storage} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const token_storage = new MMKV({
  id: 'token_storage',
  encryptionKey: 'token_storage_encryption_key',
});

const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve(true);
  },
};

export default reduxStorage;
