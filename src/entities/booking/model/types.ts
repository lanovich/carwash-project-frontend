import { CarType } from "@/entities/car/model";
import { Service } from "@/entities/service/model";

export type ObjectType = CarType | "special";

export interface BookingState {
  carwashId: string | null;
  date: string | null;
  time: string | null;

  objectType: ObjectType | null;
  selectedServices: Record<string, Service>;
  blockedServices: Record<string, true>;

  user: {
    name: string;
    phone: string;
    email: string;
    carModel: string;
    carColor: string;
    licensePlate: string;
  };
}
