# 2022 코드스쿼드 마스터즈 코스 테스트

##### 📆 기간 : 2021.12.6 ~ 12.8

---

## 📚 미션 : 단계별 소코반 게임 구현

- https://www.cbc.ca/kids/games/play/sokoban 사이트 참고
- 단계별로 지정된 코딩 요구사항 적용
- 단계별로 구현한 코드 동작과 실행 결과에 대해 마크다운 문법으로 README.md 파일에 상세하게 정리
- 특별히 명시되지 않은 부분은 자유롭게 구현

---

## 🌟 구현과정 상세 설명

### 📑 1단계 : 지도 데이터 읽어서 2차원 배열에 저장하고 화면에 출력하기

#### 1. string을 2차원 배열로 변환해주는 함수 만들기

- string 안에 여러 스테이지가 있기 때문에, 스테이지 단계 별로 맵을 정리하면 어떨까? 라는 생각을 했고, 객체를 써서 정리하면 깔끔할 것 같아서 객체를 사용했다.
  - 객체의 key로는 스테이지의 단계가, value로는 2차원 배열로 변환된 map이 있도록 코드를 짜 보았다.
- 각 기호를 숫자로 변경 시, 각 숫자가 무엇을 의미하는지 알 수 있도록 객체를 사용하였다.

```js
function splitStageByLevel() {
  const splitedStage = stages.split('=====');
  return splitedStage;
}

function convertStringTo2DArray() {
  let stageRow;
  const stageObj = {};
  const splitedStage = splitStageByLevel();

  // 스테이지별 각 element를 줄바꿈 기준으로 나누기
  splitedStage.forEach(v => {
    stageRow = v.split('\n');

    // 앞 뒤의 ' ' 제거
    stageRow.pop();
    stageRow.shift();

    // Stage 이름과 숫자를 key로, 빈 배열을 value로 하여 stageObj에 저장
    const stageNumber = stageRow.shift();
    stageObj[stageNumber] = [];

    // 스테이지 별 배열을 돌면서 푸쉬
    // 예) Stage 1은 [ '#####', '#OoP#', '#####' ]
    // 위와 같은 배열을 ['#', '#', '#', '#', '#'] 이런 식으로 만들어주기

    stageRow.forEach(v => {
      const row = v.split('');

      // 각 row마다 map을 써서 숫자로 변환
      let transformedRow = row.map(v => {
        if (v === '#') return objNum.wall;
        if (v === 'O') return objNum.hole;
        if (v === 'o') return objNum.ball;
        if (v === 'P') return objNum.player;
        if (v === ' ') return ' ';
      });

      // 각 row를 해당하는 stage에 푸쉬
      stageObj[stageNumber].push(transformedRow);
    });
  });
  return stageObj;
}
```

#### 실행 결과

```
2차원 배열로 변환된 stages 스트링 :  {
  'Stage 1': [ [ 0, 0, 0, 0, 0 ], [ 0, 1, 2, 3, 0 ], [ 0, 0, 0, 0, 0 ] ],
  'Stage 2': [
    [
      ' ', ' ', 0, 0, 0,
      0,   0,   0, 0
    ],
    [
      0, 0,   0,   ' ', ' ',
      1, ' ', ' ', 0,   0,
      0
    ],
    [
      0, ' ', ' ', ' ', ' ',
      2, ' ', ' ', ' ', ' ',
      0
    ],
    [
      0, ' ', 1, 2, ' ',
      3, ' ', 2, 1, ' ',
      0
    ],
    [
      0, 0,   0,   ' ', ' ',
      2, ' ', ' ', 0,   0,
      0
    ],
    [
      ' ', 0,   ' ', ' ', ' ',
      1,   ' ', ' ', 0,   ' '
    ],
    [
      ' ', 0, 0, 0, 0,
      0,   0, 0, 0
    ]
  ]
}
```

#### 2. 스테이지 정보 프린트하기

- 스테이지 단계와 맵을 저장한 객체를 바탕으로 2차원 배열을 해석하여 각 정보를 프린트해준다.
- 세로크기, 가로크기 등 다양한 정보를 구하는 코드를 함수로 쪼개서 각 함수가 하는 일이 명확하도록 네이밍해 주었다.
- template literals를 이용해 객체의 key에 접근하여 value(2차원 배열)을 얻어낼 수 있게 했다. 이렇게 얻어낸 2차원 배열을 각 정보를 구하는 함수의 인자로 넘겨줘서 정보를 도출할 수 있도록 하였다.

```js
// 가로크기 : 중첩된 배열 중 길이가 가장 긴 것
function findWidth(arr) {
  const temp = [];
  arr.forEach(v => temp.push(v.length));
  return Math.max(...temp);
}

// 세로크기 : 배열의 길이
function findVertical(arr) {
  return arr.length;
}

// 구멍의 수 : O의 수 (숫자 1의 개수)
function findHole(arr) {
  let holeNum = 0;
  arr.forEach(v => {
    holeNum += v.filter(element => element === objNum.hole).length;
  });
  return holeNum;
}

// 공의 수 : o의 수 (숫자 2의 개수)
function findBall(arr) {
  let ballNum = 0;
  arr.forEach(v => {
    ballNum += v.filter(element => element === objNum.ball).length;
  });
  return ballNum;
}

// 플레이어 위치 : 인덱스가 [3][2]라면 (4,3) 형식으로 표현해주기
function findPlayer(arr) {
  let pWidthIdx = 0;
  let pHeightIdx = 0;
  arr.forEach((v, i) => {
    if (v.indexOf(objNum.player) > -1) {
      pWidthIdx = i;
      pHeightIdx = v.indexOf(objNum.player);
    }
  });
  return `(${pWidthIdx + 1}, ${pHeightIdx + 1})`;
}

function printStageInfo() {
  const splitedStage = splitStageByLevel();
  const stageObj = convertStringTo2DArray();

  for (let i = 1; i <= STAGE_LENGTH; i++) {
    console.log(`${splitedStage[i - 1]}`);
    console.log('가로크기 : ', findWidth(stageObj[`Stage ${i}`]));
    console.log('세로크기 : ', findVertical(stageObj[`Stage ${i}`]));
    console.log('구멍의 수 : ', findHole(stageObj[`Stage ${i}`]));
    console.log('공의 수 : ', findBall(stageObj[`Stage ${i}`]));
    console.log('플레이어 위치 : ', findPlayer(stageObj[`Stage ${i}`]));
  }
}
```

#### 실행 결과

```
Stage 1
#####
#OoP#
#####

가로크기 :  5
세로크기 :  3
구멍의 수 :  1
공의 수 :  1
플레이어 위치 :  (2, 4)

Stage 2
  #######
###  O  ###
#    o    #
# Oo P oO #
###  o  ###
 #   O  #
 ########

가로크기 :  11
세로크기 :  7
구멍의 수 :  4
공의 수 :  4
플레이어 위치 :  (4, 6)
```

#### 3. 클래스 버전 제작

- 하나의 클래스로 만들어 보았다. (1-class.js 파일 참고)

---

### 📑 2단계 : 플레이어 이동 구현하기

#### 1. 처음 시작하면 스테이지 2의 지도를 출력하기

- 이차원 배열을 문자열로 바꿔 주는 함수를 만들었다.
  - 이차원 배열로 변환된 지도를 다시 문자열로 바꿔 주는 역할을 한다.
  - 이 함수는 처음 지도를 출력할 떄뿐 아니라, 플레이어가 움직일 때마다 지도를 출력해 줘야 하므로 계속 쓰이게 된다.

```JS
function convert2DArrayToString(arr) {
  let str = '';
  arr.forEach(v => {
    str += v.join('');
    str += '\n';
  });
 return str;
}

```

- getStageArr(level) 함수를 이용해 해당 레벨의 스테이지 배열을 얻는다.

```js
function getStageArr(level) {
  const stageObj = convertStringTo2DArray();
  const stageArr = stageObj[`Stage ${level}`];
  return stageArr;
}
```

- showStage(level) 함수는 인수로 숫자를 받아 해당하는 레벨의 맵을 콘솔에 출력해준다.

```js
function showStage(level) {
  const stageArr = getStageArr(level);
  console.log(`Stage ${level}`);
  console.log(convert2DArrayToString(stageArr));
}
```

#### 2. readline 모듈 사용과 프롬프트 표시

- Node.js에서 사용자 입력을 한 줄씩 읽기 위해 readline 모듈을 사용하였다.
  - 사용자와의 상호 작용을 위해 createInterface 메서드로 입출력을 위한 인터페이스를 만들어준다. createInterface 메서드는 두 개의 인수를 받는데, 첫 번째 인수는 표준 입력을 위한 것이고, 두 번째 인수는 표준 출력을 읽기 위한 인수다.
- readline 모듈의 setPrompt 메서드를 이용해서 prompt를 띄울 때 'SOKOBAN >'이 나오도록 설정하였다.
  - prompot() 메서드는 setPrompt() 메서드로 설정한 프롬프트를 보여주기 위한 메서드이다.

```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt('SOKOBAN> ');
rl.prompt();
```

#### 3. readline의 on 메서드로 사용자 입력 받기

- 사용자로부터 입력을 읽고 콘솔에 표시해주는 on() 메서드는 두 개의 매개 변수를 가진다. 첫 번째 매개 변수로는 이벤트, 두 번째 매개 변수로는 콜백 함수를 받는다.
  - 여기서는 line 이벤트를 받는데, 이 이벤트는 유저가 Enter 키를 누를 때마다 발생하게 된다.
  - close 이벤트는 close() 메서드가 호출되거나, 사용자가 인터페이스를 닫기 위해 ctrl + c를 누를 때 호출된다.
- 사용자의 입력이 'q'일 경우, 'Bye~'를 콘솔창에 출력하며 게임을 종료한다.
- q 외의 다른 키가 입력되었을 경우, parseInput() 함수를 호출하며 사용자의 입력을 인수로 전달한다.
- prompt() 메서드로 프롬프트를 다시 띄워 준다.

```js
rl.on('line', line => {
  if (line === 'q') {
    console.log('Bye~');
    rl.close();
  }
  parseInput(line);
  rl.prompt();
}).on('close', () => process.exit());
```

#### 4. 하나 이상의 문자를 입력받은 경우 순서대로 처리하기

- 유저가 q 이외의 문자를 입력한 후 엔터를 누르면 parseInput 함수가 호출된다.
- 여러 문자를 입력받았을 때에도 문자별로 순차적으로 실행하기 위해 split('')으로 배열로 만든 후, forEach 메서드를 사용해 배열의 각 요소(문자)에 대해 switch case문을 실행한다.
- w, a, s, d 중 하나를 입력한 경우 플레이어를 해당 방향으로 움직이기 위해 movePlayer 함수를 호출한다. 네 개의 문자 이외의 다른 문자를 입력했을 경우 경고를 표시하기 위해 warnToUser 함수를 호출한다.

```js
function parseInput(stageArr, line) {
  line.split('').forEach(key => {
    switch (key) {
      case 'w':
        movePlayer(stageArr, 'up', krDirection.up, key);
        break;
      case 'a':
        movePlayer(stageArr, 'left', krDirection.left, key);
        break;
      case 's':
        movePlayer(stageArr, 'down', krDirection.down, key);
        break;
      case 'd':
        movePlayer(stageArr, 'right', krDirection.right, key);
        break;
      default:
        warnToUser(stageArr, key);
    }
  });
}
```

#### 5. 플레이어를 움직이며 단계별로 상태를 출력하기

- 플레이어를 해당 방향으로 움직이기 위해서 우선 플레이어의 현재 좌표, 즉 이차원 배열에서의 인덱스를 알아야 한다.
  - 플레이어가 위치한 행과 열 인덱스를 알기 위해서 getPlayerRow, getPlayerColumn 함수를 각각 만들었다.
- 플레이어의 원래 행과 열 인덱스를 저장하기 위해 const 자료형을 써서 각각 저장하였다.
- 플레이어의 위치를 조정할 때 행이나 열 인덱스에서 더하거나 빼주는 등의 조작이 필요하기 때문에 let 변수에 각각 저장하였다.
- 플레이어의 이동이라는 것은 결국 해당 이차원 배열 내의 space(' ')와 player('P')의 인덱스를 바꿔주는 것과 같다고 생각하였다.
  - 유저가 입력한 direction에 따라서 switch case 문으로 행과 열의 인덱스를 수정한다.
  - 만약 수정된 인덱스 위치에 존재하는 것이 space가 아니라면, 그 곳엔 플레이어가 갈 수 없으므로 경고 문구를 콘솔에 출력해준다.
  - 원래 플레이어가 위치한 행과 열 인덱스에는 space를 할당하고, 조작한 인덱스 위치에 player를 할당하여 빈칸과 플레이어의 위치를 바꿔 준다. 이런 식으로 player가 유저가 입력한 방향 쪽으로 이동하는 효과를 낼 수 있다.
- Player가 이동할 때마다, 즉 movePlayer 함수가 호출될 때마다 그 결과가 반영된 스테이지 지도도 출력해주기 위해서 convert2DArrayToString 함수도 호출한다.

```js
function movePlayer(arr, direction, krDirection, key) {
  const KEY = key.toUpperCase();
  const space = ' ';
  const player = 'P';

  const originalRow = getPlayerRow(arr);
  const originalCol = getPlayerColumn(arr);
  let row = getPlayerRow(arr);
  let col = getPlayerColumn(arr);

  switch (direction) {
    case 'right':
      col += 1;
      break;
    case 'left':
      col -= 1;
      break;
    case 'up':
      row -= 1;
      break;
    case 'down':
      row += 1;
      break;
  }

  if (arr[row][col] !== ' ') {
    console.log(convert2DArrayToString(arr));
    console.log(
      `${KEY} : (경고!) ${krDirection}쪽으로 더 이상 갈 수 없습니다!`
    );
    return;
  }

  arr[originalRow][originalCol] = space;
  arr[row][col] = player;
  console.log(convert2DArrayToString(arr));
  console.log(`${KEY} : ${krDirection}쪽으로 이동합니다.`);
}
```

---

### 📑 3단계 : 소코반 게임 완성하기

#### 1. 지도파일 map.txt를 문자열로 읽어서 처리하기

- Node.js에서 파일을 읽어 들이기 위해 file system 모듈을 사용하였다.
- fs 모듈의 readFileSync 메서드를 이용해 텍스트 파일을 문자열로 변환하고, replace 메서드를 이용해 줄바꿈 시 붙는 \r을 제거하여 리턴하였다.
- 클래스로 만들어 역할을 분리할 수 있게 하였다.

```js
class TextFileManager {
  constructor(file) {
    this.file = file;
  }

  convertTextFileToString() {
    const fs = require('fs');
    const buffer = fs.readFileSync(this.file);
    const string = buffer.toString();
    const stringWithoutLineBreaks = string.replace(/(\r)/gm, '');
    return stringWithoutLineBreaks;
  }
}
```

#### 2. r 입력 시 스테이지 초기화하기

- 2단계에서 만들었던 함수에 사용자 입력이 r일 경우 스테이지를 초기화할 수 있도록 함수를 만들었다.
- 문자열 하드 코딩으로 인한 미연의 오류을 방지하기 위해 모두 생성자 함수 에 객체로 저장하였다.

```js
  this.command = {
      UP: 'w',
      DOWN: 's',
      LEFT: 'a',
      RIGHT: 'd',
      RESET: 'r',
      QUIT: 'q',
      INVALID_KEY: 'invaildKey',
      VALID_KEY: 'validKey',
      TWO_BALLS: 'twoBalls',
      WALL: 'wall',
    };

  resetStage() {
    this.stageArr = this.getStageArr(this.level);
    console.log(this.convert2DArrayToString(this.stageArr));
    console.log('스테이지가 초기화 되었습니다.');
  }

  readUserInput() {
    this.rl.setPrompt('SOKOBAN> ');
    this.rl.prompt();
    this.rl
      .on('line', line => {
        if (line === this.command.QUIT) {
          console.log('ヾ(＠⌒ー⌒＠)ノBye~');
          this.rl.close();
        }
        line === this.command.RESET
          ? this.resetStage()
          : this.parseInputToMovePlayer(this.stageArr, line);
        this.rl.prompt();
      })
      .on('close', () => process.exit());
  }
```

#### 3. 플레이어의 이동 구현하기

- 2단계에서 플레이어를 이동했던 로직을 요구사항에 맞춰 확장하였다.
- movePlayer 함수에서 인덱스를 계산하는 로직은 calculateIdx 함수로 분리하였다.
- 공을 밀거나, \*을 밀어서 공과 구멍을 분리하는 경우 플레이어 위치 인덱스에서 2 떨어진 곳도 고려해야 하기 때문에 row2와 col2를 추가하였다.
- 각 인덱스를 리턴 시 구조 분해 할당을 이용하였다.

```js
  calculateIdx(arr, direction) {
    const pRow = this.getPlayerRowIdx(arr);
    const pCol = this.getPlayerColumnIdx(arr);
    let row1 = this.getPlayerRowIdx(arr);
    let col1 = this.getPlayerColumnIdx(arr);
    let row2 = this.getPlayerRowIdx(arr);
    let col2 = this.getPlayerColumnIdx(arr);

    switch (direction[0]) {
      case 'right':
        col1 += 1;
        col2 += 2;
        break;
      case 'left':
        col1 -= 1;
        col2 -= 2;
        break;
      case 'up':
        row1 -= 1;
        row2 -= 2;
        break;
      case 'down':
        row1 += 1;
        row2 += 2;
        break;
    }
    const idx = { pRow, pCol, row1, col1, row2, col2 };
    return idx;
  }
```

- 다음 1) ~ 4)의 코드는 movePlayer 함수의 일부분이다.

##### 1) 플레이어가 O(구멍)을 통과할 수 있게 하는 로직

- 플레이어가 이동하려고 하는 방향 쪽에 구멍이 있다면, 우선 구멍 자리에 플레이어가 오게 되고, 구멍은 보이지 않게 된다.
  - 즉, 구멍 인덱스에 플레이어를 할당하고, 플레이어가 있던 인덱스에는 빈칸을 할당한다.
- 플레이어가 구멍 위치에서 다른 곳으로 이동 시, 구멍이 다시 나타나야 한다. 그렇게 하기 위해 생성자 함수에 구멍의 행과 열 인덱스를 저장해 두었다.
  - 플레이어가 빈칸으로 이동 시, 만약 플레이어의 현재 인덱스가 저장된 구멍의 인덱스와 일치한다면, 플레이어는 다음 인덱스로 이동하며 플레이어의 인덱스에 다시 구멍을 할당해준다.

```js
   changePlayerAndSpaceIdx(arr, pRow, pCol, row1, col1) {
    arr[pRow][pCol] = this.symbol.space;
    arr[row1][col1] = this.symbol.player;
  }

 if (arr[i.row1][i.col1] === this.symbol.hole) {
      console.log('(안내) 구멍을 통과했습니다.');
      this.changePlayerAndSpaceIdx(arr, i.pRow, i.pCol, i.row1, i.col1);
      this.holeRow = i.row1;
      this.holeCol = i.col1;
    }
 // ... (중략)
    else if (arr[i.row1][i.col1] === this.symbol.space) {
      if (i.pRow === this.holeRow && i.pCol === this.holeCol) {
        arr[this.holeRow][this.holeCol] = this.symbol.hole;
      } else {
        arr[i.pRow][i.pCol] = this.symbol.space;
      }
      arr[i.row1][i.col1] = this.symbol.player;
    }
```

##### 2) 플레이어가 o을 미는 로직

- 원래 요구 사항에서는 볼을 구멍에 밀어넣게 되면 숫자 0으로 변경하는 것인데, 알파벳 O와 숫자 0이 터미널 상에서 거의 똑같이 보여서 \*으로 변경하였다.
- 안내 멘트를 추가하였다.

```js
    else if (arr[i.row1][i.col1] === this.symbol.ball) {

      // 플레이어는 o를 밀어서 이동할 수 있다.
      if (arr[i.row2][i.col2] === this.symbol.space) {
        console.log('(안내) 공을 밀었습니다.');
        this.changePlayerAndSpaceIdx(arr, i.pRow, i.pCol, i.row1, i.col1);
        arr[i.row2][i.col2] = this.symbol.ball;

      // o를 O 지점에 밀어 넣으면 *으로 변경된다.
      } else if (arr[i.row2][i.col2] === this.symbol.hole) {
        console.log('(안내) 공을 구멍에 넣었네요! *^_^*');
        this.changePlayerAndSpaceIdx(arr, i.pRow, i.pCol, i.row1, i.col1);
        arr[i.row2][i.col2] = this.symbol.gole;

      // o가 두 개 연속으로 붙어있는 경우 밀 수 없다.
      } else if (arr[i.row2][i.col2] === this.symbol.ball) {
        this.warnToUser(arr, this.command.TWO_BALLS, key);
        return;

      // 더 이상 공을 밀 수 없는 경우를 추가하였다.
      } else if (arr[i.row2][i.col2] === this.symbol.wall) {
        this.warnToUser(arr, this.command.WALL, key);
        return;
      }
    }
```

##### 3) 플레이어가 \*을 밀었을 때 o과 O으로 다시 분리시키는 로직

- \*을 밀었을 때 공과 구멍으로 분리시키려면, 그 옆 인덱스가 빈칸이어야 한다. 빈칸인지 체크하여 빈칸이면 분리시키고, 아니면 경고를 표시하도록 하였다.

```js
    else if (arr[i.row1][i.col1] === this.symbol.gole) {
      if (arr[i.row2][i.col2] === this.symbol.space) {
        console.log('(안내) 공과 구멍이 분리됩니다.');
        arr[i.row1][i.col1] = this.symbol.ball;
        arr[i.row2][i.col2] = this.symbol.hole;
      } else {
        this.warnToUser(arr, this.command.VALID_KEY, key, direction[1]);
        return;
      }
```

##### 4) 플레이어가 움직일 때마다 턴수를 카운트한다.

- 생성자 함수에서 턴 수를 0으로 초기화하고, movePlayer 함수가 호출되어 플레이어가 움직일 때마다 countTurns 함수도 호출하여 턴 수를 증가해준다.
- 다음 스테이지로 갈 때 턴수는 다시 0으로 초기화될 수 있도록 nextStage 함수에 설정하였다.

```js
  this.turns = 0;

  countTurns() {
    ++this.turns;
    console.log(`턴수 : ${this.turns}`);
  }

  nextStage() {
    ++this.level;
    this.turns = 0;
    this.stageArr = this.getStageArr(this.level);
  }
```

#### 4. 모든 o를 O자리에 이동시키면 클리어 화면과 다음 스테이지 표시하기

- 모든 o를 O자리에 이동하게 되면 결국 o의 개수가 0이 되어야 한다는 것이기 때문에, getNumOfBalls를 호출하여 이차원 배열 내에서 공의 개수가 몇 갠지 구한다.
- 공의 개수가 0이 아니면 리턴하여 함수를 빠져나오고, 공의 개수가 0이면 clearStage 함수를 호출한다.

```js
  checkBallNumAndClearStage(arr) {
    const ballNum = this.getNumOfBalls(arr, this.symbol.ball);
    if (ballNum) {
      return;
    } else {
      this.clearStage();
    }
  }
```

#### 5. 주어진 모든 스테이지를 클리어하면 축하 메시지를 출력하고 게임 종료하기

- clearStage 함수는 현재 레벨이 최고 레벨보다 적을 경우 다음 스테이지로 갈 수 있게 하며, 현재 레벨이 최고 레벨보다 같거나 클 경우 축하 메시지와 함께 게임을 종료한다.

```js
  clearStage() {
    this.showClearStage();
    if (this.level < this.maxLevel) {
      this.nextStage();
      this.showStage();
    } else {
      this.showClearAllStage();
      this.endGame();
    }
  }
```

---

### 셀프 피드백

#### 잘한 점

- 3일 동안 열중하여 테스트를 해결해냈다. 비록 4단계는 구현하지 못했지만, 3단계까지는 요구사항대로 구현하였다.
- 구현할 때 모르는 것이 있어도 포기하지 않고, 다양한 자료를 참조하여 해결해냈다. 다양한 자료를 참조하는 과정에서 배운 것들도 많고, 노션에 정리해 두었다.
- 머릿속으로 생각한 로직을 순서도를 그리거나 글로 상세히 풀어 써서 코드로 구현하여 구현 시간을 비교적 단축시켰다.

#### 아쉬운 점

- GameManager 클래스가 지나치게 크다. 스테이지의 맵만 관리하는 클래스와 게임 플레이를 관리하는 클래스로 나누고 싶었는데, 계속 에러가 나는 바람에 마저 구현하지 못했다. 클래스를 좀 더 자유자재로 코딩할 수 있기 위한 연습이 필요하다.
- movePlayer 함수가 너무 길고, 조건문이 중첩되어 있어서 가독성이 좋지 않다. 사실 이 함수를 리팩토링하는 데 걸린 시간이 가장 길다. 기존에 100줄이 넘어갈 정도로 너무 많은 기능을 가지고 있었다. 리팩토링 후 45줄 정도로 줄긴 했으나 여전히 긴 편이다. 조건문으로 나누는 대신 규칙을 찾는 방식으로도 시도했으나 해결하지 못했다.
