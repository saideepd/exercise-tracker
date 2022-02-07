import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Information from './components/Information/Information';

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
      <Header/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {!data ? "Loading..." : `${data}`}
        </p>
      </header>
      <Information/>
    </div>
  );
}

export default App;
