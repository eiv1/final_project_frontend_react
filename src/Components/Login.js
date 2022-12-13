import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

export default function Login(props) {
  const students = props.items.students;

  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoding] = useState(false);

  async function handlerSubmit(e) {
    e.preventDefault();
    setError("Failed to login");

    for (let i = 0; i < students.length; i++) {
      if (emailRef.current.value === students[i].email) {
        console.log(emailRef.current.value);
        console.log(students[i].email);
        if (passwordRef.current.value === students[i].password) {
          console.log("login");
          window.localStorage.setItem("id", students[i].id);
          setError("");
          setLoding(true);
          window.open("/","_self")

        }
      }
    }
  }
  
  console.log(students)


  return (
    <>
      {typeof students === undefined ? (
        <p>loading...</p>
      ) : (
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4"> Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handlerSubmit}>
              <Form.Group id="email">
                <Form.Label> Email </Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label> Password </Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <br></br>
              <Button disabled={loading} className="w-100" type="submit">
                Sing Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
