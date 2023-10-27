import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'

const categories = ['Category1', 'Category2']

const Sets = () => {

  const [selectedCategory, setSelectedCategory] = useState("Select a category")

  return (
    <div className="set-container">
      <h1>Create a New Set</h1>
      <Button variant='primary' type='submit'>Create</Button>
      <Form.Group>
        <Form.Control type='text' placeholder='Title' />
      </Form.Group>
      <Form.Group>
        <Form.Control type='textarea' placeholder='Description'></Form.Control>
      </Form.Group>
      <Dropdown>
        <Dropdown.Toggle variant='success' id='dropdown-basic'>
          {selectedCategory}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {categories.map(category => (
            <Dropdown.Item key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Button variant='primary' type='submit'>Create</Button>
    </div>
  )
}

export default Sets;