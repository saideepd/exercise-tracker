import { useState, useReducer } from 'react'
import './App.css';
import Header from './components/Header/Header';
import Information from './components/Information/Information';
import User from './components/User/User';
import Exercise from './components/ExerciseLog/ExerciseLog';
import Logs from './components/Logs/Logs';
import Footer from './components/Footer/Footer';
import { Container } from '@mui/material';

const config = require('../package.json');

// Accessing API server URL from central package.json con fig file
const baseUrl = process.env.BASE_URL || config.proxy;

function App() {

  // Its a reducer function to update existing 
  // state's individual properties
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    };
  }
  // const formReducerExercise = (state, event) => {
  //   return {
  //     ...state,
  //     [event.name]: event.value
  //   };
  // }

  // User variables
  const [formData, setFormData] = useReducer(formReducer, {})
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState(null);

  // Exercise variables
  const [userId, setUserId] = useState(null);
  const [exerciseSubmit, setExerciseSubmit] = useState(false);
  const [exerciseLog, setExerciseLog] = useReducer(formReducer, {});
  const [log, setLog] = useState({});

  // Logs variables
  const [submitLogs, setSubmitLogs] = useState(false);
  const [userLogs, setUserLogs] = useState({});
  const [userData, setUserData] = useState(null);
  const [logsFormData, setLogsFormData] = useReducer(formReducer, {});

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
            baseUrl={baseUrl}
          />
          <Exercise 
            formData={formData}
            baseUrl={baseUrl}
            userId={userId}
            setUserId={setUserId}
            exerciseSubmit={exerciseSubmit}
            setExerciseSubmit={setExerciseSubmit}
            exerciseLog={exerciseLog}
            setExerciseLog={setExerciseLog}
            log={log}
            setLog={setLog}
          />
          <Logs
            baseUrl={baseUrl}
            submitLogs={submitLogs}
            setSubmitLogs={setSubmitLogs}
            userLogs={userLogs}
            setUserLogs={setUserLogs}
            userData={userData}
            setUserData={setUserData}
            logsFormData={logsFormData}
            setLogsFormData={setLogsFormData}
          />
        </div>
        <Information />
        <Footer/>
      </Container>
    </div>
  );
}

export default App;
