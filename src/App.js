import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Flashcard from './components/Flashcard';
import Dictionary from './components/Dictionary';
import { getRandomCharacters } from './data/hiragana';

function App() {
  const [gameCharacters, setGameCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [highScore, setHighScore] = useState(0);
  const [showDictionary, setShowDictionary] = useState(false);

  // Load high score from localStorage on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('hiragana-high-score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Save high score when score changes
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('hiragana-high-score', score.toString());
    }
  }, [score, highScore]);

  const startGame = () => {
    const randomChars = getRandomCharacters(20);
    setGameCharacters(randomChars);
    setCurrentIndex(0);
    setScore(0);
    setIsGameActive(true);
    setUserAnswer('');
    setShowAnswer(false);
    setFeedback('');
    setShowDictionary(false);
  };

  const openDictionary = () => {
    setShowDictionary(true);
    setIsGameActive(false);
  }

  const closeDictionary = () => {
    setShowDictionary(false);
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

const nextCard = useCallback(() => {
  if (currentIndex < gameCharacters.length - 1) {
    setCurrentIndex((i) => i + 1);
    setUserAnswer('');
    setShowAnswer(false);
    setFeedback('');
  } else {
    setIsGameActive(false);
  }
}, [currentIndex, gameCharacters.length]);


  const handleKeyPress = useCallback(
    (e) => {
    if (showAnswer && e.key === 'Enter') {
      nextCard();
    }
  },
  [showAnswer, nextCard]
);

  useEffect(() => {
    if (showAnswer) {
      window.addEventListener('keypress', handleKeyPress);
      return () => window.removeEventListener('keypress', handleKeyPress);
    }
  }, [showAnswer, handleKeyPress]);

  const getCurrentChar = () => {
    if (!gameCharacters || gameCharacters.length === 0) return null;
    return gameCharacters[currentIndex];
  };

  return (
    <div className="App">
      <div className="background-pattern"></div>
      
      <header className="header">
        <h1 className="title">
          <span className="title-japanese">ひらがな</span>
          <span className="title-english">Hiragana Master</span>
        </h1>
        {highScore > 0 && !isGameActive && (
          <div className="high-score-badge">
            Best: {highScore}/20
          </div>
        )}
      </header>

      <main className="main-content">
        {!isGameActive ? (
          <div className="start-screen">
            {gameCharacters.length > 0 ? (
              <div className="results">
                <div className="results-card">
                  <h2>Game Complete!</h2>
                  <div className="final-score">
                    <span className="score-number">{score}</span>
                    <span className="score-divider">/</span>
                    <span className="score-total">20</span>
                  </div>
                  <div className="score-percentage">
                    {Math.round((score / 20) * 100)}% Correct
                  </div>
                  {score > highScore && score === 20 && (
                    <div className="perfect-score">🎉 Perfect Score! 🎉</div>
                  )}
                  {score > 0 && score === highScore && score < 20 && (
                    <div className="new-high-score">🌟 New High Score! 🌟</div>
                  )}
                  <button onClick={startGame} className="start-button">
                    Play Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="welcome">
                <p className="welcome-text">
                  Test your knowledge of all 46 Hiragana characters!
                  <br />
                  Match each character with its romaji reading.
                </p>
                <div className="features">
                  <div className="feature">
                    <span className="feature-icon">📝</span>
                    <span>20 Random Questions</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">⏱️</span>
                    <span>No Time Limit</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🏆</span>
                    <span>Track Your Best</span>
                  </div>
                </div>
                <button onClick={startGame} className="start-button">
                  Start Game
                </button>
                <button onClick={openDictionary} className="dictionary-button">
                  📖 Open Hiragana Dictionary
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="game-screen">
            <div className="score-bar">
              <div className="progress-info">
                <span className="question-count">
                  Question {currentIndex + 1} / 20
                </span>
                <span className="current-score">
                  Score: {score} / 20
                </span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-fill"
                  style={{ width: `${((currentIndex + 1) / 20) * 100}%` }}
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
                    {currentIndex < 19 ? 'Next Character →' : 'Finish Game'}
                  </button>
                  <div className="hint-text">Press Enter to continue</div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Practice makes perfect! 頑張って!</p>
      </footer>
    </div>
  );
}

export default App;