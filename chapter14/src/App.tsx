import { useState } from "react";
import { Todo } from "./todo.model";
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    console.log(text);
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text: text },
    ]);
  };

  const deleteTodoHandler = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };
  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={deleteTodoHandler} />
    </div>
  );
}

export default App;
