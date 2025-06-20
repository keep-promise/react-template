import { useEffect, useState } from 'react';

const getDefaultStorage = (key) => {
  return localStorage.getItem(key);
};

type TFun = (v: string) => void;

type TResult = [string, TFun, TFun];

function useStorage(key: string, defaultValue?: string): TResult {
  const [storedValue, setStoredValue] = useState(getDefaultStorage(key) || defaultValue);

  const setStorageValue = (value: string) => {
    localStorage.setItem(key, value);
    if (value !== storedValue) {
      setStoredValue(value);
    }
  };

  const removeStorage = () => {
    localStorage.removeItem(key);
  };

  useEffect(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      setStoredValue(storageValue);
    }
  }, []);

  return [storedValue, setStorageValue, removeStorage];
}

export default useStorage;
