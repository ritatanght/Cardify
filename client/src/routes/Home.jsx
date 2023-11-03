import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import "../assets/styles/home.scss";
import BackgroundChanger from "../components/BackgroundChanger";

const Home = () => {
  const bannerContainerRef = useRef(null); // Create a ref
  return (
    <div className="home-container">
      <div className="banner-container" ref={bannerContainerRef}>
        <BackgroundChanger containerRef={bannerContainerRef} />
        <div className="banner__content">
          <h2>
            Get Started with <br />
            Your Flashcard Set
          </h2>
          <Button variant="primary" href="/sets/create">
            Create My Set
          </Button>
        </div>
      </div>
      <div className="columns-container">
        <div className="column">
          <h3>Create Your Own Flashcards Sets</h3>
          <p>
            Create personalized flashcard sets for your unique learning needs.
            Whether it&apos;s for language learning, test preparation, or any
            other subject, start creating your sets in just a few simple steps.
          </p>
        </div>
        <div className="column">
          <h3>Elevate Your Learning Journey</h3>
          <p>
            Discover the power of text-to-speech technology for a more engaging
            and immersive learning experience. Let your flashcards come to life
            with audio assistance.
          </p>
        </div>
        <div className="column">
          <h3>Explore and Learn from Others</h3>
          <p>
            Dive into a world of knowledge with flashcard sets crafted by our
            community of avid learners. Browse and study from a wide range of
            topics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
