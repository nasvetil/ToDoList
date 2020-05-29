import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import Context from '../context';

import { makeStyles } from '@material-ui/styles';
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

function TodoItem({ todo, index, onToggle, onToggleIsImportantTodo }) {
  const { removeTodo } = useContext(Context);
  const [checked, setChecked] = React.useState([0]);
  const [isImportant, setIsImportant] = React.useState(todo.isImportant);
  const classes = useStyles();
  const classesText = [];

  const handleToggle = (value) => () => {
    onToggle(todo.id);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleToggleIsImportant = () => () => {
    onToggleIsImportantTodo(todo.id);
    setIsImportant(!isImportant);
  };

  if (todo.completed) {
    classesText.push('list__item--completed');
  }

  return (
    <ListItem
      key={index}
      role={undefined}
      dense
      button
      onClick={handleToggle(index)}
      className={isImportant ? classes.isImportant : null}>

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
        primary={<span className={classesText.join(' ')}>{index + 1}. {todo.title}</span>}
      />

      <ListItemSecondaryAction>
        <IconButton
          aria-label="is-important"
          onClick={handleToggleIsImportant(index)}
          color={isImportant ? ("primary") : ("action")}>
          <FlagIcon />
        </IconButton>
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
  onToggle: PropTypes.func.isRequired,
  onToggleIsImportantTodo: PropTypes.func.isRequired
}

export default TodoItem;
