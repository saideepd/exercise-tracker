import { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header/Header';
import Information from './components/Information/Information';
import User from './components/User/User';
import Exercise from './components/ExerciseLog/ExerciseLog';
import { Container } from '@mui/material';

const baseUrl = "http://localhost:8888";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/api`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((err) => console.log(err, data));
  }, [data]);

  return (
    <div className="App">
      <Container
        className="container"
      >
        <Header />
        <p>
          {!data ? "Loading..." : `${data}`}
        </p>
        <div className="user-exercise-form">
          <User />
          <Exercise />
        </div>
        <Information />
      </Container>
    </div>
  );
}

export default App;
