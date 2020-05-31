import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: "center"
  }
}));

function TodoList(props) {
  const classes = useStyles();

  if (!props.todosCount) {
    return (<p className={classes.textCenter}>Please, add your first task</p>);
  }

  if (!props.todos.length) {
    return (<p className={classes.textCenter}>There are no such tasks</p>);
  }

  return (
    <List>
    {
      props.todos.map((todo, index) => {
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
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TodoList;