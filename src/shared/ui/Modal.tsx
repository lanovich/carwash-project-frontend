import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  children?: ReactNode;
  onClose?: () => void;
}

export const Modal = ({ children, onClose }: Props) => {
  const handleOverlayClick = () => {
    if (onClose) onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};
