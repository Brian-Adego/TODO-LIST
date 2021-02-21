//Selector
const form = document.querySelector("form");
const todoInput = document.querySelector(".input");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  displayLists();
  todoInput.value = "";
});
filterOption.addEventListener("click", filterTodo);

//function
function displayLists() {
  const list = document.createElement("li");
  list.classList.add("list");
  list.innerHTML = `${todoInput.value}<span
  ><i class="fas fa-check"></i><i class="fas fa-trash"></i
></span>`;
  todoList.appendChild(list);
  saveLocalTodos(todoInput.value);

  var check = list.querySelector(".fa-check");
  var trash = list.querySelector(".fa-trash");
  check.addEventListener("click", () => {
    list.classList.add("check");
  });
  trash.addEventListener("click", () => {
    list.style.transform = "scale(0)";
    list.style.transition = "transform 450ms ease-in";
    window.addEventListener("transitionend", () => {
      list.remove();
    });
  });
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "All":
        todo.style.display = "flex";
        break;

      case "Completed":
        if (todo.classList.contains("check")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "Incomplete":
        if (!todo.classList.contains("check")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
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
