class Cashier {
  constructor() {
    this.order;
  }

  takeOrder(order, emitter) {
    this.order = order;
    this.parseOrder(emitter);
  }

  parseOrder(emitter) {
    const [drink, quantity] = this.order.split(':').map(Number);
    emitter.emit('newOrder', { drink, quantity });
  }
}

module.exports = Cashier;
