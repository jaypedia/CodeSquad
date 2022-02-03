class Manager {
  constructor(eventEmitter, orderDB) {
    this.orderDB = orderDB; // 주문 완료된 시간 기록하기
    this.emitter = eventEmitter;
    this.orderQueue = null;
    this.orderExists = null;
    this.timeoutId = null;
    this.intervalId = null;
    this.cumulativeOrder = 0;
    this.doneDrinkCount = 0;
    this.waitingTimeForCustomer = 3000;
    this.checkQueue();
    this.customerName = null;
  }

  get firstDrink() {
    this.setCustomerName();
    return Number(this.orderQueue[0].slice(-1));
  }

  setCustomerName() {
    this.customerName = this.orderQueue[0].split('-')[0];
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
      if (this.orderExists === null) return;
      if (this.orderExists) {
        this.printOrderQueue();
        this.notifyBaristar(this.firstDrink);
        // this.orderDB.print(); // test
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

  work(orderQueue) {
    this.takeOrderQueue(orderQueue);
    this.checkOrderCount();
  }

  decideToCloseCafe() {
    this.timeoutId = setTimeout(() => {
      this.emitter.emit('close');
    }, this.waitingTimeForCustomer);
  }

  keepCafeOpen() {
    clearTimeout(this.timeoutId);
  }

  printAllDone() {
    console.log(
      `\n[📃Manager] ${this.customerName}, ALL DRINKS ARE DONE! ENJOY :)`
    );
  }

  printClose() {
    console.log('\n[📃Manager] WE ARE CLOSED! THANK YOU.');
  }
}

module.exports = Manager;
