import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  }
}));

function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue)

  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(''),
    value: () => value
  }
}

function AddTodo({ onCreate }) {
  const input = useInputValue('');

  function submitHandler(event) {
    event.preventDefault()

    if (input.value().trim()) {
      onCreate(input.value())
      input.clear()
    }
  }

  const classes = useStyles();

  return (
    <Paper
      variant="outlined" 
      component="form" 
      className="add-task-block" 
      onSubmit={submitHandler}>

      <InputBase
        {...input.bind}
        className={classes.input}
        placeholder="Your task..."
        inputProps={{ 'aria-label': 'add-task' }}
      />

      {
        input.value().trim() ? (
          <IconButton
            type="submit" 
            className=".add-task-block__icon-button" 
            aria-label="add-task-button">
            <AddIcon />
          </IconButton>
        ) : null
      }

    </Paper>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired
}

export default AddTodo;
