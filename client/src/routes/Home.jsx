
import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/styles/home.css';  
import '../assets/styles/BackgroundStyles.css'
import BackgroundChanger from '../components/BackgroundChanger';

const Home = () => {
    const homeContainerRef = useRef(null); // Create a ref
    return (
        <div className="home-container" ref={homeContainerRef}>
            <BackgroundChanger containerRef={homeContainerRef} />
        
            <Link to="/sets/create">
                <Button variant="primary" as="span">Create</Button>
            </Link>
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
