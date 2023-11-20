export const dateFormatter = (date?: string) => {
  if (date) {
    const split = date?.split("-");
    return `${split[1]}월 ${split[2]}, ${split[0]}`;
  }
};
