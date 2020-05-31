import React from 'react';
import PropTypes from 'prop-types';

import TodoList from './TodoList';

import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TodoBlock(props) {
  const [todoCategory, setTodoCategory] = React.useState("all");

  const handleChange = (event, newValue) => {
    setTodoCategory(newValue);
  };

  const todoFilter = (todos) => {
    if (todoCategory === "all") {
      return todos;
    } else if (todoCategory === "active") {
      return todos.filter((item) => item.completed === false);
    } else if (todoCategory === "completed") {
      return todos.filter((item) => item.completed);
    } else {
      return [];
    }
  };

  return (
    <Paper variant="outlined" className="list">
      <AppBar elevation={0} position="static" color="default">
        <Tabs
          value={todoCategory}
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab
            label="All"
            value="all"
          />
          <Tab
            label="Active"
            disabled={props.todos.length ? false : true}
            value="active"
          />
          <Tab
            label="Сompleted"
            disabled={props.todos.length ? false : true}
            value="completed"
          />
        </Tabs>
      </AppBar>
      <TodoList 
        todos={todoFilter(props.todos)} 
        todosCount={props.todos.length} 
        todoCategory={todoCategory}
      />
    </Paper>
  );
}

TodoBlock.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TodoBlock;