class OrderView {
  constructor(eventEmitter) {
    this.emitter = eventEmitter;
    this.rl = this.setReadLine();
    this.getUserInput();
  }

  setReadLine() {
    const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.setPrompt('🍹 > ');
    return rl;
  }

  getUserInput() {
    this.rl.prompt();
    this.rl
      .on('line', input => {
        this.process(input);
        this.emitter.emit('input', input);
        this.rl.prompt();
      })
      .on('close', () => process.exit());
  }

  stop() {
    this.rl.close();
  }

  process(line) {
    if (line === 'q') this.stop();
  }
}

module.exports = OrderView;
