class OrderQueue {
  constructor() {
    this.queue = [];
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
}

module.exports = OrderQueue;
