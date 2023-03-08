import todoStore, { Filters } from "../../store/todo.store";

let elementPending;

/**
 *
 * @param {String} elementId
 */
export const renderPending = (elementId) => {
  if (!elementPending) elementPending = document.querySelector(elementId);

  if (!elementPending) throw new Error("Element ${elementId} not found");

  elementPending.innerHTML = todoStore.getTodos(Filters.Pending).length;
};
