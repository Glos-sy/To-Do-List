// Variable Declaration
const toDoInput = document.querySelector(".to-do-input");
const toDoButton = document.querySelector(".to-do-button");
const toDoList = document.querySelector(".to-do-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

// Functions
// a
function addToDo(e) {
  e.preventDefault();

  // Prevent adding an empty input
  if (toDoInput.value === "") return;

  // Creating element- div and giving it a class
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("to-do");

  //   Creating an li
  const newToDo = document.createElement("li");
  newToDo.innerText = toDoInput.value;
  newToDo.classList.add("to-do-item");
  toDoDiv.appendChild(newToDo);

  // Add to localstorage
  saveLocalTodos(toDoInput.value);

  //   Creating two buttons
  // check

  const completedButton = document.createElement("button");
  // completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.innerHTML = "\u2714";
  completedButton.classList.add("complete-btn");
  toDoDiv.appendChild(completedButton);

  // delete

  // DELETE
  const trashButton = document.createElement("button");
  // trashButton.innerHTML = `<i class="fas fa-xmark"></i>`;
  trashButton.innerHTML = "\u0058";
  trashButton.classList.add("trash-btn");
  toDoDiv.appendChild(trashButton);

  // Appending the toDoDiv to the toDoList
  toDoList.appendChild(toDoDiv);

  // Clears the inout field after one value has been logged
  toDoInput.value = "";
}

// b
function deleteCheck(e) {
  const item = e.target;
  // deleting the to-do logic
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodo(todo);
    todo.remove();
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// c
function filterTodo(e) {
  const toDos = toDoList.childNodes;
  toDos.forEach((name) => {
    switch (e.target.value) {
      case "all":
        name.style.display = "flex";
        break;

      case "done":
        if (name.classList.contains("completed")) {
          name.style.display = "flex";
        } else {
          name.style.display = "none";
        }
        break;

      case "undone":
        if (!name.classList.contains("completed")) {
          name.style.display = "flex";
        } else {
          name.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach(function (todo) {
    // Creating element- div and giving it a class
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("to-do");

    //   Creating an li
    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add("to-do-item");
    toDoDiv.appendChild(newToDo);

    //   Creating two buttons
    // check

    const completedButton = document.createElement("button");
    // completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.innerHTML = "\u2714";
    completedButton.classList.add("complete-btn");
    toDoDiv.appendChild(completedButton);

    // DELETE
    const trashButton = document.createElement("button");
    // trashButton.innerHTML = `<i class="fas fa-xmark"></i>`;
    trashButton.innerHTML = "\u0058";
    trashButton.classList.add("trash-btn");
    toDoDiv.appendChild(trashButton);

    // Appending the toDoDiv to the toDoList
    toDoList.appendChild(toDoDiv);
  });
}

function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
