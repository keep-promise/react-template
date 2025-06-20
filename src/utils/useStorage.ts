import { useEffect, useState } from 'react';
import { isSSR } from '@/utils/is';

const getDefaultStorage = (key) => {
  if (!isSSR) {
    return localStorage.getItem(key);
  } else {
    return undefined;
  }
};

type TFun = (v: string) => void;

type TResult = [string, TFun, TFun];

function useStorage(key: string, defaultValue?: string): TResult {
  const [storedValue, setStoredValue] = useState(getDefaultStorage(key) || defaultValue);

  const setStorageValue = (value: string) => {
    if (!isSSR) {
      localStorage.setItem(key, value);
      if (value !== storedValue) {
        setStoredValue(value);
      }
    }
  };

  const removeStorage = () => {
    if (!isSSR) {
      localStorage.removeItem(key);
    }
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
