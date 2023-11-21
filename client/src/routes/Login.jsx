import { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, storeUserInfo } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("/api/auth/login", { email, password }).then(({ data }) => {
      if (data.user) {
        storeUserInfo(data.user);
        navigate("/profile");
      }
      if (data.message) {
        console.log(data.message);
      }
    });
  };

  // redirect to profile if user has already logged-in
  if (user) return <Navigate to="/profile" replace={true} />;

  return (
    <main>
      <h1>Login</h1>

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel label="Email address" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel label="Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p className="mt-4">
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </main>
  );
};

export default Login;
