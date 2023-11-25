import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../context/UserProvider";
import { useNavigate } from "react-router";

const EditCardModal = ({ show, onHide, card, onUpdate }) => {
  const navigate = useNavigate();
  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);
  const { clearUserInfo } = useUser();

  const handleSubmit = () => {
    if (!front || !back)
      return toast.info("Front and back text cannot be empty");
    // Update the card data on the backend first
    axios
      .put(`/api/cards/update/${card.id}`, { front, back })
      .then((response) => {
        if (response.data.success) {
          // If successful, update the UI
          onUpdate({ ...card, front, back });
          toast.success("Changes have been saved.", {
            position: "top-center",
          });
          onHide();
        } else {
          console.error("Error updating card: ", response.data.message);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.info(err.response.data.message);
          clearUserInfo();
          return navigate("/login");
        } else {
          toast.error(err);
        }
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Front</Form.Label>
            <Form.Control
              type="text"
              value={front}
              onChange={(e) => setFront(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Back</Form.Label>
            <Form.Control
              type="text"
              value={back}
              onChange={(e) => setBack(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCardModal;
