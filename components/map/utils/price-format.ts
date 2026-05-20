export const formatPrice = (price: number) => {
  if (price >= 1_000_000_000) {
    const ty = price / 1_000_000_000;

    return `${ty.toFixed(1).replace(".0", "")} tỷ`;
  }

  if (price >= 1_000_000) {
    return `${Math.floor(price / 1_000_000)} triệu`;
  }

  if (price >= 1_000) {
    return `${Math.floor(price / 1_000)}k`;
  }

  return price.toLocaleString("vi-VN");
};
