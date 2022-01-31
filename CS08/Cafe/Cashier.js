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
    this.emitter.emit('order', this.order);
    // Mission 2 : this.orderData를 보냄
  }

  parseOrder(order) {
    // Mission 1
    const [drink, quantity] = order.split(':').map(Number);
    this.order = { drink, quantity };

    // const [customer, ...orders] = order.split(', ');
    // this.orderData.customer = customer;

    // orders.map(v => {
    //   const [drinkId, quantity] = v.split(':').map(Number);
    //   this.orderData.orderDetail.push({ drinkId, quantity });
    // });
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
    // console.log(this.orderDatabase);
  }

  // validateOrder() {} or isValid
}

module.exports = Cashier;
