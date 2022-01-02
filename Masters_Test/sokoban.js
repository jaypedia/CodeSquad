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

class GameManager {
  constructor(file) {
    this.level = 1;
    this.maxLevel = 5;
    this.turns = 0;
    this.holeRow = 0;
    this.holeCol = 0;

    this.stageObj = {};
    this.mapString = new TextFileManager(file);
    this.stages = this.mapString.convertTextFileToString();
    this.splitedStage = this.splitStageByLevel();
    this.stageObj = this.convertStringTo2DArray();

    this.stageArr = this.getStageArr(this.level);
    this.direction = {
      right: ['right', '오른'],
      left: ['left', '왼'],
      up: ['up', '위'],
      down: ['down', '아래'],
    };
    this.symbol = {
      player: 'P',
      ball: 'o',
      hole: 'O',
      gole: '*',
      space: ' ',
      wall: '#',
    };
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
    this.readline = require('readline');
    this.rl = this.readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  splitStageByLevel() {
    const splitedStage = this.stages.split('=====');
    return splitedStage;
  }

  convertStringTo2DArray() {
    let stageRow;
    const splitedStage = this.splitStageByLevel();
    splitedStage.forEach(v => {
      stageRow = v.split('\n');
      stageRow.pop();
      stageRow.shift();
      const stageNumber = stageRow.shift();
      this.stageObj[stageNumber] = [];
      stageRow.forEach(v => {
        const row = v.split('');
        this.stageObj[stageNumber].push(row);
      });
    });
    return this.stageObj;
  }

  convert2DArrayToString(arr) {
    let str = '';
    arr.forEach(v => {
      str += v.join('');
      str += '\n';
    });
    return str;
  }

  getStageArr(level) {
    const stageObj = this.convertStringTo2DArray();
    const stageArr = stageObj[`Stage ${level}`];
    return stageArr;
  }

  getNumOfBalls(arr, ballStr) {
    let ballNum = 0;
    arr.forEach(v => {
      ballNum += v.filter(element => element === ballStr).length;
    });
    return ballNum;
  }

  getPlayerRowIdx(arr) {
    let row = 0;
    arr.forEach((v, i) => {
      if (v.indexOf('P') > -1) {
        row = i;
      }
    });
    return row;
  }

  getPlayerColumnIdx(arr) {
    let col = 0;
    arr.forEach(v => {
      if (v.indexOf('P') > -1) {
        col = v.indexOf('P');
      }
    });
    return col;
  }

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

  changePlayerAndSpaceIdx(arr, pRow, pCol, row1, col1) {
    arr[pRow][pCol] = this.symbol.space;
    arr[row1][col1] = this.symbol.player;
  }

  movePlayer(arr, direction, key) {
    const KEY = key.toUpperCase();
    const i = this.calculateIdx(arr, direction);
    if (arr[i.row1][i.col1] === this.symbol.wall) {
      this.warnToUser(arr, this.command.VALID_KEY, key, direction[1]);
      return;
    }
    if (arr[i.row1][i.col1] === this.symbol.hole) {
      console.log('(안내) 구멍을 통과했습니다.');
      this.changePlayerAndSpaceIdx(arr, i.pRow, i.pCol, i.row1, i.col1);
      this.holeRow = i.row1;
      this.holeCol = i.col1;
    } else if (arr[i.row1][i.col1] === this.symbol.ball) {
      if (arr[i.row2][i.col2] === this.symbol.space) {
        console.log('(안내) 공을 밀었습니다.');
        this.changePlayerAndSpaceIdx(arr, i.pRow, i.pCol, i.row1, i.col1);
        arr[i.row2][i.col2] = this.symbol.ball;
      } else if (arr[i.row2][i.col2] === this.symbol.hole) {
        console.log('(안내) 공을 구멍에 넣었네요! *^_^*');
        this.changePlayerAndSpaceIdx(arr, i.pRow, i.pCol, i.row1, i.col1);
        arr[i.row2][i.col2] = this.symbol.gole;
      } else if (arr[i.row2][i.col2] === this.symbol.ball) {
        this.warnToUser(arr, this.command.TWO_BALLS, key);
        return;
      } else if (arr[i.row2][i.col2] === this.symbol.wall) {
        this.warnToUser(arr, this.command.WALL, key);
        return;
      }
    } else if (arr[i.row1][i.col1] === this.symbol.gole) {
      if (arr[i.row2][i.col2] === this.symbol.space) {
        console.log('(안내) 공과 구멍이 분리됩니다.');
        arr[i.row1][i.col1] = this.symbol.ball;
        arr[i.row2][i.col2] = this.symbol.hole;
      } else {
        this.warnToUser(arr, this.command.VALID_KEY, key, direction[1]);
        return;
      }
    } else if (arr[i.row1][i.col1] === this.symbol.space) {
      if (i.pRow === this.holeRow && i.pCol === this.holeCol) {
        arr[this.holeRow][this.holeCol] = this.symbol.hole;
      } else {
        arr[i.pRow][i.pCol] = this.symbol.space;
      }
      arr[i.row1][i.col1] = this.symbol.player;
    }
    this.showMapAndMoveComment(arr, KEY, direction[1]);
    this.countTurns();
    this.checkBallNumAndClearStage(arr);
  }

  checkBallNumAndClearStage(arr) {
    const ballNum = this.getNumOfBalls(arr, this.symbol.ball);
    if (ballNum) {
      return;
    } else {
      this.clearStage();
    }
  }

  showMapAndMoveComment(arr, KEY, krDirection) {
    const map = this.convert2DArrayToString(arr);
    console.log(map);
    console.log(`${KEY} : ${krDirection}쪽으로 이동합니다.`);
  }

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

  showClearStage() {
    console.log(`
    (✿◕‿◕✿) 빠밤! 스테이지 ${this.level} 클리어!
    `);
  }

  showClearAllStage() {
    console.log(`
  ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
  모든 스테이지 클리어!
  축하합니다! *^____^*
  ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
  `);
  }

  endGame() {
    this.rl.close();
  }

  warnToUser(arr, command, key, krDirection) {
    const KEY = key.toUpperCase();
    console.log(this.convert2DArrayToString(arr));
    switch (command) {
      case this.command.INVALID_KEY:
        return console.log(`${KEY} : (경고!) 해당 명령을 수행할 수 없습니다!`);

      case this.command.VALID_KEY:
        return console.log(
          `${KEY} : (경고!) ${krDirection}쪽으로 더 이상 갈 수 없습니다!`
        );

      case this.command.TWO_BALLS:
        return console.log(
          `${KEY} : (경고!) 두 개 이상의 공을 한 번에 밀 수 없습니다!`
        );

      case this.command.WALL:
        return console.log(`${KEY} : (경고!) 더 이상 공을 밀 수 없습니다!`);
    }
  }

  parseInputToMovePlayer(stageArr, line) {
    line.split('').forEach(key => {
      switch (key) {
        case this.command.UP:
          this.movePlayer(stageArr, this.direction.up, key);
          break;
        case this.command.LEFT:
          this.movePlayer(stageArr, this.direction.left, key);
          break;
        case this.command.DOWN:
          this.movePlayer(stageArr, this.direction.down, key);
          break;
        case this.command.RIGHT:
          this.movePlayer(stageArr, this.direction.right, key);
          break;
        default:
          this.warnToUser(stageArr, this.command.INVALID_KEY, key);
      }
    });
  }

  countTurns() {
    ++this.turns;
    console.log(`턴수 : ${this.turns}`);
  }

  nextStage() {
    ++this.level;
    this.turns = 0;
    this.stageArr = this.getStageArr(this.level);
  }

  resetStage() {
    this.stageArr = this.getStageArr(this.level);
    console.log(this.convert2DArrayToString(this.stageArr));
    console.log('스테이지가 초기화 되었습니다.');
  }

  showIntro() {
    console.log(`
  ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
  (●'◡'●)
  소코반의 세계에 오신 것을 환영합니다!
  그럼 시작해 볼까요? 출발!
  ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
    `);
  }

  showStage() {
    const stageArr = this.getStageArr(this.level);
    console.log(`@@@@@@@ Stage ${this.level} @@@@@@@ \n`);
    console.log(this.convert2DArrayToString(stageArr));
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

  startGame() {
    this.showIntro();
    this.showStage();
    this.readUserInput();
  }
}

const FILENAME = 'map.txt';
const sokoban = new GameManager(FILENAME);
sokoban.startGame();
