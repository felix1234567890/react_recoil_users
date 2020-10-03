import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useRecoilState } from "recoil";
import { usersState } from "./atom";

function App() {
  const [{ loading, users }, setUsersData] = useRecoilState(usersState);
  useEffect(() => {
    setUsersData((prev) => ({ ...prev, loading: true }));
    fetch("./users.json").then((data) =>
      data.json().then((res) => {
        setTimeout(() => {
          setUsersData({ users: [...res], loading: false });
        }, 3000);
      })
    );
  }, [setUsersData]);
  console.log(loading);
  console.log(users);
  if (loading) return <h1>Loading</h1>;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
