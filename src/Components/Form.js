import React, { useRef, useState } from "react";
import "./Form.css";

const Form = (props) => {
  const [points, setPoints] = useState(props.points.points);

  const aRef = useRef();

  if (props.items.random === null) {
    console.log("change random");
    props.items.random = Math.floor(Math.random() * 54);
  }

  const random = props.items.random;

  const [isEditing, setIsEditing] = useState(false);
  const [idFamily, setIdFamily] = useState(0);
  const [toContinue, setToContinue] = useState();
  const [tryagain, setTryAgain] = useState(false);

  const family_idChangeHandler = (event) => {
    if (event.target.value === props.items.arrayFractions[random].family_id) {
      aRef["family_id"] = event.target.value;
      setIsEditing(true);
      setIdFamily(event.target.value);
    } else {
      setIsEditing(false);
    }
  };

  const is_intChangeHandler = (event) => {
    if (event.target.value == props.items.arrayFractions[random].is_int) {
      aRef["is_int"] = event.target.value;
    }
  };

  const nameChangeHandler = (event) => {
    aRef["name"] = event.target.value;
  };

  const name2ChangeHandler = (event) => {
    aRef["name2"] = event.target.value;
  };

  const familysData = props.items.arrayFamilys.map((x) => (
    <option value={x.id} key={x.id}>
      {x.family}
    </option>
  ));

  const nameData = props.items.arrayFractions
    .filter((x) => x.family_id === props.items.arrayFractions[random].family_id)
    .map((x) => (
      <option value={x.id} key={x.id}>
        {x.name}
      </option>
    ));

  const name2Data = props.items.arrayFractions
    .filter((x) => x.family_id === props.items.arrayFractions[random].family_id)
    .map((x) => (
      <option value={x.id} key={x.id}>
        {x.name2}
      </option>
    ));

  const submitHandler = (e) => {
    e.preventDefault();
    checkForm();
  };

  const updatePoints = async () => {
    if (points == undefined) {
      setPoints(1);
    } else {
      setPoints(points + 1);
    }
    console.log({ id: props.points.id, points: points + 1 });
    const body1 = { id: props.points.id, points: points + 1 };
    const response = await fetch("http://localhost:5000/updatePoints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body1),
    });
  };

  const checkForm = () => {
    if (props.items.arrayFractions[random].family_id === aRef.family_id) {
      if (aRef.name === aRef.name2) {
        if (aRef.name == props.items.arrayFractions[random].id) {
          updatePoints();
          setToContinue(true);
          setTryAgain(false);
        } else {
          setToContinue(false);
          setTryAgain(true);
        }
      } else {
        setToContinue(false);
        setTryAgain(true);
      }
    } else {
      setToContinue(false);
      setTryAgain(true);
    }
  };

  console.log("render");

  const Continue = () => {
    props.items.random = null;
    setToContinue(false);
    setIsEditing(false);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="box">
          <div>{props.items.arrayFractions[random].counter}</div>
          <hr className="hr-style"></hr>
          <div>{props.items.arrayFractions[random].denomintor}</div>
        </div>
        <label>is_int</label>
        <select
          onChange={is_intChangeHandler}
          className="form-control custom-select text-center"
        >
          <option value="none"> choose.. </option>
          <option value={0}>no</option>
          <option value={1}>yes</option>
        </select>
        <br></br>
        <label>family_id</label>
        <select
          onChange={family_idChangeHandler}
          className="form-control custom-select text-center"
        >
          <option value=""> choose.. </option>3{familysData}
        </select>
        <br></br>

        {isEditing && (
          <>
            <label>name</label>
            <br></br>
            <select
              onChange={nameChangeHandler}
              className="form-control custom-select text-center"
            >
              <option value=""> choose.. </option>
              {nameData}
            </select>
            <br></br>
            <label>name2</label>
            <br></br>
            <select
              onChange={name2ChangeHandler}
              className="form-control custom-select text-center"
            >
              <option value=""> choose.. </option>
              {name2Data}
            </select>
            <br></br>
          </>
        )}

        <button className="btn btn-success">Submit</button>
      </form>
      {tryagain && <div>try again</div>}

      {toContinue && (
        <div>
          <h1>congratulations</h1>
          <button onClick={Continue} className="btn btn-info">continue</button>
        </div>
      )}
    </div>
  );
};

export default Form;
