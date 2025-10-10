import { useEffect, useState, useCallback, useRef } from "react";

function getValueStorage<T>(key: string): T | undefined {
  try {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item) as T;
    }
  } catch (e) {
    console.warn(`Ошибка чтения localStorage по ключу "${key}"`, e);
  }
  return undefined;
}

export function useLocalStorage<T>(key: string, initialState: T | (() => T)) {
  const [value, setValueState] = useState<T>(() => {
    const stored = getValueStorage<T>(key);
    return stored !== undefined
      ? stored
      : initialState instanceof Function
      ? initialState()
      : initialState;
  });

  const initialized = useRef(getValueStorage<T>(key) !== undefined);

  useEffect(() => {
    if (initialized.current) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn(`Ошибка записи localStorage по ключу "${key}"`, e);
      }
    }
    initialized.current = true;
  }, [key, value]);

  const setValue = useCallback((val: T) => {
    setValueState(val);
  }, []);

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setValueState(
        initialState instanceof Function ? initialState() : initialState
      );
      initialized.current = false;
    } catch (e) {
      console.warn(`Ошибка удаления localStorage по ключу "${key}"`, e);
    }
  }, [key, initialState]);

  return [value, setValue, remove] as const;
}
