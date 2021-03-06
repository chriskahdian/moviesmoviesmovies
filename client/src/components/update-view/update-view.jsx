import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import "./update-view.scss";

export function UpdateView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});

  const handleUpdate = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    const url =
      "https://moviesmoviesmovies.herokuapp.com/users/" +
      localStorage.getItem("user");
    if (isValid) {
    axios
      .put(
        url,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        localStorage.setItem("user", data.Username);
        // props.setUsername(data.Username);
        alert("Your profile data was updated successfully");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(e.response.data.errors[0].msg);
      });
    }
  };

  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameErr.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    }

    if (/[^0-9a-zA-Z]/.test(username)) {
      // It has an invalid character
      usernameErr.username = "Username cannot contain symbols";
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordErr.passwordMissing = "You must enter a password";
      isValid = false;
    }

    if (!email.includes(".") && !email.includes("@")) {
      emailErr.emailNotEmail = "A valid email address is required";
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setEmailErr(emailErr);
    return isValid;
  };

  return (
    <div>
      <div className="updateTitle">
        <h1>Update your account</h1>
      </div>
      <div>
        <Form className="registration-form">
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          {Object.keys(usernameErr).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {usernameErr[key]}
                </div>
              );
            })}
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          {Object.keys(passwordErr).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {passwordErr[key]}
                </div>
              );
            })}  
          </Form.Group>
          <Form.Group>
            <Form.Label>Birth Date:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              placeholder="Select Birthday"
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          {Object.keys(emailErr).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {emailErr[key]}
                </div>
              );
            })}
          </Form.Group>
          <Link to={`/users/`}>
            <Button
              variant="btn-lg btn-dark btn-block"
              type="submit"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}
