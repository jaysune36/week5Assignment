//this function accept an array and runs through that array in a list using a for Loop
function makeList(arr) {
  let listStr = '';
  for (let i = 0; i < arr.length; i++) {
    listStr += i + 1 + ') ' + arr[i].name + ' \n';
  }
  return listStr;
}

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
    alert('Thank you, Good-Bye!');
  }

  showMainMenu() {
    return prompt(`
    Please select a Menu Option:
    0) Exit
    1) Add Show
    2) Delete Show
    3) View Show List
    `);
  }

  addShow() {
    let show = prompt(`
      What is the name of Cartoon you would like to add? 
      `);
    this.shows.push(new Cartoon(show));
  }

  deleteShow() {
    if (this.shows.length != 0) {
      let select = prompt('Please select a Cartoon to delete \n-------------------------------- \n' + makeList(this.shows));
      if(select - 1 < this.shows.length && select != '') {
      alert(`
    ${this.shows[select - 1].name} has successfully been deleted!
    `)
      this.shows.splice(select - 1, 1);
      } 
    } else {
      alert(`
      There are no Cartoon shows to delete.
      `)
    }
  }

  deleteShowChar() {
    let charactersSelected = this.shows[this.cartoonSelected - 1].charName;
    if (charactersSelected.length != 0) {
      let select = prompt('Please select a Character to delete \n-------------------------------- \n' + makeList(charactersSelected));
      if(select - 1 < charactersSelected.length && select != '') {
        console.log(charactersSelected[select])
      alert(`
    ${charactersSelected[select - 1].name} has successfully been deleted!
    `)
      charactersSelected.splice(select - 1, 1);
      }
    } else {
      alert(`
      There are no characters to delete from this cartoon.
      `)
    }
  }

  viewShowList() {
    if (this.shows.length != 0) {
      let select = prompt(' Select a Cartoon to view the Characters \n -------------------------------- \n' + makeList(this.shows));
      if (select - 1 < this.shows.length && select !== '') {
        this.cartoonSelected = select;
        return this.showDetails();
      }
    } else {
      alert(`Please add a cartoon before viewing your list`)
    }
  }

  showDetails() {
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
    alert(`${char} has successfully been added as a character to the ${this.shows[this.cartoonSelected - 1].name} list`);
  }
  viewCharList() {
    if (this.shows[this.cartoonSelected - 1].charName.length != 0) {
      let select = prompt('1) Add another Character \n2) Delete Character \n -------------------------------- \n' + makeList(this.shows[this.cartoonSelected - 1].charName));
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

