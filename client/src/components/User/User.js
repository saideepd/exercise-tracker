import React from 'react'
import './User.css';
import { Button, Paper, TextField } from '@mui/material';
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'red',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'goldenrod'
      },
      '&:hover fieldset': {
        borderColor: 'goldenrod',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
});

const User = () => {
    return (
        <div className="user-component">
            <Paper
                elevation={3}
                className="user-paper"
            >
                <h3>Create a New User</h3>
                <p className="endpoint user-endpoint">POST /api/users</p>
                <CssTextField
                    required
                    id="outlined-required"
                    label="Username"
                    placeholder="username"
                    className="user-input"
                />
                <Button
                    variant="contained"
                    id="create-user-btn"
                    color="primary"
                >
                    Submit
                </Button>
            </Paper>
        </div>
    )
}

export default User
