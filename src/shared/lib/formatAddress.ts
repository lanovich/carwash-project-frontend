import { Address } from "@/entities/carwash/model";

export function formatAddress({ city, street, house }: Address) {
  return `${city}, ${street} ${house}`;
}
