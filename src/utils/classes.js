const classes = (...arr) => {
  return arr
    .filter((cls) => !!cls)
    .map((cls) => cls.trim())
    .join(' ');
};

export default classes;
