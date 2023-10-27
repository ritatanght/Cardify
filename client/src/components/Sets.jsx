import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'

const Sets = () => {
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
          Categories
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Hello</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button variant='primary' type='submit'>Create</Button>
    </div>
  )
}

export default Sets;