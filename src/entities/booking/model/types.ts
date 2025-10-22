import { CarType } from "@/entities/car/model";
import { Service } from "@/entities/service/model";
import { User } from "@/entities/user/model";

export type ObjectType = CarType | "special";

export interface BookingState {
  carwashId: string | null;
  date: string | null;
  time: string | null;

  objectType: ObjectType | null;
  selectedServices: Record<string, Service>;
  blockedServices: Record<string, true>;

  user: User;
}

export interface BookingRequest {
  date: string | Date;
  time: string;

  objectType: ObjectType;
  serviceIds: string[];

  user: User;
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
