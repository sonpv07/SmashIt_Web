export const formatNumber = (number) => {
  return new Intl.NumberFormat("de-DE").format(number);
};
