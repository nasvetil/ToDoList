import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';

function TodoList(props) {
  const [todoCategory, setTodoCategory] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTodoCategory(newValue);
  };

  const todoFilter = (todos) => {
    if (todoCategory === 0) {
      return todos;
    } else if (todoCategory === 1) {
      return todos.filter((item) => item.completed === false);
    } else if (todoCategory === 2) {
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
          <Tab label="All" />
          <Tab label="Active" />
          <Tab label="Сompleted" />
        </Tabs>
      </AppBar>
      <List>
        {
          todoFilter(props.todos).map((todo, index) => {
            return (
              <TodoItem 
                todo={todo} 
                key={todo.id} 
                index={index} 
              />
            )
          })
        }
      </List>
    </Paper>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TodoList;