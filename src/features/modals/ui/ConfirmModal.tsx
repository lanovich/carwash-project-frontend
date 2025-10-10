import { Button, Checkbox, Modal } from "@/shared/ui";
import { useState } from "react";

interface ModalContentProps {
  title?: string;
  message: string;
  isOpen: boolean;
  onClose: (confirmed: boolean, dontAskAgain?: boolean) => void;
  dontAskAgainKey?: string;
}

export const ConfirmModal = ({
  title,
  message,
  isOpen,
  onClose,
  dontAskAgainKey,
}: ModalContentProps) => {
  const [dontAskAgain, setDontAskAgain] = useState<boolean>(true);

  if (!isOpen) return null;

  return (
    <Modal onClose={() => onClose(false)}>
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      <p className="mb-4">{message}</p>

      {dontAskAgainKey && (
        <div className="mb-4 flex gap-1 items-center">
          <Checkbox
            id="dontAskAgain"
            size="sm"
            checked={dontAskAgain}
            onChange={setDontAskAgain}
          />
          <label htmlFor="dontAskAgain" className="text-sm cursor-pointer">
            Больше не показывать
          </label>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button onClick={() => onClose(false)} variant={"primaryGhost"}>
          Отмена
        </Button>
        <Button onClick={() => onClose(true, dontAskAgain)}>Продолжить</Button>
      </div>
    </Modal>
  );
};
