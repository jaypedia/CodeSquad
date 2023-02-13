// 특수문자가 포함되지 않은 문자열인지 판별하는 함수
const hasSpecialCharacters = (str) => {
  const regex = /[^A-Z0-9]/i;
  return regex.test(str);
};

// 문자열에서 숫자를 제거하는 함수
const removeNumber = (str) => {
  return str.replace(/[0-9]/g, '');
};

const filterId = (idArr) => {
  return idArr.reduce((acc, cur) => {
    if (hasSpecialCharacters(cur)) return acc;
    const idWithNumbersRemoved = removeNumber(cur);
    acc.push(idWithNumbersRemoved);
    return acc;
  }, []);
};

const test = () => {
  const idArr = ['ww66', 'd&sd56', 'sarah#', 'hea3d', 'zello', '5lucas'];
  console.log(filterId(idArr)); // [ 'ww', 'head', 'zello', 'lucas' ]
};

test();
