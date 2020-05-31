import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: "center"
  }
}));

function TodoList(props) {
  const [todoCategory, setTodoCategory] = React.useState(0);
  const classes = useStyles();

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
          <Tab
            label="Active"
            disabled={props.todos.length ? false : true}
          />
          <Tab
            label="Сompleted"
            disabled={props.todos.length ? false : true}
          />
        </Tabs>
      </AppBar>
      {
        props.todos.length ? (
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
        ) : (
          <p className={classes.textCenter}>Please, add your first task</p>
        )
      }

    </Paper>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TodoList;