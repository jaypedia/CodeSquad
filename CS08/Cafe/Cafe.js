const OrderView = require('./OrderView');
const Cashier = require('./Cashier');
const OrderQueue = require('./OrderQueue');
const Menu = require('./Menu');
const Manager = require('./Manager');
const Baristar = require('./Baristar');
const OrderDB = require('./OrderDB');
const EventEmitter = require('events');

class Cafe {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.menu = new Menu();
    this.orderView;
    this.orderQueue = new OrderQueue();
    this.orderDB = new OrderDB();
    this.cashier = new Cashier(this.eventEmitter, this.orderDB);
    this.manager = new Manager(this.eventEmitter, this.orderDB);
    this.baristar = new Baristar(this.eventEmitter, this.menu.list); // mission1
    this.baristarArr = this.employBaristar();
  }

  get baristarNum() {
    return Math.floor(Math.random() * 4) + 2; // Minimum : 2, Maximum : 5
  }

  employBaristar() {
    const baristarArr = [];
    for (let i = 0; i < this.baristarNum; i++) {
      baristarArr.push(new Baristar(this.eventEmitter, this.menu.list));
    }
    return baristarArr;
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

  printGreeting() {
    console.log('\nWELCOME TO ASYNC CAFE!');
    console.log(`\nWe have [ ${this.baristarNum} ] baristars today.\n`);
  }

  open() {
    this.printGreeting();
    this.menu.print();
    this.orderView = new OrderView(this.eventEmitter);
    this.setEventEmitter();
  }

  close() {
    this.manager.printClose();
    this.orderView.stop();
  }
}

module.exports = Cafe;
