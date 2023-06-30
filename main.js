class Cartoon {
  constructor(name) {
    this.name = name;
    this.charName = [];
  }
  addChar(char) {
    if (char instanceof CartoonChar) {
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
    this.shows = [];
    this.cartoonSelected = null;
  }

  start() {
    let select = this.showMainMenu();
    while (select != 0) {
      switch (select) {
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

  addShow() {
    let show = prompt(`
      What is the name of Cartoon you would like to add?
    `);
    this.shows.push(new Cartoon(show));
  }

  deleteShow() {
    let listStr = '';
    if (this.shows.length != 0) {
      for (let i = 0; i < this.shows.length; i++) {
        listStr += i + 1 + ') ' + this.shows[i].name + ' \n';
      }
      let select = prompt('Please select a Cartoon to delete \n-------------------------------- \n' + listStr);
      alert(`
    ${this.shows[select - 1].name} has successfully been deleted!
    `)
      this.shows.splice(select - 1, 1);
    } else {
      alert(`
      There are no Cartoon shows to delete.
      `)
    }
  }

  deleteShowChar() {
    // console.log(this.shows[this.cartoonSelected - 1].charName.length)
    let listStr = '';
    if (this.shows[this.cartoonSelected - 1].charName.length != 0) {
      for (let i = 0; i<this.shows[this.cartoonSelected - 1].charName.length; i++) {
        listStr += i + 1 + ') ' + this.shows[this.cartoonSelected - 1].charName[i].name + ' \n';
      }
      let select = prompt('Please select a Cartoon to delete \n-------------------------------- \n' + listStr);
      alert(`
    ${this.shows[this.cartoonSelected - 1].charName[select - 1].name} has successfully been deleted!
    `)
      this.shows[this.cartoonSelected - 1].charName.splice(select - 1, 1);
    } else {
      alert(`
      There are no characters to delete from this cartoon.
      `)
    }
  }

  viewShowList() {
    let listStr = '';
    if (this.shows.length != 0) {
      for (let i = 0; i < this.shows.length; i++) {
        listStr += i + 1 + ') ' + this.shows[i].name + ' \n';
      }
      // let select = prompt('1) Select a Cartoon to view the Characters \n 2) Go Back \n -------------------------------- \n' + listStr );
      // if(select -1 <= this.shows.length) {
      // prompt('1) Add Character to ' + this.shows[select - 1].name + ' \n2) Select Cartoon to View Characters \n3) Delete Cartoon\n -------------------------------- \n' + listStr );
      let select = prompt(' 1) Select a Cartoon to view the Characters \n 2) Go Back \n -------------------------------- \n' + listStr);
      if(select - 1 <= this.shows.length) {
        this.cartoonSelected = select;
        return this.viewShow()
      } else {
        return this.showMainMenu();
      }
      // switch (select) {
      //   case '1':
      //     this.cartoonSelected = select;
      //     this.viewShow();
      //     break;
      //   case '2':
      //     this.cartoonSelected = select;
      //     this.deleteShow();
      //     break;
      //   // case '3':
      //   //   this.deleteShow();
      //   //   break;
      //   default:
      //     this.showMainMenu();
      // }
      // } else {
      //   return this.showMainMenu()
      // }
      // let select = prompt('1) Select Cartoon to Add Characters \n2) Select Cartoon to View Characters \n3) Delete Cartoon\n -------------------------------- \n' + listStr );
      // switch(select) {
      //   case '1':
      //     this.cartoonSelected = select;
      //     this.addCartoonChar();
      //     break;
      //   case '2':
      //     this.cartoonSelected = select;
      //     this.viewCharList();
      //     break;
      //   case '3':
      //     this.deleteShow();
      //     break;
      //   default:
      //     this.showMainMenu();
      // }
    } else {
      alert(`Please add a cartoon before viewing your list`)
    }
  }

viewShow() {  
  let select = prompt(this.shows[this.cartoonSelected - 1].name + ' selected \n1) Add Characters \n2) View Characters \n3) Delete Characters\n -------------------------------- \n');
  switch (select) {
    case '1':
      this.addCartoonChar();
      break;
    case '2':
      this.viewCharList();
      break;
    case '3':
      this.deleteShowChar();
      break;
    default:
      this.showMainMenu();
  }
}

addCartoonChar() {
  let char = prompt(`What Character would you like to add to ${this.shows[this.cartoonSelected - 1].name}`)
  this.shows[this.cartoonSelected - 1].addChar(new CartoonChar(char));
  alert(`${char} has successfully been added as a character to the ${this.shows[this.cartoonSelected - 1].name} list: ${this.shows[this.cartoonSelected - 1].charName.length}`);
}
viewCharList() {
  let listStr = '';
  if (this.shows.length != 0) {
    for (let i = 0; i < this.shows[this.cartoonSelected - 1].charName.length; i++) {
      listStr += i + 1 + ') ' + this.shows[this.cartoonSelected - 1].charName[i].name + ' \n';
    }
    let select = prompt('1) Add another Character \n2) Delete Character\n -------------------------------- \n' + listStr);
    switch (select) {
      case '1':
        this.addCartoonChar();
        break;
      case '2':
        this.deleteShowChar();
        break;
      default:
        this.showMainMenu();
    }

  } else {
    alert(`Please add a character before viewing list!`)
  }
}

}

let menu = new Menu();
menu.start();

