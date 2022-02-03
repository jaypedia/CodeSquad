class OrderDB {
  constructor() {
    this.db = [];
  }

  get orderDataTemplate() {
    return {
      customer: '',
      totalOrderCount: 0,
      orderDetail: [],
      orderTime: '',
      doneTime: '',
    };
  }

  print() {
    console.log('ORDER DATABASE ', this.db);
  }
}

module.exports = OrderDB;

const db = [
  {
    customer: 'Millie',
    totalOrderCount: 8, // quantity 계산해서 저장
    orderDetail: [
      { drinkId: 1, quantity: 3 },
      { drinkId: 2, quantity: 5 },
    ],
    orderTime: '2:20:22 pm',
    doneTime: '2:21:00 pm',
  },
];
