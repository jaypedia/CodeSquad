const OrderView = require('./orderView');
const Cashier = require('./cashier');
const OrderQueue = require('./orderQueue');
const Menu = require('./menu');
const Manager = require('./manager');
const Baristar = require('./baristar');
const EventEmitter = require('events');

class Cafe {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.menu = new Menu();
    this.orderView = new OrderView(this.eventEmitter);
    this.orderQueue = new OrderQueue();
    this.cashier = new Cashier(this.eventEmitter);
    this.manager = new Manager(this.eventEmitter);
    this.baristar = new Baristar(this.eventEmitter, this.menu.list);
  }

  setEventEmitter() {
    this.eventEmitter.on('input', input => {
      this.cashier.takeOrder(input);
      this.manager.setOrderExistsTrue();
      this.manager.keepCafeOpen();
    });

    this.eventEmitter.on('order', order => {
      this.orderQueue.work(order);
      this.manager.work(this.orderQueue);
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
      this.manager.decideToCloseCafe();
    });

    this.eventEmitter.on('close', () => {
      this.close();
    });
  }

  open() {
    this.setEventEmitter();
  }

  close() {
    this.manager.printClose();
    this.orderView.stop();
  }
}

module.exports = Cafe;
