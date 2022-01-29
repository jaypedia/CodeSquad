const OrderView = require('./orderView');
const Cashier = require('./cashier');
const OrderQueue = require('./orderQueue');
const DashBoard = require('./dashBoard');
const Manager = require('./manager');
const Baristar = require('./baristar');
const EventEmitter = require('events');

class Cafe {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.dashBoard = new DashBoard();
    this.orderView = new OrderView(this.eventEmitter);
    this.orderQueue = new OrderQueue();
    this.cashier = new Cashier(this.eventEmitter);
    this.manager = new Manager(this.eventEmitter);
    this.baristar = new Baristar(this.eventEmitter, this.dashBoard.menu);
  }

  setEventEmitter() {
    this.eventEmitter.on('input', input => {
      this.cashier.takeOrder(input);
      this.manager.setOrderExistsTrue();
    });

    this.eventEmitter.on('order', order => {
      this.orderQueue.work(order);
      this.manager.takeOrderQueue(this.orderQueue);
    });

    this.eventEmitter.on('makeDrink', drink => {
      if (this.baristar.isAvailable) {
        this.baristar.start(drink);
        this.orderQueue.dequeue();
        if (this.orderQueue.isEmpty) {
          this.manager.setOrderExistsFalse();
        }
      }
    });

    this.eventEmitter.on('startMaking', drink => {
      this.baristar.printStart(drink);
    });

    this.eventEmitter.on('EndMaking', drink => {
      this.baristar.printDone(drink);
      this.manager.increaseDoneDrinkCount();
    });

    this.eventEmitter.on('allDone', () => {
      this.manager.printAllDone();
    });
  }

  open() {
    this.setEventEmitter();
  }
}

module.exports = Cafe;
