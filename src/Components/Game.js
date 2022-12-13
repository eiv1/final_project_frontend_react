import React, { useRef } from "react";
import Form from "./Form";
import "./Form.css";

export default function Game(props) {
  const userID = window.localStorage.id;

  const User = useRef();

  const students = props.students.students;

  if (students !== undefined) {
    if (User.current == undefined) {
      for (let i = 0; i < students.length; i++) {
        if (userID == students[i].id) {
          User["current"] = students[i];
          console.log(User.current);
        }
      }
    }
  }

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  return (
    <>
      {isEmpty(props.items) ? (
        <p>loading...</p>
      ) : (
        <>
          <div>
            <Form items={props.items} points={User.current} />
          </div>
        </>
      )}
    </>
  );
}
