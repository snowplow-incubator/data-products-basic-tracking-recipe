import { FilterType, Todo } from "../../../types";

type FooterProps = {
  todos: Todo[];
  updateTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: FilterType;
  updateFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

function Footer({ todos, updateTodos, filter, updateFilter }: FooterProps) {
  function clearAllCompleted() {
    updateTodos((prev) => {
      return prev.filter((item) => !item.completed);
    });
  }

  function changeFilter(filterType: FilterType) {
    updateFilter(filterType);
  }

  return (
    <footer className="footer" hidden={todos.length < 1}>
      <span className="todo-count">
        <strong>{todos.filter((todo) => !todo.completed).length}</strong> item
        left
      </span>
      <ul className="filters">
        <li onClick={() => changeFilter("all")}>
          <button className={`${filter === "all" ? "selected" : ""}`}>
            All
          </button>
        </li>
        <li onClick={() => changeFilter("active")}>
          <button
            className={`${filter === "active" ? "selected" : ""}`}
          >
            Active
          </button>
        </li>
        <li onClick={() => changeFilter("completed")}>
          <button
            className={`${filter === "completed" ? "selected" : ""}`}
          >
            Completed
          </button>
        </li>
      </ul>
      <button
        hidden={!todos.find((todo) => todo.completed)}
        onClick={clearAllCompleted}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
