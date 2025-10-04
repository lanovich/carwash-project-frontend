import { cn } from "@/shared/lib";

interface OrderCheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const Checkbox = ({ checked, onChange }: OrderCheckboxProps) => {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={cn(
        "cursor-pointer flex justify-center items-center border rounded",
        checked ? "bg-primary border-primary" : "bg-white border-primary"
      )}
      style={{
        width: "24px",
        height: "24px",
        right: "12px",
        bottom: "12px",
      }}
    >
      {checked && <div className="w-3 h-3 bg-white rounded-sm" />}
    </div>
  );
};
