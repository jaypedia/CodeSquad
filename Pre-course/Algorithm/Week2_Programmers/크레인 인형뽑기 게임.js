function solution(board, moves) {
  const dolls = [];
  let answer = 0;

  moves.forEach((move) => {
    const col = move - 1;
    let row = 0;
    while (row < board.length - 1 && board[row][col] === 0) row++;
    const doll = board[row][col];

    if (doll) {
      board[row][col] = 0;
      if (dolls.length >= 1 && dolls[dolls.length - 1] === doll) {
        dolls.pop();
        answer += 2;
      } else {
        dolls.push(doll);
      }
    }
  });
  return answer;
}

function solution(board, moves) {
  let answer = 0;
  const picked = [];

  for (let i = 0; i < moves.length; i++) {
    const col = moves[i] - 1;
    for (let row = 0; row < board.length; row++) {
      if (board[row][col]) {
        if (picked[picked.length - 1] !== board[row][col]) {
          picked.push(board[row][col]);
        } else {
          picked.pop();
          answer += 2;
        }

        board[row][col] = 0;
        break;
      }
    }
  }
  return answer;
}
