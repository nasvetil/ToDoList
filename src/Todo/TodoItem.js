import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import Context from '../context';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context);
  const [checked, setChecked] = React.useState([0]);
  const classes = [];

  const handleToggle = (value) => () => {
    onChange(todo.id);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  if (todo.completed) {
    classes.push('list__item--completed');
  }

  return (
    <ListItem
      key={index}
      role={undefined}
      dense
      button
      onClick={handleToggle(index)}>

      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.completed}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': `checkbox-list-label-${index}` }}
        />
      </ListItemIcon>

      <ListItemText
        id={`checkbox-list-label-${index}`}
        primary={<span className={classes.join(' ')}>{index + 1}. {todo.title}</span>}
      />

      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={() => removeTodo(todo.id)} aria-label="delete">
          <DeleteIcon color="error"/>
        </IconButton>
      </ListItemSecondaryAction>

    </ListItem>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

export default TodoItem;
