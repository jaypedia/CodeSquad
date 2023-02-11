class InputView {
  constructor(promptMsg) {
    this.rl = this.setReadLine();
    this.promptMsg = promptMsg;
    this.userInput;
  }

  setReadLine() {
    const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.setPrompt(this.promptMsg);
    return rl;
  }

  getUserInput() {
    this.rl.prompt();
    this.rl
      .on('line', line => {
        this.userInput = line;
        this.rl.prompt();
      })
      .on('close', () => process.exit());
  }

  stop() {
    console.log('END');
    this.rl.close();
  }

  process(line) {
    if (line === 'q') this.stop();
  }
}

module.exports = InputView;
