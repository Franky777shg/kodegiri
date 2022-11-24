import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { axiosInstance } from "../api";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";

export const LoginPage = () => {
  const username = useRef("");
  const password = useRef("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    try {
      e.preventDefault();
      const user = {
        username: username.current.value,
        password: password.current.value,
      };

      const { data } = await axiosInstance.post("/auth/login", user);
      localStorage.setItem("auth_token", data.token);
      navigate("/job");
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };

  return (
    <div style={{ padding: "100px" }}>
      <div className="container my-container">
        <h1 className="text-center">Github Jobs</h1>
        <Form onSubmit={(e) => onLogin(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              ref={username}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={password}
            />
          </Form.Group>
          <Button style={{ width: "100%" }} variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
};
