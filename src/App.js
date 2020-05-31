import React, { useEffect } from 'react';

import Context from './context';
import TodoList from './Todo/TodoList';
import AddTodo from './Todo/AddTodo';

import Container from '@material-ui/core/Container';

function App() {
  const [todos, setTodos] = React.useState(() => {
    const todosLocalStorage = JSON.parse(localStorage.getItem('todos'));
    if (todosLocalStorage) {
      return todosLocalStorage;
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function editTodo(id, key, value) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo[key] = value;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
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
    <Context.Provider value={{editTodo: editTodo, removeTodo: removeTodo}}>
      <Container maxWidth="sm">
        <h1>ToDoList</h1>
        <AddTodo onCreate={addTodo}/>
        <TodoList todos={todos}/>
      </Container>
    </Context.Provider>
  );
}

export default App;
