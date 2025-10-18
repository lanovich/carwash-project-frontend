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
    carModel?: string;
    carColor?: string;
    licensePlate?: string;
  };
}

export interface BookingRequest {
  date: string | Date;
  time: string;

  objectType: ObjectType;
  serviceIds: string[];

  user: {
    name: string;
    phone: string;
    email: string;
    carModel?: string;
    carColor?: string;
    licensePlate?: string;
  };
}

export interface BookingResponse {
  id: string;
  date: string;
  time: string;
  objectType: ObjectType;
  status: "pending" | "confirmed" | "canceled" | "completed";
  userId: string;
  createdAt: string;
  updatedAt: string;
}
