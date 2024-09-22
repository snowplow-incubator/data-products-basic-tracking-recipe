import { useState } from "react";
import { v4 } from "uuid";
import { Todo } from "../../../types";
import { createTodo, trackAddTodoSpec } from "../../../tracking/snowplow";

type HeaderProps = {
  addTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
};

function Header({ addTodo }: HeaderProps) {
  const [value, setValue] = useState("");

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function addItem(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && value) {
      addTodo((preItems) => {
        return [
          {
            id: v4(),
            value,
            completed: false,
          },
          ...preItems,
        ];
      });
      trackAddTodoSpec({
        action: "add",
        context: [createTodo({ title: value })],
      });
      setValue("");
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        value={value}
        onChange={onChange}
        onKeyUp={addItem}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </header>
  );
}

export default Header;
