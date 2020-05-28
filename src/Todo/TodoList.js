import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

function TodoList(props) {
  return (
    <Paper variant="outlined" className="list">
      <List>
        {
          props.todos.map((todo, index) => {
            return (
              <TodoItem 
                todo={todo} 
                key={todo.id} 
                index={index} 
                onChange={props.onToggle}
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
  onToggle: PropTypes.func.isRequired
}

export default TodoList;