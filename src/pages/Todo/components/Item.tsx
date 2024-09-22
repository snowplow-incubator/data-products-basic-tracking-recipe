import { useState } from "react";
import { Todo } from "../../../types";
import { createTodo, trackCompleteTodoSpec } from "../../../tracking/snowplow";

type ItemProps = {
  item: Todo;
  update: (item: Todo) => void;
};

function Item({ item, update }: ItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { value, completed } = item;

  let className = isEditing ? "editing" : "";
  className = completed ? className + " completed" : className;

  function editTodo() {
    setIsEditing(true);
    setInputValue(value);
  }

  function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === "Escape") {
      setIsEditing(false);
      update({ ...item, value: inputValue });
    }
  }

  function onBlur() {
    setIsEditing(false);
    update({ ...item, value: inputValue });
  }

  function onRemove() {
    update({ ...item, value: "" });
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function onChangeForCompleted() {
    if (!item.completed) {
      trackCompleteTodoSpec({
        action: "complete",
        context: [createTodo({ title: item.value })],
      });
    }
    update({ ...item, completed: !item.completed });
  }

  return (
    <li className={className}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={onChangeForCompleted}
          checked={completed}
        />
        <label onDoubleClick={editTodo}>{value}</label>
        <button className="destroy" onClick={onRemove}></button>
      </div>
      <input
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        onChange={onChange}
        className="edit"
        value={inputValue}
      />
    </li>
  );
}

export default Item;
