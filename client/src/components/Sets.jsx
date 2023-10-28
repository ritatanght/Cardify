import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const categories = [
  { id: 1, name: 'Category1' },
  { id: 2, name: 'Category2' }
];

const Sets = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [isPrivate, setIsPrivate] = useState(false);
  const [cards, setCards] = useState([
    { front: '', back: '' },
    { front: '', back: '' },
    { front: '', back: '' }
  ]);

  // const currentUserId = getUserId()

  const setformData = {
    title,
    description,
    category_id: selectedCategory.id,
    private: isPrivate
    // user_id: currentUserId
  }

  const cardFormData = cards;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/sets/create", setformData)
      .then(result => {
        const setId = result.data.data.rows[0].id
        const cardDataWithSetId = cardFormData.map(card => ({ ...card, setId }));
        axios.post("/api/cards/create", cardDataWithSetId); // TODO: Adjust this endpoint
      })
      .then(() => {navigate('/')})
      .catch(err => {console.error(err)})
  }

  const handleDelete = (cardIndex) => {
    const updatedCards = [...cards];
    updatedCards.splice(cardIndex, 1);
    setCards(updatedCards);
}

  return (
    <div className="create-container">
      <Form>
        <div className='set-container'>
          <h1>Create a New Set</h1>
          <Button variant='primary' type='submit' onClick={handleSubmit}>Create</Button>
          <FloatingLabel label='Title'>
            <Form.Control
              type='text'
              placeholder='Title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label='Description'>
            <Form.Control
              type='textarea'
              placeholder='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </FloatingLabel>
          <Dropdown>
            <Dropdown.Toggle variant='success' id='dropdown-basic'>
              {selectedCategory.name || "Select a category"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map(category => (
                <Dropdown.Item
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}>
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Check
            onChange={() => setIsPrivate(!isPrivate)}
            reverse
            label='Private?'
          />
        </div>

        {cards.map((card, index) => (
          <div key={index} className='card-container'>
            <FloatingLabel label='Front'>
              <Form.Control
                type='text'
                placeholder='Front'
                value={card.front}
                onChange={e => {
                  const updatedCards = [...cards];
                  updatedCards[index].front = e.target.value;
                  setCards(updatedCards)
                }}
              />
            </FloatingLabel>
            <FloatingLabel label='Back'>
              <Form.Control
                type='text'
                placeholder='Back'
                value={card.back}
                onChange={e => {
                  const updatedCards = [...cards];
                  updatedCards[index].back = e.target.value;
                  setCards(updatedCards)
                }}
              />
            </FloatingLabel>
            <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(index)} />
          </div>
        ))}
        <Button onClick={() => setCards([...cards, { front: "", back: "" }])}>Add Card</Button>
      </Form>
    </div>
  )
}

export default Sets;