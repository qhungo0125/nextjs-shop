export const calculateRating = (reviews: []) => {
  const total = reviews.reduce((acc: number, item: any) => {
    return acc + item.rating;
  }, 0);
  return total / reviews.length;
};
