import React, { useState } from 'react';
import './Training.css';

function Training({ characters, scriptName, onBack }) {
  const [flippedCards, setFlippedCards] = useState(new Set());

  const toggleCard = (index) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(index)) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
    }
    setFlippedCards(newFlipped);
  };

  const flipAllCards = () => {
    if (flippedCards.size === characters.length) {
      setFlippedCards(new Set());
    } else {
      setFlippedCards(new Set(characters.map((_, i) => i)));
    }
  };

  return (
    <div className="training">
      <div className="training-header">
        <button onClick={onBack} className="back-button">
          ← Back
        </button>
        <h2 className="training-title">{scriptName} Training</h2>
        <button onClick={flipAllCards} className="flip-all-button">
          {flippedCards.size === characters.length ? 'Hide Romaji' : 'Show Romaji'}
        </button>
      </div>

      <div className="training-info">
        <p>Click any card to flip and see the romaji reading. Study all {characters.length} characters!</p>
      </div>

      <div className="training-grid">
        {characters.map((char, index) => (
          <div
            key={index}
            className={`training-card ${flippedCards.has(index) ? 'flipped' : ''}`}
            onClick={() => toggleCard(index)}
          >
            <div className="training-card-inner">
              <div className="training-card-front">
                <span className="training-character">{char.character}</span>
              </div>
              <div className="training-card-back">
                <span className="training-romaji">{char.romaji}</span>
                <span className="training-character-small">{char.character}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="training-footer">
        <p>Total: {characters.length} characters</p>
      </div>
    </div>
  );
}

export default Training;