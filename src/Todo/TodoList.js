import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import Context from '../context';
import TodoItem from './TodoItem';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: "center"
  },
  blockCenter: {
    display: "flex",
    justifyContent: "center"
  }
}));

function TodoList(props) {
  const { removeCompletedTodos } = useContext(Context);
  const classes = useStyles();

  if (!props.todosCount) {
    return (<p className={classes.textCenter}>Please, add your first task</p>);
  }

  if (!props.todos.length) {
    return (
      <p className={classes.textCenter}>There are no such tasks</p>
    );
  }

  return (
    <React.Fragment>
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
      {props.todoCategory === "completed" ? (
        <div className={classes.blockCenter}>
          <Button onClick={removeCompletedTodos}>Delete completed tasks</Button>
        </div>
      ) : null}
    </React.Fragment>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  todosCount: PropTypes.number.isRequired,
  todoCategory: PropTypes.string.isRequired
}

export default TodoList;