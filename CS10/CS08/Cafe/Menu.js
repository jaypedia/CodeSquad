class Menu {
  get list() {
    return [
      { id: 1, drink: 'Americano', time: 2 },
      { id: 2, drink: 'Cafe Latte', time: 4 },
      { id: 3, drink: 'Frappuccino', time: 6 },
    ];
  }

  printMenu() {
    console.log('----------MENU----------');
    this.list.forEach(m => {
      console.log(`${m.id}. ${m.drink} (${m.time}sec)`);
    });
    console.log('------------------------');
  }

  printInfo() {
    console.log('\nEnter your name, drinks and quantity.');
    console.log(
      '(Example - Millie, 2 Americano, 3 Frappuccino ⇒ Millie, 1:2, 3:3)\n'
    );
  }

  print() {
    this.printMenu();
    this.printInfo();
  }

  has(menuId) {
    return this.list.find(l => l.id === menuId) ? true : false;
  }
}

module.exports = Menu;
