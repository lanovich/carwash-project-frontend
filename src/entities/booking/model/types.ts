import { CarType } from "@/entities/car/model";

export type ObjectType = CarType | "special";

export interface BookingServicePreview {
  id: string;
  title: string;
  price: number;
  duration: number | null;
}

export interface BookingState {
  carwashId: string | null;
  date: string | null;
  time: string | null;

  objectType: ObjectType | null;
  selectedServiceIds: string[];

  user: {
    name: string;
    phone: string;
    email: string;
    carModel: string;
    carColor: string;
    licensePlate: string;
  };
}
