class Cartoon {
  constructor(name) {
    this.name = name;
    this.charName = [];
  }
  addChar(char) {
    if(char instanceof CartoonChar) {
      this.charName.push(char);
    } else {
      throw new Error(`You can only add an instace of CartoonChar. Argument is not a charcter: ${char}.`)
    }
  }
  describe() {
    return `${this.name} has ${this.charName.length} character on it's show.`
  }
}

class CartoonChar {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return `
    ${this.name}
    `
  }
}

class Menu {
  constructor() {

  }

  start() {
    let select = this.showMainMenu();
    while(select != 0) {
      switch(select) {
        case '1':
          this.addShow();
          break;
        case '2':
          this.deleteShow();
          break;
        case '3':
          this.viewShowList();
        default:
          select = 0
      }
      select = this.showMainMenu();
    }
    alert('Thank you, Good-Bye!')
  }

  showMainMenu() {
    return prompt(`
    Please select a Menu Option:
    1) Add Show
    2) Delete Show
    3) View Show List
    4) Exit
    `);
  }

}

let menu = new Menu();
menu.start();

