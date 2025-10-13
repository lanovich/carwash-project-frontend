import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib";

interface Props {
  children?: ReactNode;
  onClose: () => void;
  className?: string;
}

export const Modal = ({ children, onClose, className }: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pointerDownOnOverlay = useRef(false);

  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      pointerDownOnOverlay.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerDownOnOverlay.current && e.target === overlayRef.current) {
      onClose();
    }
    pointerDownOnOverlay.current = false;
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={cn(
          "bg-white rounded-lg shadow-xl p-4 mx-4 animate-scaleIn outline-none",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};
