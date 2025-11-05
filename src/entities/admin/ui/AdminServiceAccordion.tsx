import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Service } from "@/entities/service/model";
import { AdminServiceEditor } from "./AdminServiceEditor";
import { formatServicePrice } from "@/shared/lib";
import { OBJECT_TYPES, objectTypesMap } from "@/entities/car/model";

interface Props {
  service: Service;
}

export const AdminServiceAccordion = ({ service }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border border-primary rounded-md transition-all duration-200 overflow-hidden hover:shadow-lg ${
        open ? "shadow-md bg-primary-light-hover/50" : "bg-white"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center gap-2 px-2 py-2"
      >
        <div className="flex items-center gap-2">
          <img
            src={service.mainImage || "/placeholder.jpg"}
            alt={service.title}
            className="w-[72px] h-[64px] object-cover rounded-sm flex-shrink-0"
          />

          <div className="flex flex-col justify-between gap-1 text-left">
            <div className="text-[14px] font-normal leading-[15px] text-black">
              <h3>{service.title}</h3>
            </div>

            <div className=" flex flex-wrap gap-1 w-fit">
              {OBJECT_TYPES.map((ot) => {
                if (!service.objectTypes.includes(ot)) return null;

                return (
                  <div
                    key={ot}
                    className="bg-primary-light-hover/50 px-2 py-1 rounded-sm flex flex-col items-center justify-center text-text-secondary gap-1 min-w-[40px]"
                  >
                    <span className="text-[10px] uppercase leading-[11px]">
                      {objectTypesMap[ot].caption[0]}
                    </span>
                    <span className="text-[12px] leading-[13px]">
                      {formatServicePrice(service, ot)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="text-primary flex-shrink-0 transition-transform duration-300"
          style={{ transform: `rotate(${open ? 180 : 0}deg)` }}
        >
          <ChevronDown size={20} />
        </div>
      </button>

      {open && (
        <div className="bg-primary-light-hover/50 p-2 border-t border-primary rounded-b-md animate-modal-open">
          <AdminServiceEditor service={service} />
        </div>
      )}
    </div>
  );
};
