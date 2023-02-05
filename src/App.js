import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) return JSON.parse(storedTodos);
    return [
      { text: 'Eine tolle App Entwickeln', isCompleted: false },
      { text: 'Ein leckeres Eis essen', isCompleted: false },
      { text: 'Ins Fitnessstudio gehen', isCompleted: false },
    ];
  });

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const completedTasks = todos.filter(todo => todo.isCompleted === true);

  return (
    <div className="app">
      <h1>My To-Do List</h1>
      <div>
        <div className="completed-tasks">
          <h3>Erledigte Aufgaben: ({completedTasks.length})</h3>
          {completedTasks.map((task, index) => (
            <div key={index} className="completed-task"><FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontWeight: 'bold', paddingRight: '7px' }} />
              {task.text}</div>
          ))}
        </div>
      </div>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <div key={index} className={`todo ${todo.isCompleted ? 'completed' : ''}`}>
            <div className="todo-text" onClick={() => completeTodo(index)}>
              {todo.isCompleted ?
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontWeight: 'bold', paddingRight: '7px' }} />
                : null
              }
              {todo.text}
            </div>
            <div className="delete-todo" onClick={() => deleteTodo(index)}>
              <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontWeight: 'bold', paddingLeft: '7px' }} />
            </div>
          </div>
        ))}
      </div>
      <div className="todo-form">
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}


function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Aufgabe hinzufügen"
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </form>
  );
}

export default App;
