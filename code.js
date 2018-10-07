const addTodoText = document.querySelector('input.addTodoText');
const addTodoButton = document.querySelector('button.addTodoButton');
const radioButtons = document.getElementsByName('priority');
const radioButtonsArray = Array.from(radioButtons);

function generateID() {
  let S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return "ID"+(S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}





class Entry {
  constructor(what, priority = 1) {
    this.content = what;
    this.priority = priority;
    this.id = generateID()
  }

  get htmlEntry() {
    return `<p>${this.content} ${this.priority}<button id=${this.id} onclick="main.books[${main._focusedBook}].delete('${this.id}')"</button></p>`
  }

  appendTodoBox(){
    var containerDiv = document.createElement("div");
    containerDiv.innerHTML = this.htmlEntry;
    todoBox.appendChild(containerDiv);
  }
}

class Book {
  constructor(name="Main book") {
    this.name = name;

      this.entries = []
    }


  add(entry) {
    this.entries.push(entry)
  }

  delete(id){
   let found = this.entries.findIndex(element=>element.id == id);
   console.log(found)
   this.entries.splice(found,1);
   this.draw2()
   main.save()

  }

log(){
  console.clear();
  this.entries.forEach(entry=>console.log(entry.content,entry.priority))
}

draw2() {
  this.clearBox();
  this.entries.forEach(entry=>{entry.appendTodoBox()})
}

  clearBox() {
  todoBox.innerHTML = "";
}
}

addTodoButton.addEventListener("click", () => {
  const priorityValue = radioButtonsArray.find(element => element.checked).value;
  main.books[main._focusedBook].add(new Entry(addTodoText.value, priorityValue));
  //book.add(entry);

  main.clearBox();
  main.books[main._focusedBook].draw2();
  main.save();
main.books[main._focusedBook].log()
});

class Main {
  constructor() {
    if (localStorage.getItem('stringData')) {
      this.books = JSON.parse(localStorage.getItem('stringData'));

// this code sets the prototype of the raw data (probably not the most efficient way)

      this.books.forEach((object)=>{Object.setPrototypeOf(object,Book.prototype);
        object.entries.forEach((object)=>{Object.setPrototypeOf(object,Entry.prototype)})});
    } else {
      this.books = [new Book("Main")]
    }
    this._focusedBook  = 0;//for the moment being lets default focused to las item
  }
  addNewBook() {
    this.books.push(new Book("change Me")); //if there is 1 book next index will be "1"
    this.clearBox();
    this._focusedBook = this.books.length - 1;
    this.books[this._focusedBook].draw2()

  }
  clearBox() {
    todoBox.innerHTML = "";

  }

  set focusedBook(index){
    this._focusedBook = index
  }

  save() {
    let data = JSON.stringify(this.books);
    localStorage.setItem('stringData', data);

  }
  goNextBook(){

  }
  goPrevBook(){

  }
}



const main = new Main();
  main._focusedBook = main.books.length - 1;
  main.clearBox();
  main.books[main._focusedBook].draw2();
  main.books[main._focusedBook].log();
