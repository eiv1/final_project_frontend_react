import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/home";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import About from "./Components/About";
import Game from "./Components/Game";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  const [data, setData] = useState({});
  const [students, setStudents] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5001/all")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/all1")
      .then((res) => res.json())
      .then((students) => {
        setStudents(students);
      });
  }, []);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  return (
    <>
      <Navbar />
      {isEmpty(students) ? (
        <p>loading...</p>
      ) : (
        <>
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "85vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Routes>
                <Route path="/" element={<Home items={students} />} />
                <Route path="/login" element={<Login items={students} />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/game"
                  element={<Game items={data} students={students} />}
                />
              </Routes>
            </div>
          </Container>
        </>
      )}
    </>
  );
}

export default App;
