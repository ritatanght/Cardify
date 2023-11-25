import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { user, storeUserInfo } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm)
      return toast.error(
        "The password and confirm password fields do not match."
      );

    axios
      .post("/api/users", { email, username, password })
      .then((res) => {
        if (res.status === 200) {
          storeUserInfo(res.data);
          navigate("/profile");
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  // redirect to profile if user has already logged-in
  if (user) return <Navigate to="/profile" replace={true} />;

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
              required
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
              required
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
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel label="Confirm Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
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
