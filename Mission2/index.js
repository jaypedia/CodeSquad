const isValidBase = (base) => {
  if (base < 2 || base > 32) return false;
  return true;
};

const isValidParams = (...params) => {
  const [max, people, order] = params;
  if (max < 0 || people < 0 || order < 0 || people < order) return false;
  return true;
};

const numberGame = ({ base, max, people, order }) => {
  if (!isValidBase(base)) {
    console.log('Invalid base. Valid base: 2~36');
    return;
  }
  if (!isValidParams(max, people, order)) {
    console.log('Invalid parameters.');
    return;
  }

  const player = [];
  const result = [];

  const limit = 10 ** (max - 1);
  const maxNumber = parseInt(limit, base);

  for (let i = 0; i < maxNumber; i++) {
    const number = i.toString(base);
    const arr = number.split('');
    arr.forEach((v) => {
      result.push(v);
      const lastIndex = result.length - 1;
      const isOrder = lastIndex % people === order - 1;
      if (isOrder) player.push(v);
    });
  }

  return `All numbers: ${result.join(',')}\nNumbers spoken by person #${order}: ${player.join(
    ','
  )}`;
};

const test = () => {
  const result1 = numberGame({
    base: 2,
    max: 4,
    people: 4,
    order: 3,
  });

  const result2 = numberGame({
    base: 10,
    max: 2,
    people: 4,
    order: 3,
  });

  console.log(result1);
  console.log(result2);
};

test();
