export const getRandomElement = <T>(arr: Array<T>): T | undefined => {
  if (arr.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
