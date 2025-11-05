import { useState, ChangeEvent, ReactNode } from "react";
import { Loading } from "./Loading";
import { cn } from "../lib";

interface FileUploaderProps {
  onUpload: (file: File) => Promise<any>;
  multiple?: boolean;
  accept?: string;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const FileUploader = ({
  onUpload,
  multiple = false,
  accept = "*",
  children,
  disabled = false,
  className,
}: FileUploaderProps) => {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    setUploading(true);
    try {
      for (const file of files) {
        await onUpload(file);
      }
    } catch (err) {
      console.error("❌ Upload failed:", err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <label
      className={cn(
        "cursor-pointer relative inline-flex items-center justify-center border-primary border-1 border-dashed rounded p-2",
        {
          "opacity-50 cursor-not-allowed": disabled || uploading,
          "hover:bg-gray-100": !disabled && !uploading,
        },
        className
      )}
    >
      {children || <span>Выберите файл</span>}
      <input
        type="file"
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        onChange={handleChange}
        multiple={multiple}
        accept={accept}
        disabled={disabled || uploading}
      />
      {uploading && (
        <span className="absolute flex flex-col items-center text-xs text-gray-500">
          <Loading />
        </span>
      )}
    </label>
  );
};
