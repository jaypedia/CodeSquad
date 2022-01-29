const EventEmitter = require('events');

class Manager extends EventEmitter {
  constructor() {
    super();
    this.orderExists = null;
    this.intervalId = null;
    this.orderQueue = null;
  }

  get firstDrink() {
    return this.orderQueue[0];
  }

  checkQueue() {
    this.intervalId = setInterval(() => {
      if (this.orderExists) {
        this.printOrderQueue();
        this.notifyBaristar(this.firstDrink);
      }
      if (this.orderExists === null) return;
      if (!this.orderExists) {
        this.allDone();
      }
    }, 1000);
  }

  printOrderQueue() {
    console.log(`\n[📃Manager] Order Queue : ${this.orderQueue.toString()}\n`);
  }

  setOrderExistsTrue() {
    this.orderExists = true;
  }

  setOrderExistsFalse() {
    this.orderExists = false;
  }

  notifyBaristar(drink) {
    this.emit('drink', drink);
  }

  allDone() {
    clearInterval(this.intervalId);
  }
}

module.exports = Manager;
