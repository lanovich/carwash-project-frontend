import { CarType } from "@/entities/car/model";
import { Service } from "@/entities/service/model";
import { User, Car } from "@/entities/user/model";

export type ObjectType = CarType;

export interface BookingState {
  carwashId: string | null;
  date: string | null;
  time: string | null;

  objectType: ObjectType | null;
  selectedServices: Record<string, Service>;
  blockedServices: Record<string, true>;

  user: User;
  car: Car;
}

export interface BookingRequest {
  date: string | Date;
  time: string;

  objectType: ObjectType;
  serviceIds: string[];

  user: User;
  car: Car;
}

export interface BookingItem {
  id: string;
  bookingId: string;
  serviceId: string;
  price: number;
  duration: number;
  service?: Service;
}

export interface BookingResponse {
  id: string;
  date: string;
  time: string;
  objectType: ObjectType;
  status: "pending" | "confirmed" | "canceled" | "completed";
  userId: string;
  user: User;
  car: Car;
  services?: Service[];
  items?: BookingItem[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingCounts {
  all: number;
  pending: number;
  confirmed: number;
  canceled: number;
  completed: number;
}

export interface BookingListResponse {
  bookings: BookingResponse[];
}