const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const logs = [];
const SHAPE = {
  circle: 'circle',
  rectangle: 'rectangle',
  trapezoid: 'trapezoid',
};

const logFunction = (shape, area) => {
  logs.push(`${shape} = ${area}`);
};

const getCircleArea = (radius) => {
  const area = radius ** 2 * Math.PI;
  logFunction(SHAPE.circle, area);
  return area;
};

const getMultipleCircleArea = (startRadius, endRadius) => {
  let totalArea = 0;
  for (let radius = +startRadius; radius <= +endRadius; radius++) {
    totalArea += radius ** 2 * Math.PI;
  }
  logFunction(SHAPE.circle, totalArea);
  return totalArea;
};

const getCirclesArea = (...params) => {
  if (params.length === 1) {
    return getCircleArea(...params);
  }
  if (params.length === 2) {
    return getMultipleCircleArea(...params);
  }
};

const getRectangleArea = (width, length) => {
  const area = width * length;
  logFunction(SHAPE.rectangle, area);
  return area;
};

const getTrapezoidArea = (shortBase, longBase, height) => {
  const area = ((+shortBase + +longBase) * +height) / 2;
  logFunction(SHAPE.trapezoid, area);
  return area;
};

const getArea = (shape, ...params) => {
  const calculatorObj = {
    [SHAPE.circle]: () => getCirclesArea(...params),
    [SHAPE.rectangle]: () => getRectangleArea(...params),
    [SHAPE.trapezoid]: () => getTrapezoidArea(...params),
  };

  calculatorObj[shape]();
};

const printExecutionSequence = () => {
  const executionSequence = logs.reduce((acc, cur, i) => {
    acc += `[${i + 1}] ${cur}  `;
    return acc;
  }, '');
  console.log(executionSequence);
};

const isValidShape = (shape) => {
  if (SHAPE[shape]) return true;
  return false;
};

const rl = readline.createInterface({ input, output });

const startShapeCalculator = () => {
  // input example - circle 2, rectangle 10 5
  rl.question('Enter the shape and number to calculate: ', (values) => {
    const commands = values.split(', ');
    for (const command of commands) {
      const [shape, ...params] = command.split(' ');
      if (isValidShape(shape)) {
        getArea(shape, ...params);
      } else {
        console.log('⚠️Invalid shape name');
      }
    }
    printExecutionSequence();
    rl.close();
  });
};

const test = () => {
  console.log(getArea('circle', 10));
  console.log(getArea('circle', 1, 5));
  console.log(getArea('rectangle', 10, 5));
  console.log(getArea('trapezoid', 5, 8, 3));
  console.log(getArea('hello', 5, 8, 3));
  printExecutionSequence();
};

startShapeCalculator();
