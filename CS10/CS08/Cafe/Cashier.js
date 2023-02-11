class Cashier {
  constructor(eventEmitter, orderDB) {
    this.order;
    this.emitter = eventEmitter;
    // mission2
    this.orderDatabase = orderDB.db;
    this.orderData = orderDB.orderDataTemplate;
    this.moment = require('moment');
  }

  takeOrder(order) {
    this.parseAndSaveOrder(order);
    this.sendToOrderQueue();
  }

  sendToOrderQueue() {
    // this.emitter.emit('order', this.order); // Mission 1
    this.emitter.emit('order', this.orderData); // Mission 2
  }

  parseOrder(order) {
    // Mission 1
    // const [drink, quantity] = order.split(':').map(Number);
    // this.order = { drink, quantity };

    // Mission 2
    const [customer, ...orders] = order.split(', ');
    this.setCustomer(customer);

    orders.map(v => {
      const [drinkId, quantity] = v.split(':').map(Number);
      this.orderData.orderDetail.push({ drinkId, quantity });
    });
  }

  setCustomer(customer) {
    this.orderData.customer = customer;
  }

  parseAndSaveOrder(order) {
    this.parseOrder(order);
    this.setOrderInfo();
    this.saveOrderData(this.orderData);
  }

  setOrderInfo() {
    this.setOrderTime();
    this.setTotalOrderCount();
  }

  setOrderTime() {
    this.orderData.orderTime = this.moment().format('h:mm:ss a');
  }

  setTotalOrderCount() {
    this.orderData.totalOrderCount = this.orderData.orderDetail.reduce(
      (acc, cur) => acc + cur.quantity,
      0
    );
  }

  saveOrderData(data) {
    this.orderDatabase.push(data);
    console.log(this.orderDatabase);
    console.log(this.orderDatabase[0].orderDetail);
  }

  // validateOrder() {} or isValid
}

module.exports = Cashier;
