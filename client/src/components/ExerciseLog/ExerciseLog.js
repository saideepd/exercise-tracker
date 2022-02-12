import React from 'react'
import './ExerciseLog.css';
import { Alert, Button, debounce, Paper, TextField } from '@mui/material';
import { styled } from "@mui/material/styles";
import { isSubmitted } from '../User/User';
import axios from 'axios';

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

// let exerciseLogArray = [];

const ExerciseLog = ({ formData, baseUrl, userId, setUserId, exerciseSubmit, setExerciseSubmit, exerciseLog, setExerciseLog, log, setLog }) => {

  // API to Create Exercise Log
  const createExerciseLog = async () => {
    console.log('Called createExerciseLog()');
    console.log(`axios exerciseLog: ${JSON.stringify(exerciseLog)}`)
    // Add User id if payload object is missing _id
    if (!exerciseLog.hasOwnProperty(':_id'))
      exerciseLog[':_id'] = formData.userId;

    await axios.post(`${baseUrl}/api/users/${formData.userId}/exercises`,
      exerciseLog
    )
      .then((response) => {
        setLog(response.data)
        console.log(`Create Exercise Log Response Data: ${JSON.stringify(response.data)}`)
      })
      .catch((error) => {
        console.log(`Error in Create Exercise Log: ${error}, log: ${JSON.stringify(log)}`);
      })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Setting submit to true in 0.1s
    setTimeout(() => {
      console.log('Called HandleSubmit to true')
      setExerciseSubmit(true);
      // isSubmitted = true;
      // Adding extra user property explicitly
      // exerciseLog._id = formData.userId;
      console.log(`exerciseLog: ${JSON.stringify(exerciseLog)}`)

      console.log("You've submitted Exercise form");
    }, 100);

    // Setting submit to false in next 3s
    setTimeout(() => {

      // Call create exercise log method
      let createExerciseLogResponse = createExerciseLog();

      console.log('called createExerciseLog()');

      // Set submitted to false after 3s
      setExerciseSubmit(false);
      // setExerciseSubmit(false);
      console.log('Called HandleSubmit to false');
    }, 3000);
  };

  const handleChange = (event) => {
    setExerciseLog({
      name: event.target.name,
      value: event.target.value
    });
    // let [key, value] = [event.target.name, event.target.value];
    // exerciseLogArray.push(...exerciseLogArray, {key: value})
    console.log(`Exercise name: ${event.target.name}, value: ${event.target.value}`);
    // console.log(`Exercise key: ${key}, value: ${value}`);
  }

  const handleUserExercise = debounce((event) => {
    console.log("Inside handleUserExercise")
    handleChange(event);
  }, 500);


  return (
    <div className="exercise-component">
      <form onSubmit={handleSubmit}>
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
            name=":_id"
            placeholder=":_id"
            className="user-input"
            size="small"
            margin="dense"
            title="User Id will be auto-filled"
            value={!isSubmitted ? "" : formData.userId}
            onChange={handleUserExercise}
            disabled={exerciseSubmit}
          />
          <CssTextField
            required
            id="outlined-required"
            label="Description"
            name="description"
            placeholder="Description"
            className="user-input"
            size="small"
            margin="dense"
            title="Describe the exercise"
            onChange={handleUserExercise}
            disabled={exerciseSubmit}
          />
          <CssTextField
            required
            id="outlined-required"
            label="Duration"
            name="duration"
            placeholder="Duration (mins.)"
            className="user-input"
            size="small"
            margin="dense"
            title="How long did you exercised?"
            onChange={handleUserExercise}
            disabled={exerciseSubmit}
          />
          <CssTextField
            id="outlined-required"
            label="Date"
            name="date"
            placeholder="Date (yyyy-mm-dd)"
            className="user-input"
            size="small"
            margin="dense"
            title="Enter the date of exercise in yyyy-mm-dd format"
            onChange={handleUserExercise}
            disabled={exerciseSubmit}
          />
          <ColorButton
            variant="contained"
            id="create-exerciselog-btn"
            color="primary"
            type="submit"
            disabled={exerciseSubmit}
          >
            Submit
          </ColorButton>
        </Paper>
        {/* {isSubmitted &&
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
        } */}
        {exerciseSubmit &&
          <div>
            <br />
            <Alert variant="filled" severity="success">
              Exercise Logged Successfully!
            </Alert>
          </div>
        }
        {isSubmitted &&
          <div>
            <ul>
              {log !== null && Object.entries(log).map(([key, value]) => (
                <li key={key + value}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
          </div>
        }
      </form>
    </div>
  )
}

export default ExerciseLog
