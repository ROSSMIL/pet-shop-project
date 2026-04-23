export const getSaleProducts = (list) => {
  return [...list]
    .filter((p) => p.discont_price !== null && p.discont_price > 0)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
};
