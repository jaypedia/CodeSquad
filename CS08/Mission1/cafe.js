const OrderView = require('./orderView');
const Cashier = require('./cashier');
const OrderQueue = require('./orderQueue');
const DashBoard = require('./dashBoard');
const Manager = require('./manager');
const Baristar = require('./baristar');
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

new DashBoard().print(); // 왜 constructor에 print 있으면 두 번 프린트될까?
new OrderView(eventEmitter);

const orderQueue = new OrderQueue();
const cashier = new Cashier(eventEmitter);
const manager = new Manager(eventEmitter);
const baristar = new Baristar(eventEmitter);

eventEmitter.on('input', input => {
  cashier.takeOrder(input);
  manager.setOrderExistsTrue();
});

eventEmitter.on('order', order => {
  orderQueue.work(order);
  manager.takeOrderQueue(orderQueue);
});

eventEmitter.on('makeDrink', drink => {
  if (baristar.isAvailable) {
    baristar.start(drink);
    orderQueue.dequeue();
    if (orderQueue.isEmpty) {
      manager.setOrderExistsFalse();
    }
  }
});

eventEmitter.on('startMaking', drink => {
  baristar.printStart(drink);
});

eventEmitter.on('EndMaking', drink => {
  baristar.printDone(drink);
  manager.increaseDoneDrinkCount();
});

eventEmitter.on('allDone', () => {
  manager.printAllDone();
});
