const randomVariationInt = (start, range) => {
  const variatedNumber = start + (Math.random() * range - range / 2);

  return Math.floor(variatedNumber);
};

export { randomVariationInt };
