class Menu {
  constructor() {
    this.print();
  }

  get list() {
    return [
      { id: 1, drink: 'Americano', time: 2 },
      { id: 2, drink: 'Cafe Latte', time: 4 },
      { id: 3, drink: 'Frappuccino', time: 6 },
    ];
  }

  printGreeting() {
    console.log('\nWELCOME TO ASYNC CAFE!\n');
  }

  printMenu() {
    console.log('----------MENU----------');
    this.list.forEach(m => {
      console.log(`${m.id}. ${m.drink} (${m.time}sec)`);
    });
    console.log('------------------------');
  }

  printInfo() {
    console.log(
      '\nEnter the drink and quantity. (Example - Two cups of Americano ⇒ 1:2)\n'
    );
  }

  print() {
    this.printGreeting();
    this.printMenu();
    this.printInfo();
  }

  has(menuId) {
    return this.list.find(l => l.id === menuId) ? true : false;
  }
}

module.exports = Menu;
