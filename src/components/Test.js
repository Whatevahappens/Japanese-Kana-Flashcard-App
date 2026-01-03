import React, { useState, useEffect } from 'react';
import './Test.css';
import Flashcard from './Flashcard';
import { getRandomCharacters } from '../data/hiragana';

function Test({ characters, scriptName, onBack }) {
  const [testQuantity, setTestQuantity] = useState(15);
  const [gameCharacters, setGameCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [feedback, setFeedback] = useState('');

  const startTest = () => {
    const randomChars = getRandomCharacters(characters, testQuantity);
    setGameCharacters(randomChars);
    setCurrentIndex(0);
    setScore(0);
    setIsTestActive(true);
    setUserAnswer('');
    setShowAnswer(false);
    setFeedback('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const currentChar = gameCharacters[currentIndex];
    const isCorrect = userAnswer.toLowerCase().trim() === currentChar.romaji.toLowerCase();
    
    setShowAnswer(true);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextCard = () => {
    if (currentIndex < gameCharacters.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setShowAnswer(false);
      setFeedback('');
    } else {
      setIsTestActive(false);
    }
  };

  const handleKeyPress = (e) => {
    if (showAnswer && e.key === 'Enter') {
      nextCard();
    }
  };

  useEffect(() => {
    if (showAnswer) {
      window.addEventListener('keypress', handleKeyPress);
      return () => window.removeEventListener('keypress', handleKeyPress);
    }
  }, [showAnswer, currentIndex]);

  const getCurrentChar = () => {
    if (!gameCharacters || gameCharacters.length === 0) return null;
    return gameCharacters[currentIndex];
  };

  const quantities = [5, 10, 15, 20];
  const allOption = characters.length;

  return (
    <div className="test">
      {!isTestActive ? (
        gameCharacters.length > 0 ? (
          // Results screen
          <div className="test-results">
            <button onClick={onBack} className="back-button">
              ← Back
            </button>
            <div className="results-card">
              <h2>Test Complete!</h2>
              <div className="final-score">
                <span className="score-number">{score}</span>
                <span className="score-divider">/</span>
                <span className="score-total">{testQuantity}</span>
              </div>
              <div className="score-percentage">
                {Math.round((score / testQuantity) * 100)}% Correct
              </div>
              {score === testQuantity && (
                <div className="perfect-score">🎉 Perfect Score! 🎉</div>
              )}
              <button onClick={startTest} className="retry-button">
                Try Again
              </button>
            </div>
          </div>
        ) : (
          // Setup screen
          <div className="test-setup">
            <button onClick={onBack} className="back-button">
              ← Back
            </button>
            <h2 className="test-title">{scriptName} Test</h2>
            <p className="test-description">
              Select how many questions you want to answer:
            </p>
            
            <div className="quantity-selector">
              {quantities.map(qty => (
                <button
                  key={qty}
                  className={`quantity-button ${testQuantity === qty ? 'active' : ''}`}
                  onClick={() => setTestQuantity(qty)}
                >
                  {qty}
                </button>
              ))}
              <button
                className={`quantity-button ${testQuantity === allOption ? 'active' : ''}`}
                onClick={() => setTestQuantity(allOption)}
              >
                All ({allOption})
              </button>
            </div>

            <button onClick={startTest} className="start-test-button">
              Start Test ({testQuantity} Questions)
            </button>
          </div>
        )
      ) : (
        // Test screen
        <div className="test-game">
          <div className="test-header">
            <div className="progress-info">
              <span className="question-count">
                Question {currentIndex + 1} / {testQuantity}
              </span>
              <span className="current-score">
                Score: {score} / {testQuantity}
              </span>
            </div>
            <div className="progress-track">
              <div 
                className="progress-fill"
                style={{ width: `${((currentIndex + 1) / testQuantity) * 100}%` }}
              ></div>
            </div>
          </div>

          <Flashcard 
            character={getCurrentChar()?.character}
            showAnswer={showAnswer}
            romaji={getCurrentChar()?.romaji}
            feedback={feedback}
          />

          <div className="answer-section">
            {!showAnswer ? (
              <form onSubmit={handleSubmit} className="answer-form">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter romaji (e.g., 'ka')"
                  className="answer-input"
                  autoFocus
                />
                <button type="submit" className="submit-button">
                  Check Answer
                </button>
              </form>
            ) : (
              <div className="feedback-section">
                <div className={`feedback-message ${feedback}`}>
                  {feedback === 'correct' ? (
                    <>
                      <span className="feedback-icon">✓</span>
                      <span>Correct! It's "{getCurrentChar()?.romaji}"</span>
                    </>
                  ) : (
                    <>
                      <span className="feedback-icon">✗</span>
                      <span>The answer is "{getCurrentChar()?.romaji}"</span>
                    </>
                  )}
                </div>
                <button onClick={nextCard} className="next-button">
                  {currentIndex < testQuantity - 1 ? 'Next Character →' : 'Finish Test'}
                </button>
                <div className="hint-text">Press Enter to continue</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;