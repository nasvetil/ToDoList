import React, { useEffect } from 'react';

import Context from './context';
import TodoList from './Todo/TodoList'
import AddTodo from './Todo/AddTodo'

import Container from '@material-ui/core/Container'

function App() {
  const [todos, setTodos]= React.useState(() => {
    const todosLocalStorage = JSON.parse(localStorage.getItem('todos'));
    if (todosLocalStorage) {
      return todosLocalStorage;
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  function toggleIsImportantTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.isImportant = !todo.isImportant
        }
        return todo;
      })
    )
  }

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo=> todo.id !== id))
  }

  function addTodo(title, isImportant) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
          isImportant: isImportant
        }
      ])
    )
  }

  return (
    <Context.Provider value={{removeTodo: removeTodo}}>
      <Container maxWidth="sm">
        <h1>ToDoList</h1>

        <AddTodo onCreate={addTodo}/>

        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} onToggleIsImportantTodo={toggleIsImportantTodo}/>
        ) : (
          <p>Add your first task</p>
        )
        }
      </Container>
    </Context.Provider>
  );
}

export default App;
