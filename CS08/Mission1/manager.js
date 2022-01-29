class Manager {
  constructor(eventEmitter) {
    this.emitter = eventEmitter;
    this.orderExists = null;
    this.intervalId = null;
    this.orderQueue = null;
    this.cumulativeOrder = 0;
    this.doneDrinkCount = 0;
    this.checkQueue();
    this.checkOrderCount();
  }

  get firstDrink() {
    return this.orderQueue[0];
  }

  increaseDoneDrinkCount() {
    this.doneDrinkCount++;
  }

  cumulateOrder(quantity) {
    this.cumulativeOrder += quantity;
  }

  takeOrderQueue(orderQueue) {
    this.orderQueue = orderQueue.queue;
    this.cumulateOrder(orderQueue.orderQuantity);
  }

  checkQueue() {
    this.intervalId = setInterval(() => {
      if (this.orderExists) {
        this.printOrderQueue();
        this.notifyBaristar(this.firstDrink);
      }
      if (this.orderExists === null) return;
      if (!this.orderExists) {
        this.stopCheckQueue();
      }
    }, 1000);
  }

  printOrderQueue() {
    console.log(
      `\n[📃Manager] Order Queue : ${this.orderQueue.toString()} / Cumulative Order : ${
        this.cumulativeOrder
      }\n`
    );
  }

  setOrderExistsTrue() {
    this.orderExists = true;
  }

  setOrderExistsFalse() {
    this.orderExists = false;
  }

  notifyBaristar(drink) {
    this.emitter.emit('makeDrink', drink);
  }

  stopCheckQueue() {
    clearInterval(this.intervalId);
  }

  checkOrderCount() {
    const intervalId = setInterval(() => {
      if (
        this.cumulativeOrder &&
        this.cumulativeOrder === this.doneDrinkCount
      ) {
        this.emitter.emit('allDone');
        clearInterval(intervalId);
      }
    }, 1000);
  }

  printAllDone() {
    console.log('\n[📃Manager] ALL DRINKS ARE DONE! ENJOY :)');
  }
}

module.exports = Manager;
