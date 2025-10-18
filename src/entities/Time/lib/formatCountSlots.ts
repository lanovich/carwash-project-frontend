export const formatCountSlots = (available: number) => {
  if (available <= 0) return "нет мест";
  if (available === 1) return "1 место";
  if (available > 1 && available < 5) return `${available} места`;
  return `${available} мест`;
};
