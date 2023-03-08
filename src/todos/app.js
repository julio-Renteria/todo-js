import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos, renderPending } from "./user-cases";

const ElementIDs = {
  ClearCompleteButton: ".clear-completed",
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  TodoFilters: ".filtro",
  pendingCountLabel: "#pending-count",
};

/**
 * @param {string} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPending(ElementIDs.pendingCountLabel);
  };

  //cuano la function App() se llama
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  //Referencias HTML

  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);

  const todoLisUL = document.querySelector(ElementIDs.TodoList);

  const clearAllCompleteButton = document.querySelector(
    ElementIDs.ClearCompleteButton
  );

  const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

  //Listeners

  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = "";
  });

  todoLisUL.addEventListener("click", (event) => {
    const elementIdP = event.target.closest("[data-id]");
    todoStore.toggleTodo(elementIdP.getAttribute("data-id"));
    displayTodos();
  });

  todoLisUL.addEventListener("click", (event) => {
    const isDestroyElement = event.target.className === "destroy";
    const elementIdP = event.target.closest("[data-id]");
    if (!elementIdP || !isDestroyElement) return;

    todoStore.deleteTodo(elementIdP.getAttribute("data-id"));
    displayTodos();
  });

  clearAllCompleteButton.addEventListener("click", (event) => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersLIs.forEach((element) => {
    element.addEventListener("click", (element) => {
      filtersLIs.forEach((el) => el.classList.remove("selected"));
      element.target.classList.add("selected");

      switch (element.target.text) {
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;

        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;

        case "Completados":
          todoStore.setFilter(Filters.Completed);
          break;
      }
      displayTodos();
    });
  });
};
