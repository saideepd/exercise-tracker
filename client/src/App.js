import { useState, useReducer } from 'react'
import './App.css';
import Header from './components/Header/Header';
import Information from './components/Information/Information';
import User from './components/User/User';
import Exercise from './components/ExerciseLog/ExerciseLog';
import { Container } from '@mui/material';


function App() {

  // Its a reducer function to update existing 
  // state's individual properties
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    };
  }

  // User variables
  const [formData, setFormData] = useReducer(formReducer, {})
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState(null);


  return (
    <div className="App">
      <Container
        className="container"
      >
        <Header />
        <div className="user-exercise-form">
          <User
            formData={formData}
            setFormData={setFormData}
            submitting={submitting}
            setSubmitting={setSubmitting}
            post={post}
            setPost={setPost}
          />
          <Exercise 
            formData={formData}
          />
        </div>
        <Information />
      </Container>
    </div>
  );
}

export default App;
