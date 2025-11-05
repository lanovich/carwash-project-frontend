import { useState } from "react";
import { Modal } from "./Modal";
import { cn } from "../lib";
import { X, Loader } from "lucide-react";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  className?: string;
  modalClassName?: string;
  onDelete?: () => Promise<void>;
}

export const ImagePreview = ({
  src,
  alt,
  className,
  modalClassName,
  onDelete,
}: ImagePreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    setDeleting(true);
    try {
      await onDelete();
    } catch (err) {
      console.error("❌ Failed to delete image:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <img
        src={src}
        alt={alt}
        className="cursor-pointer object-cover w-full h-full"
        onClick={() => setIsOpen(true)}
      />

      {onDelete && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
        >
          {deleting ? (
            <Loader size={16} className="animate-spin" />
          ) : (
            <X size={16} />
          )}
        </button>
      )}

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
    </div>
  );
};
