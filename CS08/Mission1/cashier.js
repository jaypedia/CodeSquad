class Cashier {
  constructor(eventEmitter) {
    this.order;
    this.emitter = eventEmitter;
  }

  takeOrder(order) {
    this.parseOrder(order);
    this.sendToOrderQueue();
  }

  parseOrder(order) {
    const [drink, quantity] = order.split(':').map(Number);
    this.order = { drink, quantity };
  }

  sendToOrderQueue() {
    this.emitter.emit('order', this.order);
  }
}

module.exports = Cashier;
