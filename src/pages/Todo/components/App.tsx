import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { FilterType, Todo } from "../../../types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  return (
    <section className="todoapp">
      <Header addTodo={setTodos} />
      <Main todos={todos} updateTodos={setTodos} filter={filter} />
      <Footer
        todos={todos}
        updateTodos={setTodos}
        filter={filter}
        updateFilter={setFilter}
      />
    </section>
  );
}

export default App;
