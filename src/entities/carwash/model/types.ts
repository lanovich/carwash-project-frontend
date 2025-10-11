export interface SocialLinks {
  whatsapp?: string;
  telegram?: string;
  vk?: string;
}

export interface Address {
  region: string;
  city: string;
  street: string;
  house: string;
  fullAddress: string;
}

export interface CarwashInfo {
  name: string;
  address: Address;
  workTime: string;
  coordinates: [number, number];
  url: string;
  phone: string;
  socials: SocialLinks;
}
