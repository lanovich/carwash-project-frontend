export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (!digits) return "+7";

  const cleanDigits = digits.startsWith("7") ? digits : "7" + digits;

  const match = cleanDigits.match(/^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

  if (!match) return "+7";

  const [_, part1, part2, part3, part4] = match;

  let result = "+7";
  if (part1) result += ` (${part1}`;
  if (part2) result += `) ${part2}`;
  if (part3) result += `-${part3}`;
  if (part4) result += `-${part4}`;

  return result;
};

export const getPhoneDigits = (formattedPhone: string): string => {
  return formattedPhone.replace(/\D/g, "");
};

export const validatePhone = (
  phone: string
): { isValid: boolean; error?: string } => {
  const digits = getPhoneDigits(phone);

  if (digits.length !== 11) {
    return { isValid: false, error: "Телефон должен содержать 11 цифр" };
  }

  if (!digits.startsWith("7")) {
    return { isValid: false, error: "Телефон должен начинаться с +7" };
  }

  return { isValid: true };
};
