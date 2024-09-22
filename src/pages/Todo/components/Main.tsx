import { FilterType, Todo } from "../../../types";
import Item from "./Item";
import { trackRemoveTodoSpec } from "../../../tracking/snowplow";

type MainProps = {
  todos: Todo[];
  updateTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: FilterType;
};

function Main({ todos, updateTodos, filter }: MainProps) {
  function updateTodo(updatedItem: Todo) {
    if (updatedItem.value === "") {
      updateTodos((prev) => {
        return prev.filter((item) => item.id !== updatedItem.id);
      });
      trackRemoveTodoSpec({ action: "remove" })
      return;
    }
    updateTodos((prev) => {
      return prev.map((item) => {
        if (item.id === updatedItem.id) {
          return { ...item, ...updatedItem };
        }
        return item;
      });
    });
  }

  function toogleAll() {
    updateTodos((prev) => {
      const isAllCompleted = !prev.find((item) => !item.completed);
      if (isAllCompleted) {
        return prev.map((item) => {
          return { ...item, completed: false };
        });
      }
      return prev.map((item) => {
        return { ...item, completed: true };
      });
    });
  }

  return (
    <section className="main">
      <input
        id="toggle-all"
        onChange={toogleAll}
        className="toggle-all"
        type="checkbox"
      />
      <label
        className={`${todos.length < 1 ? "hidden" : ""}`}
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>
      <ul className="todo-list">
        {todos.map((todo) => {
          if (filter === "all")
            return <Item key={todo.id} item={todo} update={updateTodo} />;
          if (filter === "active" && !todo.completed)
            return <Item key={todo.id} item={todo} update={updateTodo} />;
          if (filter === "completed" && todo.completed)
            return <Item key={todo.id} item={todo} update={updateTodo} />;

          return "";
        })}
      </ul>
    </section>
  );
}

export default Main;
