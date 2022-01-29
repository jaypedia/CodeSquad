class DashBoard {
  get menu() {
    return [
      { id: 1, drink: 'Americano', time: 3 },
      { id: 2, drink: 'Cafe Latte', time: 5 },
      { id: 3, drink: 'Frappuccino', time: 10 },
    ];
  }

  printGreeting() {
    console.log('\nWELCOME TO ASYNC CAFE!\n');
  }

  printMenu() {
    console.log('----------MENU----------');
    this.menu.forEach(m => {
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
}

module.exports = DashBoard;
