export const getShuffledList = (list, count = 4) => {
  return [...list].sort(() => 0.5 - Math.random()).slice(0, count);
};
