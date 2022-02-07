import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {!data ? "Loading..." : `${data}`}
        </p>
      </header>
    </div>
  );
}

export default App;
