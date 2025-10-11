import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

type Options<T> = {
  param: string;
  selector: (state: any) => T;
  action: (value: T | null) => any;
  parse?: (raw: string | null) => T | null;
  serialize?: (value: T | null) => string | null;
  validate?: (value: T | null) => boolean;
};

export function useSyncSearchParamWithStore<T>({
  param,
  selector,
  action,
  parse = (raw) => {
    if (raw === null) return null;
    return raw as unknown as T;
  },
  serialize = (value) => (value != null ? String(value) : null),
  validate = () => true,
}: Options<T>) {
  const dispatch = useDispatch();
  const value = useSelector(selector);

  const [searchParams, setSearchParams] = useSearchParams();
  const initializedRef = useRef(false);
  const readyRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const raw = searchParams.get(param);
    const parsed = parse(raw);

    if (
      (parsed !== null && parsed !== undefined && validate(parsed)) ||
      (parsed === null && validate(null))
    ) {
      dispatch(action(parsed));
    }

    readyRef.current = true;
  }, []);

  useEffect(() => {
    if (!readyRef.current) return;

    const serialized = serialize(value);
    const currentRaw = searchParams.get(param);

    if (serialized === currentRaw) return;

    const nextParams = new URLSearchParams(searchParams);
    if (serialized === null) {
      nextParams.delete(param);
    } else {
      nextParams.set(param, serialized);
    }

    setSearchParams(nextParams);
  }, [value, param, searchParams, setSearchParams, serialize]);

  return value;
}
