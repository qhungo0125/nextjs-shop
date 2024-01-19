export const truncate = (str: String) => {
  return str.length > 25 ? str.slice(0, 25) + '...' : str;
};

export const priceFormatter = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const numberFormatter = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};
