const EventEmitter = require('events');
const DashBoard = require('./dashboard');
const moment = require('moment');

class Baristar extends EventEmitter {
  constructor() {
    super();
    this.menu = new DashBoard().menu;
    this.operationQueue = [];
    this.max = 2;
    this.currentDrink = null;
    this.timeoutId = null;
  }

  get drinkIdx() {
    return this.currentDrink - 1;
  }

  get drinkName() {
    return this.menu[this.drinkIdx].drink;
  }

  get drinkTime() {
    return this.menu[this.drinkIdx].time * 1000;
  }

  isAvailable() {
    return this.operationQueue.length < this.max;
  }

  makeDrink() {
    this.timeoutId = setTimeout(() => {
      this.done(this.drinkName);
    }, this.drinkTime);
  }

  setCurrentDrink() {
    this.currentDrink = this.operationQueue.shift();
  }

  start(drink) {
    this.enqueue(drink);
    this.setCurrentDrink();
    this.emit('start', this.drinkName);
    this.makeDrink();
  }

  done(drink) {
    this.emit('done', drink);
  }

  notifyAllDone() {
    if (this.timeoutId) return;
    this.emit('allDone');
  }

  enqueue(drink) {
    this.operationQueue.push(drink);
  }

  printStart(drink) {
    console.log(
      `[☕Baristar] START ${drink} / ${moment().format('h:mm:ss a')}`
    );
  }

  printDone(drink) {
    console.log(`[☕Baristar] DONE ${drink} / ${moment().format('h:mm:ss a')}`);
  }

  printNotification() {
    console.log('[☕Baristar] ALL DRINKS ARE DONE! ENJOY :)');
  }
}

module.exports = Baristar;
