import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Dropdown from 'react-bootstrap/Dropdown'
import { redirect } from 'react-router-dom'
import axios from 'axios'

const categories = ['Category1', 'Category2']

const Sets = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Select a category");
  const [isChecked, setIsChecked] = useState(false);
  const [cards, setCards] = useState([
    { front: '', back: '' },
    { front: '', back: '' },
    { front: '', back: '' }
  ]);

  const formData = {
    title,
    description,
    category: selectedCategory,
    isChecked
  }

  return (
    <div className="create-container">
      <Form>
        <div className='set-container'>
          <h1>Create a New Set</h1>
          <Button variant='primary' type='submit'>Create</Button>
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
              {selectedCategory}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map(category => (
                <Dropdown.Item
                  key={category}
                  onClick={() => setSelectedCategory(category)}>
                  {category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Check
            onChange={() => setIsChecked(!isChecked)}
            reverse
            label='Private?'
          />
        </div>

        {cards.map((card, index) => (
          <div className='card-container'>
            <FloatingLabel label='Front'>
              <Form.Control
                type='text'
                placeholder='Front'
                value={card.front}
                onChange={e => setFront(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label='Back'>
              <Form.Control
                type='text'
                placeholder='Back'
                value={card.back}
                onChange={e => setBack(e.target.value)}
              />
            </FloatingLabel>
          </div>
        ))}
      </Form>
    </div>
  )
}

export default Sets;