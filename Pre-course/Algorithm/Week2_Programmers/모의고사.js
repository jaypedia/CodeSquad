function solution(answers) {
  const P = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];

  const calcPoint = (person) => {
    let point = 0;
    answers.forEach((answer, i) => {
      if (answer === person[i % [person.length]]) point++;
    });
    return point;
  };

  const pointArr = [calcPoint(P[0]), calcPoint(P[1]), calcPoint(P[2])];
  const maxPoint = Math.max(...pointArr);

  return pointArr.reduce((acc, cur, idx) => {
    cur === maxPoint && acc.push(idx + 1);
    return acc;
  }, []);
}
