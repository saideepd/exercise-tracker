import React from 'react'
import './User.css';
import { Alert, Button, debounce, Paper, TextField } from '@mui/material';
import { styled } from "@mui/material/styles";
import axios from 'axios';

let currentUsername;
let isSubmitted = false;

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



const User = ({ formData, setFormData, submitting, setSubmitting, post, setPost, baseUrl }) => {


  // Call the Create User API with POST request
  const createUser = async () => {
    console.log('called create user response');
    await axios.post(`${baseUrl}/api/users`,
      {
        username: formData.username
      }
    )
      .then((response) => {
        setPost(response.data)
        console.log(`createUser Response Data: ${JSON.stringify(response.data)}`)
        currentUsername = response.data;
        // setFormData({
        //   username: formData.username,
        //   userId: response.data._id
        // })
        formData.userId = response.data._id;
        console.log(`CurrentUsername: ${JSON.stringify(currentUsername)}, formDataId: ${JSON.stringify(formData)}`)
      })
      .catch((error) => {
        console.log(`Error: ${error}, formData:${JSON.stringify(formData)}, post: ${JSON.stringify(post)}, type: ${typeof post}`)
      })
  };


  // Get the user by username
  const getUserByUsername = async () => {
    console.log(`Inside getByUsername: ${formData.username}`);
    await axios.get(`${baseUrl}/api/username/${formData.username}`)
      .then((response) => {
        setPost(response.data)
      })
      .catch((error) => {
        console.log(`Error in getByUsername: ${error}, formData: ${formData.username}`);
      })
  };
  console.log(`getUserByUsername: ${getUserByUsername}`);


  const handleSubmit = (event) => {
    event.preventDefault();
    // Setting Submit to true in 0.1s
    setTimeout(() => {
      console.log('called handleSubmit to true');
      setSubmitting(true);
      isSubmitted = true;

      console.log("You've submitted the form");
    }, 100);

    // Setting Submit to false in next 3s
    setTimeout(() => {

      // Call create user method
      let createUserResponse = createUser();
      // getUserByUsername();
      console.log(`createUserResponse: ${JSON.stringify(post)}`);
      console.log(`called createUser(): ${createUserResponse}`);

      // Set Submitted to false after 3s
      setSubmitting(false);
      // setSubmitting(false);
      // isSubmitted=false;
      console.log('Called handleSubmit to false');
    }, 3000);
  }

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value
    });
    console.log(`name: ${event.target.name}, value: ${event.target.value}`)
  }

  // using debounce to avoid frequent calls
  const handleText = debounce((event) => {
    handleChange(event);
  }, 500);

  return (
    <div className="user-component">
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={3}
          className="user-paper"
          style={{ backgroundColor: '#fff9c4', paddingTop: '0.5em' }}
        >
          <h3>Create or Get User</h3>
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
            disabled={submitting}
          />
          <ColorButton
            variant="contained"
            id="create-user-btn"
            color="primary"
            type="submit"
            disabled={submitting}
          >
            Submit
          </ColorButton>
        </Paper>
        {submitting &&
          <div>
            <br />
            <Alert variant="filled" severity="success">
              User Created Successfully!
            </Alert>
          </div>
        }
        {isSubmitted &&
          <div>
            <ul>
              {post !== null && (
                <li key={post._id}><strong>_id:</strong> {post._id}</li>
              )}
              {post !== null && (
                <li key={post.username}><strong>username:</strong> {post.username}</li>
              )}
            </ul>
          </div>
        }
      </form>
    </div>
  )
}

export default User
export {currentUsername, isSubmitted};