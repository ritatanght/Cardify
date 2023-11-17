import { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { storeUserInfo } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users", { email, username, password })
      .then((res) => {
        if (res.status === 200) {
          storeUserInfo(res.data);
          navigate(`/users/${res.data.id}`);
        }
      })
      .catch((err) => console.error(err.response.data.message));
  };
  return (
    <main>
      <h1>Register</h1>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <Form onSubmit={handleSubmit}>
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

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <FloatingLabel label="Username" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          Register
        </Button>
      </Form>
    </main>
  );
};

export default Register;
