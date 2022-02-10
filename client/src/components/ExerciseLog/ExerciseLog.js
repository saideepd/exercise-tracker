import React from 'react'
import './ExerciseLog.css';
import { Button, Paper, TextField } from '@mui/material';
import { styled } from "@mui/material/styles";
import { currentUsername, isSubmitted } from '../User/User';

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
      border: '2px solid #7a7cff'
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

const ExerciseLog = ({formData}) => {
  return (
    <div className="exercise-component">
      <Paper
        elevation={3}
        className="exercise-paper"
        style={{ backgroundColor: '#fff9c4', paddingTop: '0.5em' }}
      >
        <h3>Add exercises</h3>
        <p className="endpoint exercise-endpoint">POST /api/users/:_id/exercises</p>
        <CssTextField
          required
          id="outlined-required"
          label="User Id"
          name="UserId"
          placeholder=":_id"
          className="user-input"
          size="small"
          margin="dense"
        />
        <CssTextField
          required
          id="outlined-required"
          label="Description"
          name="Description"
          placeholder="Description"
          className="user-input"
          size="small"
          margin="dense"
        />
        <CssTextField
          required
          id="outlined-required"
          label="Duration"
          name="Duration"
          placeholder="Duration (mins.)"
          className="user-input"
          size="small"
          margin="dense"
        />
        <CssTextField
          required
          id="outlined-required"
          label="Date"
          name="Date"
          placeholder="Date (yyyy-mm-dd)"
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
        {isSubmitted && 
          console.log(`Exercise currentUsername: ${JSON.stringify(currentUsername)}, formData: ${JSON.stringify(formData)}`)
          // <div>
          //   <ul>
          //     {currentUsername !== null && (
          //       <li key={currentUsername._id}><strong>_id:</strong> {currentUsername._id}</li>
          //     )}
          //     {currentUsername !== null && (
          //       <li key={currentUsername.username}><strong>username:</strong> {currentUsername.username}</li>
          //     )}
          //   </ul>
          // </div>
        }
      </Paper>
    </div>
  )
}

export default ExerciseLog
