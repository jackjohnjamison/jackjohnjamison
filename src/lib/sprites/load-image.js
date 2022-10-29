const loadImage = (url) => {
  return new Promise((resolve) => {
    let image = new Image();
    image.onload = () => resolve(image);
    image.src = url;
  });
};

export { loadImage };
