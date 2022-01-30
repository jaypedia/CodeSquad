// stackoverflow.com/questions/65891912/how-can-i-avoid-overlapping-readline-and-console-log-in-node

var stdin = process.stdin;
var stdout = process.stdout;
var prompt = '>';
var current = '';

stdin.setRawMode(true);
stdin.setEncoding('utf8');
stdout.write(prompt);

stdin.on('data', function (key) {
  switch (key) {
    case '\u001B\u005B\u0041': //up
    case '\u001B\u005B\u0043': //right
    case '\u001B\u005B\u0042': //down
    case '\u001B\u005B\u0044': //left
      break;
    case '\u0003': // control c 강제종료 막기
      process.exit();
      break;
    case '\u000d': // 엔터
      //RunCommands(current) -> current 처리 로직
      current = '';
      console.log('\b'); // 백스페이스
      stdout.write(prompt); // 수작업이다.
      break;
    case '\u007f':
      stdout.write('\r\x1b[K');
      current = current.slice(0, -1);
      stdout.write(prompt + current);
      break;
    default:
      stdout.write(key);
      current += key;
      break;
  }
});

function print(str) {
  let totalCurrentLength = current.length + prompt.length;
  let lines = Math.ceil(totalCurrentLength / stdout.columns);

  for (i = 0; i < lines; i++) {
    stdout.clearLine();
    stdout.write('\u001B\u005B\u0041');
  }

  stdout.write('\u001B\u005B\u0042');

  stdout.cursorTo(0);
  console.log(str);
  stdout.write(prompt + current);
}

var count = 0;
setInterval(() => {
  print('Test interference: ' + count++);
}, 500);
