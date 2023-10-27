
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/home.css';  

const Home = () => {
    const navigate = useNavigate();

    const handleCreateClick = () => {
        navigate('/sets/create');
    };

    return (
        <div className="home-container">
            <button onClick={handleCreateClick}>Create</button>
            <div className="columns-container">
                <div className="column">
                    <h3>Info about creating sets</h3>
                    <p>Details and steps to create your own flashcard sets.</p>
                </div>
                <div className="column">
                    <h3>Info on TTS reading flashcards to you</h3>
                    <p>Discover the benefits of text-to-speech technology for learning.</p>
                </div>
                <div className="column">
                    <h3>Info on checking out other sets</h3>
                    <p>Explore and study from a variety of flashcard sets created by others.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
