const DashBoard = require('./dashboard');
const moment = require('moment');

class Baristar {
  constructor(eventEmitter) {
    this.emitter = eventEmitter;
    this.menu = new DashBoard().menu;
    this.operationQueue = [];
    this.max = 2;
    this.currentDrink = null;
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

  get isAvailable() {
    return this.operationQueue.length < this.max;
  }

  makeDrink() {
    setTimeout(() => {
      this.done(this.drinkName);
    }, this.drinkTime);
  }

  setCurrentDrink() {
    this.currentDrink = this.operationQueue.shift();
  }

  start(drink) {
    this.enqueue(drink);
    this.setCurrentDrink();
    this.emitter.emit('startMaking', this.drinkName);
    this.makeDrink();
  }

  done(drink) {
    this.emitter.emit('EndMaking', drink);
  }

  enqueue(drink) {
    this.operationQueue.push(drink);
  }

  printStart(drink) {
    console.log(
      `[☕Baristar] START ${drink} / ${moment().format('h:mm:ss a')}\n`
    );
  }

  printDone(drink) {
    console.log(
      `[☕Baristar] DONE ${drink} / ${moment().format('h:mm:ss a')}\n`
    );
  }
}

module.exports = Baristar;
