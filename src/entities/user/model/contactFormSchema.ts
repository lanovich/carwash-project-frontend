import { z } from "zod";

export const contactFormSchema = z.object({
  phone: z
    .string()
    .min(18, "Введите корректный телефон")
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Неверный формат телефона"),
  name: z.string().min(2, "Введите имя"),
  email: z
    .string()
    .email("Введите корректный email")
    .optional()
    .or(z.literal("")),
  carType: z.string().optional(),
  carColor: z.string().optional(),
  carModel: z.string().optional(),
  licensePlate: z.string().optional(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
