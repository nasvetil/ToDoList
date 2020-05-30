import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import Context from '../context';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FlagIcon from '@material-ui/icons/Flag';

const useStyles = makeStyles((theme) => ({
  isImportant: {
    backgroundColor: "lightblue"
  }
}));

function TodoItem({ todo, index }) {
  const { removeTodo, editTodo } = useContext(Context);
  const [isImportant, setIsImportant] = React.useState(todo.isImportant);
  const [isChecked, setIsChecked] = React.useState(todo.completed);

  const classes = useStyles();

  const handleToggleChecked = () => () => {
    editTodo(todo.id, 'completed', !isChecked)
    setIsChecked(!isChecked);
  };

  const handleToggleIsImportant = () => () => {
    editTodo(todo.id, 'isImportant', !isImportant)
    setIsImportant(!isImportant);
  };

  return (
    <ListItem
      key={index}
      role={undefined}
      dense
      button
      onClick={handleToggleChecked(index)}
      className={isImportant ? classes.isImportant : null}
    >
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
        primary={<span className={isChecked ? 'list__item--completed' : null}>{index + 1}. {todo.title}</span>}
      />

      <ListItemSecondaryAction>
        <IconButton
          aria-label="is-important"
          onClick={handleToggleIsImportant(index)}
          color={isImportant ? ("primary") : ("default")}
        >
          <FlagIcon />
        </IconButton>
        <IconButton
          edge="end"
          onClick={() => removeTodo(todo.id)}
          aria-label="delete"
        >
          <DeleteIcon color="error"/>
        </IconButton>
      </ListItemSecondaryAction>

    </ListItem>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
}

export default TodoItem;
