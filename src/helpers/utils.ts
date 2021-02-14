export const randomizeArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
