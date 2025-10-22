export interface User {
  name: string;
  phone: string;
  email?: string;
  carModel?: string;
  carColor?: string;
  licensePlate?: string;
}

export const DEFAULT_CONTACT_FORM_VALUES = {
  phone: "+7",
  name: "",
  email: "",
  carType: "",
  carColor: "",
  carModel: "",
  licensePlate: "",
};
