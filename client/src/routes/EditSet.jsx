import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../context/UserProvider'
import axios from 'axios'

const EditSet = () => {
  const navigate = useNavigate()
  const { setId } = useParams()
  const { user } = useUser()

  const [userId, setUserId] = useState("")
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [categories, setCategories] = useState([])
  const [isPrivate, setIsPrivate] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const setformData = {
    title,
    description,
    category_id: selectedCategory.id,
    private: isPrivate,
    set_id: setId
  }

  const cardFormData = cards;

  useEffect(() => {
    const getSetPromise = axios.get(`/api/sets/${setId}`)
    const categoriesPromise = axios.get('/api/categories/')

    Promise.all([getSetPromise, categoriesPromise])
      .then(([setData, categoryData]) => {
        const set = setData.data.set
        const cards = setData.data.cards
        console.log(set)

        setUserId(set.user_id)
        setTitle(set.title)
        setDescription(set.description)
        setSelectedCategory({
          name: set.category_name,
          id: set.category_id
        }) //Category state is stored as an object. ID is required for submitting
        setIsPrivate(set.private)
        setCards(cards)
        setCategories(categoryData.data)
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/api/sets/edit/${setId}`, setformData)
      .then(result => {
        const setId = result.data.data.rows[0].id
        const cardDataWithSetId = cards.map(card => ({ ...card, set_id: setId }));
        axios.put(`/api/cards/edit/${setId}`, cardDataWithSetId);
      })
      .then(() => { navigate(`/users/${user.id}`) })
      .catch(err => { console.error(err) })
  }

  const addCard = () => {
    const newCards = [...cards, {
      front: "",
      back: "",
      deleted: false
    }]
    setCards(newCards)
  }

  const handleDelete = (cardIndex) => {
    const updatedCards = [...cards];
    updatedCards[cardIndex].deleted = true;
    setCards(updatedCards);
  }

  if (isLoading) {
    return (
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Searching...</span>
      </Spinner>
    );
  }

  if (user.id !== userId) {
    return <h1>Sorry, you don't have permission to edit this set!</h1>
  }

  return (
    <div className="create-container">
      <Form>
        <div className='set-container'>
          <h1>Edit: {title}</h1>
          <Button variant='primary' type='submit' onClick={handleSubmit}>Edit</Button>
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
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
            reverse
            label='Private?'
          />
        </div>

        {cards.map((card, index) => (
          !card.deleted && (
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
          )
        ))}
        <Button onClick={() => addCard()}>Add Card</Button>
      </Form>
    </div>
  )
}

export default EditSet;