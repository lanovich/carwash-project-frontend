import { useState } from "react";
import { Modal } from "./Modal";
import { cn } from "../lib";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  className?: string;
  modalClassName?: string;
}

export const ImagePreview = ({
  src,
  alt,
  className,
  modalClassName,
}: ImagePreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={cn("cursor-pointer object-cover", className)}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          className={cn(
            "p-0 max-w-[90vw] max-h-[90vh] flex items-center justify-center animate-fadeIn animate-scaleIn",
            modalClassName
          )}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain rounded"
          />
        </Modal>
      )}
    </>
  );
};
