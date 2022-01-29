class OrderQueue {
  constructor() {
    this.queue = [];
    this.newOrderQuantity = 0;
  }

  setNewOrderQuantity(newOrder) {
    this.newOrderQuantity = newOrder.quantity;
  }

  enqueue(newOrder) {
    for (let i = 0; i < newOrder.quantity; i++) {
      this.queue.push(newOrder.drink);
    }
  }

  dequeue() {
    this.queue.shift();
  }

  getQueue() {
    return this.queue;
  }

  isEmpty() {
    return this.queue.length <= 0;
  }
}

module.exports = OrderQueue;
