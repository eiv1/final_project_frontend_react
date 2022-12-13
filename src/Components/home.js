import React, { useRef } from "react";

export default function Home(props) {
  const userID = window.localStorage.id;

  const User = useRef();

  const students = props.items.students;

  if (students !== undefined) {
    if (User.current == undefined) {
      for (let i = 0; i < props.items.students.length; i++) {
        if (userID == props.items.students[i].id) {
          User["current"] = props.items.students[i];
        }
      }
    }
  }

  return (
    <>
      {typeof userID == "undefined" ? (
        <>
          <p>Hello to Shvarim</p>
          <p>you need to login</p>
        </>
      ) : (
        <>
            <h1>
              Hello {User.current.first_name} {User.current.last_name}
            </h1>
            <div>points: {User.current.points} </div>
            <div>phone: {User.current.phone} </div>
            <div>email: {User.current.email} </div>
        </>
      )}
    </>
  );
}
