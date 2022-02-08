import React from 'react'
import './User.css';
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

const User = () => {
  return (
    <div className="user-component">
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
        />
        <ColorButton
          variant="contained"
          id="create-user-btn"
          color="primary"
        >
          Submit
        </ColorButton>
      </Paper>
    </div>
  )
}

export default User
