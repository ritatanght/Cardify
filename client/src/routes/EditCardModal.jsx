import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const EditCardModal = ({ show, onHide, card, onUpdate }) => {
  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);

  const handleSubmit = () => {
    // Update the card data on the backend first
    axios.put(`/api/cards/update/${card.id}`, { front, back })
      .then(response => {
        if (response.data.success) {
          // If successful, update the UI
          onUpdate({ ...card, front, back });
          onHide();
        } else {
          console.error("Error updating card: ", response.data.message);
        }
      })
      .catch(error => {
        console.error("API Error: ", error);
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
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCardModal;