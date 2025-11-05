import { useEffect } from "react";
import { useTimeout } from "./useTimout";

export function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: any[]
) {
  const { clear, reset } = useTimeout(callback, delay);

  useEffect(() => {
    clear;
  }, []);

  useEffect(() => {
    reset();
  }, [...dependencies, reset]);
}
