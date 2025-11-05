export const formatDate = (dateInput: string) => {

  const date = new Date(dateInput);

  return {
    toDM() {
      return date
        .toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
        })
        .replace(" г.", "");
    },

    toDMY() {
      return date
        .toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .replace(" г.", "");
    },
  };
};
