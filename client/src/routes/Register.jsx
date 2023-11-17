import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const Register = () => {

  return (
    <main>
      <h1>Register</h1>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="Enter email"/>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Enter username" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-3"
          >
            <Form.Control type="password" placeholder="Password" />
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
