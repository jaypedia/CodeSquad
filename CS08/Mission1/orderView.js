const EventEmitter = require('events');

class OrderView extends EventEmitter {
  constructor() {
    super();
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
      .on('line', line => {
        this.process(line);
        this.emit('order', line);
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
