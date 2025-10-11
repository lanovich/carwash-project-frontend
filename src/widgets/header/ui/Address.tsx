import { CARWASH_INFO } from "@/entities/carwash/model";
import { formatAddress } from "@/shared/lib";

export const Address = () => (
  <div className="hidden xl:flex flex-col items-start">
    <p className="text-small">{formatAddress(CARWASH_INFO.address)}</p>
    <p className="text-caption">{CARWASH_INFO.workTime} без выходных</p>
  </div>
);
