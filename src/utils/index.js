export const formatNumber = (number) => {
  return new Intl.NumberFormat("de-DE").format(number);
};

export const getType = (status) => {
  switch (status) {
    case 1:
      return "Nạp tiền";
    case 2:
      return "Rút tiền";
    case 3:
      return "Đặt sân";

    default:
      break;
  }
};
