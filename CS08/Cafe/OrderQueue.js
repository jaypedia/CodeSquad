class OrderQueue {
  constructor() {
    this.list = [];
    this.orderQuantity = 0;
  }

  get queue() {
    return this.list;
  }

  get isEmpty() {
    return this.list.length <= 0;
  }

  setOrderQuantity(order) {
    this.orderQuantity = order.totalOrderCount;
  }

  enqueue(order) {
    // for (let i = 0; i < order.quantity; i++) {
    //   this.list.push(order.drink);
    // }

    // Mission 2
    order.orderDetail.forEach(v => {
      for (let i = 0; i < v.quantity; i++) {
        this.list.push(`${order.customer}-${v.drinkId}`);
      }
    });
  }

  dequeue() {
    this.list.shift();
  }

  work(order) {
    this.setOrderQuantity(order);
    this.enqueue(order);
  }
}

module.exports = OrderQueue;
