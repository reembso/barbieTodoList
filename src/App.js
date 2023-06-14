import React, { useCallback, useState, useMemo } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const changeHandle = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const clickHandle = () => {
    const newTodo = {
      title: value,
      isCompleted: false,
      id: Date.now(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setValue("");
  };

  const myTodos = useMemo(() => {
    return todos;
  }, [todos]);

  const deleteHandle = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  };

  const isCompetedTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const completedTodosCount = useMemo(() => {
    return todos.filter((todo) => todo.isCompleted).length;
  }, [todos]);

  return (
    <div className="App">
      <input onChange={changeHandle} value={value} />
      <button onClick={clickHandle}> add </button>
      <h1>ВСЕГО ЗАДАЧ  -  {myTodos.length}</h1>
      <h1>ВЫПОЛНЕННЫХ ЗАДАЧ  -  {completedTodosCount}</h1>
      <ul>
        {myTodos?.length ? (
          <>
            {myTodos.map((todo) => (
              <li key={todo.id}>
                <span> {todo.title} </span>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => isCompetedTodo(todo.id)}
                />
                <button onClick={() => deleteHandle(todo.id)}> delete </button>
              </li>
            ))}
          </>
        ) : (
          <>empty!</>
        )}
      </ul>
    </div>
  );
}

export default App;
