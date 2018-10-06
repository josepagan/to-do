const addTodoText = document.querySelector('input.addTodoText');
const addTodoButton = document.querySelector('button.addTodoButton');
const radioButtons = document.getElementsByName('priority')
const radioButtonsArray = Array.from(radioButtons) //to use array methods we need conversion to Array
const todoBox = document.getElementById('todoBox');

function generateID() {
  var S4 = function() {
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

//   draw() {
//     this.clearBox();
//     let htmlsection
//     let element = document.createElement('div');
//     this.entries.forEach(entry => {htmlsection += entry.htmlEntry})
//     element.innerHTML = htmlsection;
//     return todoBox.appendChild(element)
// }
draw2(){
  this.clearBox();
  this.entries.forEach(entry=>{entry.appendTodoBox()})
}

  clearBox() {
  todoBox.innerHTML = "";
}

}
// const book = new Book("stringData");
// book.draw();




addTodoButton.addEventListener("click", () => {
  let priorityValue = radioButtonsArray.find(element => element.checked).value;
  main.books[main._focusedBook].add(new Entry(addTodoText.value, priorityValue));
  //book.add(entry);

  main.clearBox();
  main.books[main._focusedBook].draw2();
  main.save();
main.books[main._focusedBook].log()



})

//
// function keygeneration(){
//     let counter = 0
//     return ()=>{counter++;
//                 return "keyString"+counter}}
//
//
//
// }
//
// //each time key() it will return a string stringdata1,2,etc
// function generateId(prefix, start) {
//     var i = start || 0;
//     return function() {
//         return prefix + i++;
//     }
// }
// let key = generateId(stringData,1);
//
//
//


class Main {
  constructor() {





  if (localStorage.getItem('stringData')) {
  this.books = JSON.parse(localStorage.getItem('stringData'));

//this code sets the prototype of the raw data (probably not the most efficient way)

  this.books.forEach(object=>{Object.setPrototypeOf(object,Book.prototype);
                            object.entries.forEach(object=>{Object.setPrototypeOf(object,Entry.prototype)})});



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




  const main = new Main;
  main._focusedBook = main.books.length - 1;
  main.clearBox();
  main.books[this._focusedBook].draw2();// 
  main.books[this._focusedBook].log()








// OLD WAY!!! IT WORKS, BUT IT IS FUN TO TRY NEW WAYS
//
// function loader(){
//
//  if (localStorage.getItem("stringData")) {
//      let data = localStorage.getItem("stringData")
//      return JSON.parse(data)
//  } else {return {entries:[]}}
// }
//
// const main = loader();
//


//
// addTodoButton.addEventListener("click",(event)=>{
//
//     let priorityValue = radioButtonsArray.find(element=>element.checked).value;
//     let entry = new Entry(addTodoText.value,priorityValue);
//
//     main.entries.push(entry)
//     refreshEntries()
// } )
