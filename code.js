const addTodoText = document.querySelector('input.addTodoText');
const addTodoButton = document.querySelector('button.addTodoButton');
const radioButtons = document.getElementsByName('priority');
const radioButtonsArray = Array.from(radioButtons);
const todoBox = document.querySelector('#todoBox');
const bookName = document.querySelector('#bookName');
const bookNameInput = document.querySelector('#bookNameInput');
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');

function generateID() {
  let S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return `ID${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}


class Entry {
  constructor(what, priority = 1) {
    this.content = what;
    this.priority = priority;
    this.id = generateID();
  }

  get htmlEntry() {
    return `<p>${this.content} ${this.priority} <i class="fas fa-minus-circle" id=${this.id} onclick="main.books[${main._focusedBook}].delete('${this.id}')"</i></button></p>`
  }

  appendTodoBox() {
    const containerDiv = document.createElement('div');
    containerDiv.innerHTML = this.htmlEntry;
    todoBox.appendChild(containerDiv);
  }
}

class Book {
  constructor(name = 'Main book') {
    this.name = name;
    this.entries = [];
  }

  get htmlName() {
    return `<p>${this.name}</p>`;
  }

  drawName() {
    bookName.innerHTML = this.htmlName;
  }

  add(entry) {
    this.entries.push(entry);
  }

  delete(id) {
    const found = this.entries.findIndex(element => element.id === id);
    // console.log(found)
    this.entries.splice(found, 1);
    this.draw2();
    main.save();
  }

  draw2() {
    this.clearBox();
    this.drawName();
  this.entries.forEach(entry=>{entry.appendTodoBox()})
}

  clearBox() {
  todoBox.innerHTML = "";
}
}


class Main {
  constructor() {
    if (localStorage.getItem('stringData')) {
      this.books = JSON.parse(localStorage.getItem('stringData'));

      // this code sets the prototype of the raw data (probably not the most efficient way)

      this.books.forEach((object) => {
        Object.setPrototypeOf(object, Book.prototype);
        object.entries.forEach((object) => { Object.setPrototypeOf(object, Entry.prototype); });
      });
    } else {
      this.books = [new Book('Main')];
    }
    this._focusedBook  = 0;// for the moment being lets default focused to las item
  }

  addNewBook() {
    this.books.push(new Book('change Me')); // if there is 1 book next index will be "1"
    this.clearBox();
    this._focusedBook = this.books.length - 1;
    this.books[this._focusedBook].draw2();

  }

  clearBox() {
    todoBox.innerHTML = "";
  }

  // set focusedBook(index) {
  //   this._focusedBook = index;
  // }

  // get focusedBook() {
  //   return this._focusedBook;
  // }

  save() {
    const data = JSON.stringify(this.books);
    localStorage.setItem('stringData', data);
  }
  // goNextBook() {
  // }
  // goPrevBook(){

  // }
}

const main = new Main();
main._focusedBook = 0;
main.clearBox();
main.books[main._focusedBook].draw2();


addTodoButton.addEventListener('click', () => {
  const priorityValue = radioButtonsArray.find(element => element.checked).value;
  main.books[main._focusedBook].add(new Entry(addTodoText.value, priorityValue));
  main.clearBox();
  main.books[main._focusedBook].draw2();
  main.save();
  addTodoText.value = "";
});
nextButton.addEventListener('click', () => { 
  if (main._focusedBook === main.books.length - 1) {
    main.addNewBook();
    main.save();
  } else {
    main._focusedBook++;
    main.books[main._focusedBook].draw2();
  }
});

prevButton.addEventListener('click', () => { 
  if (main._focusedBook > 0)
  {
    main._focusedBook--;
    main.books[main._focusedBook].draw2();
  }
});

bookName.addEventListener('click', () => {
  bookName.innerHTML = "";
  const input = document.createElement('input');
 input.type = "text";
 bookNameInput.appendChild(input);
 input.addEventListener('keydown', (e) => {
   if (e.key === 'Enter') {
     main.books[main._focusedBook].name = input.value;
     main.save();
     main.books[main._focusedBook].draw2();
     bookNameInput.innerHTML = "";
   }
 });
 


  
})