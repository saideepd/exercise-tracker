import React from 'react'
import './ExerciseLog.css';
import { Button, Paper, TextField } from '@mui/material';
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'red',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#0026ca',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#7a7cff',
      border: '2px solid #7a7cff',
      backgroundColor: 'white'
    },
    '&:hover fieldset': {
      borderColor: '#304ffe',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0026ca',
    },
  },
});

const ColorButton = styled(Button)({
  backgroundColor: '#304fff',
  '&:hover': {
    backgroundColor: '#0026ca'
  }
});

const ExerciseLog = () => {
  return (
    <div className="exercise-component">
      <Paper
        elevation={3}
        className="exercise-paper"
        style={{ backgroundColor: '#fff9c4' }}
      >
        <h3>Add exercises</h3>
        <p className="endpoint exercise-endpoint">POST /api/users/:_id/exercises</p>
        <CssTextField
          required
          id="outlined-required"
          label="userid"
          name="userid"
          placeholder=":_id"
          className="user-input"
          size="small"
          margin="dense"
        />
        <CssTextField
          required
          id="outlined-required"
          label="description"
          name="description"
          placeholder="description"
          className="user-input"
          size="small"
          margin="dense"
        />
        <CssTextField
          required
          id="outlined-required"
          label="duration"
          name="duration"
          placeholder="duration* (mins)"
          className="user-input"
          size="small"
          margin="dense"
        />
        <CssTextField
          required
          id="outlined-required"
          label="date"
          name="date"
          placeholder="date (yyyy-mm-dd)"
          className="user-input"
          size="small"
          margin="dense"
        />
        <CssTextField
          required
          id="outlined-required"
          label="Username"
          name="username"
          placeholder="username"
          className="user-input"
          size="small"
          margin="dense"
        />
        <ColorButton
          variant="contained"
          id="create-exerciselog-btn"
          color="primary"
        >
          Submit
        </ColorButton>
      </Paper>
    </div>
  )
}

export default ExerciseLog
