const mergeShallow = (o, n) =>
  Object.keys(n).reduce((acc, currVal) => {
    acc[currVal] = { ...acc[currVal], ...n[currVal], };

    return acc;
  }, { ...o, });

module.exports = mergeShallow;