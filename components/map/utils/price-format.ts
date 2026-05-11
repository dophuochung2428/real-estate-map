export const formatPrice = (price: number) => {
  if (price >= 1_000_000_000) {
    const ty = Math.floor(price / 1_000_000_000);

    const du = price % 1_000_000_000;

    if (du === 0) {
      return `${ty} tỷ`;
    }

    const tr = Math.floor(du / 100_000_000);

    return `${ty} tỷ ${tr}`;
  }

  if (price >= 1_000_000) {
    return `${Math.floor(price / 1_000_000)}tr`;
  }

  if (price >= 1_000) {
    return `${Math.floor(price / 1_000)}k`;
  }

  return price.toString();
};
