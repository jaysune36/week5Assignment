//this function accept an array and runs through that array in a list using a for Loop
function makeList(arr) {
  let listStr = '';
  for (let i = 0; i < arr.length; i++) {
    listStr += i + 1 + ') ' + arr[i].name + ' \n';
  }
  return listStr;
}

// this cartoon class will create all my cartoon shows. It will add the cartoon name and then create an empty array for any character names that we should add to that array. 
class Cartoon {
  constructor(name) {
    this.name = name;
    this.charName = [];
  }
  // the addChar function pushes a new character to the Cartoon list. It will use a condition statement that make sure that the char argument is a instanceof the CartoonChar class. The instanceof operator makes sure that the char argument uses the new CartoonChar class as an argument and not just put into the class using a string
  addChar(char) {
    if (char instanceof CartoonChar) {
      this.charName.push(char);
    } else {
      throw new Error(`You can only add an instace of CartoonChar. Argument is not a charcter: ${char}.`)
    }
  }
  // the describe function will return a string that will display the name of the show and how many characters are on that show using the lenght property of the charName array.
  describe() {
    return `${this.name} has ${this.charName.length} character on it's show.`
  }
}

// the CartoonChar class creates a new character and has a describe function to to display the name of the character when called.
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

// the Menu class will show the prompts and display them as a menu. 
class Menu {
  constructor() {
    this.shows = [];
    this.cartoonSelected = null;
  }

  // the start method will initalize the startMainMenu mehtod at the time the browser starts. It will then display the startMainMenu prompt to allow the user to enter what input they would like to use to start. If the user decides to leave an alert will display 'Thank you, Good-Bye!'
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

  // the showMainMenu method return a prompt to be displayed when called.
  showMainMenu() {
    return prompt(`
    Please select a Menu Option:
    0) Exit
    1) Add Show
    2) Delete Show
    3) View Show List
    `);
  }

  // the addShow method will display a prompt to ask the user what Cartoon would like to add and then push that input intot the shows using the new Cartoon class
  addShow() {
    let show = prompt(`
      What is the name of Cartoon you would like to add? 
      `);
    this.shows.push(new Cartoon(show));
  }

  // the deleteShow function will display a prompt to ask the user what cartoon show do they want deleted. Once the user selects a input to select a cartoon show an alert will display that the cartoon has been deleted and the cartoon will be removed using the splice method on the array. If there are no shows in the array and alert will display to add a show before delete anything.
  deleteShow() {
    if (this.shows.length != 0) {
      let select = prompt('Please select a Cartoon to delete \n-------------------------------- \n' + makeList(this.shows));
      if (select - 1 < this.shows.length && select != '') {
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

  // the deleteShowChar function will use a condition statement if there are any characters within the the selected cartoon. Using the selected cartoon it will select that specific cartoons character list using the this.cartoonSelected variable. Once that character list is grabbed it will use the makeList function and display those characters and if the user select an input it will alert and then delete about that characters removal. If there are no characters within the array of the selected cartoon a message will display that there are no characters to delete.  
  deleteShowChar() {
    let charactersSelected = this.shows[this.cartoonSelected - 1].charName;
    if (charactersSelected.length != 0) {
      let select = prompt('Please select a Character to delete \n-------------------------------- \n' + makeList(charactersSelected));
      if (select - 1 < charactersSelected.length && select != '') {
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

  // the viewShowList function will use a condtion statement to check if there are any shows within the shows array, if the array is empty and alert will pop up to display to add a show first. If the array is true then using the makeList function a new prompt will display to select a cartoon to view the characters within the selected cartoon
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

  // this function will display the selected cartoons name to indicate that, that cartoon has been selected and a new prompt window to show if the user would like to add, delete, or view the characters within the selected show. After the user as selected a valid input it will there run that function, if not then the user will be returned to the main menu
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

  // this function adds a character to the selected cartoon. Once prompted the user will then type what the name of the character it would like to add to the selected show. After typing in a input an alert will be displayed to show that the input given was added to the selected cartoon
  addCartoonChar() {
    let char = prompt(`What Character would you like to add to ${this.shows[this.cartoonSelected - 1].name}`)
    this.shows[this.cartoonSelected - 1].addChar(new CartoonChar(char));
    alert(`${char} has successfully been added as a character to the ${this.shows[this.cartoonSelected - 1].name} list`);
  }
  // the viewCharList fuction is similar to the viewShowList function and will use the makeList function to display the selected cartoons character list. Slightly different than the viewShowList function is a new prompt will display if the user would like to add of delete a charactr, if not then will be return to the main menu
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

//this variable creates the menu class
let menu = new Menu();
//the menu class is started using the start method. After calling this method this will initalize the main menu prompt
menu.start();

