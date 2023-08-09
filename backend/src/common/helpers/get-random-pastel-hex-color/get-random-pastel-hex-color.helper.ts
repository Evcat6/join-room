const getRandomPastelHexColor = (): string => {
  let color = '#';
  for (let index = 0; index < 3; index++) {
    const value = Math.floor(Math.random() * 8 + 8).toString(16);
    color += value + value;
  }
  return color;
};

export { getRandomPastelHexColor };
