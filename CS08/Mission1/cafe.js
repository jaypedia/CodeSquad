const OrderView = require('./orderView');
const Cashier = require('./cashier');
const OrderQueue = require('./orderQueue');
const DashBoard = require('./dashBoard');
const Manager = require('./manager');
const Baristar = require('./baristar');

const dashBoard = new DashBoard();
dashBoard.print();

const orderView = new OrderView();
const cashier = new Cashier();
const orderQueue = new OrderQueue();
const manager = new Manager();
const baristar = new Baristar();
manager.checkQueue();
manager.checkOrderCount();

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

orderView.on('order', order => {
  cashier.takeOrder(order, eventEmitter);
  manager.setOrderExistsTrue();
});

eventEmitter.on('newOrder', newOrder => {
  orderQueue.setNewOrderQuantity(newOrder);
  orderQueue.enqueue(newOrder);
  manager.orderQueue = orderQueue.getQueue();
  manager.cumulativeOrder += orderQueue.newOrderQuantity;
});

manager.on('drink', drink => {
  if (baristar.isAvailable()) {
    baristar.start(drink);
    orderQueue.dequeue();

    if (orderQueue.isEmpty()) {
      manager.setOrderExistsFalse();
    }
  }
});

baristar.on('start', drink => {
  baristar.printStart(drink);
});

baristar.on('done', drink => {
  baristar.printDone(drink);
  manager.doneDrinkCount++;
});

manager.on('allDone', () => {
  manager.printNotification();
});
