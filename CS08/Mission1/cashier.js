class Cashier {
  constructor() {
    this.order;
  }

  takeOrder(order, emitter) {
    this.order = order;
    this.sendToOrderQueue(emitter);
  }

  parseOrder() {
    const [drink, quantity] = this.order.split(':').map(Number);
    return { drink, quantity };
  }

  sendToOrderQueue(emitter) {
    emitter.emit('newOrder', this.parseOrder());
  }
}

module.exports = Cashier;
