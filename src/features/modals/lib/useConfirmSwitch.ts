import { useCallback, useState } from "react";
import { useLocalStorage } from "@/shared/lib";

type UseConfirmSwitchArgs<T> = {
  shouldAsk: boolean;
  onConfirm: (value: T) => void;
  storageKey: string;
};

export function useConfirmSwitch<T>({
  shouldAsk,
  onConfirm,
  storageKey,
}: UseConfirmSwitchArgs<T>) {
  const [skip, setSkip] = useLocalStorage<boolean>(storageKey, false);
  const [state, setState] = useState<{ isOpen: boolean; pending?: T }>({
    isOpen: false,
  });

  const trigger = useCallback(
    (value: T) => {
      if (shouldAsk && !skip) {
        setState({ isOpen: true, pending: value });
      } else {
        onConfirm(value);
      }
    },
    [shouldAsk, skip, onConfirm]
  );

  const close = useCallback(
    (confirmed: boolean, dontAskAgain?: boolean) => {
      if (dontAskAgain) setSkip(true);
      if (confirmed && state.pending !== undefined) {
        onConfirm(state.pending);
      }
      setState({ isOpen: false });
    },
    [state.pending, setSkip, onConfirm]
  );

  return { isOpen: state.isOpen, trigger, close };
}
