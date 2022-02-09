import React, { useState, useReducer } from 'react'
import './User.css';
import { Alert, Button, debounce, Paper, TextField } from '@mui/material';
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

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  };
}

const User = () => {
  const [formData, setFormData] = useReducer(formReducer, {})
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setTimeout(() => {
      setSubmitting(true);

      console.log("You've submitted the form");
      alert("You've submitted the form");
      // setSubmitting(false);
    }, 3000);
  }

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value
    });
    console.log(`name: ${event.target.name}, value: ${event.target.value}`)
  }

  const handleText = debounce((event) => {
    handleChange(event);
  }, 500);

  return (
    <div className="user-component">
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={3}
          className="user-paper"
          style={{ backgroundColor: '#fff9c4' }}
        >
          <h3>Create a New User</h3>
          <p className="endpoint user-endpoint">POST /api/users</p>
          <CssTextField
            required
            id="outlined-required"
            label="Username"
            name="username"
            placeholder="username"
            className="user-input"
            size="small"
            onChange={(event) => handleText(event)}
          />
          <ColorButton
            variant="contained"
            id="create-user-btn"
            color="primary"
            type="submit"
          >
            Submit
          </ColorButton>
        </Paper>
        {submitting &&
          <div>
            <br />
            <Alert variant="filled" severity="success">
              Submitted Successfully!
            </Alert>
            <ul>
              {Object.entries(formData).map(([name, value]) => (
                <li key={name+value}><strong>{name}</strong>:{value}</li>
              ))}
            </ul>
          </div>
        }
      </form>
    </div>
  )
}

export default User
