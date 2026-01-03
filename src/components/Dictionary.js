import React, { useState } from 'react';
import './Dictionary.css';
import { HIRAGANA_CHARACTERS } from '../data/hiragana';

function Dictionary({ onBackToHome }) {
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
    if (flippedCards.size === HIRAGANA_CHARACTERS.length) {
      setFlippedCards(new Set());
    } else {
      setFlippedCards(new Set(HIRAGANA_CHARACTERS.map((_, i) => i)));
    }
  };

  return (
    <div className="dictionary">
      <div className="dictionary-header">
        <button onClick={onBackToHome} className="back-button">
          ← Back to Game
        </button>
        <h2 className="dictionary-title">Hiragana Dictionary</h2>
        <button onClick={flipAllCards} className="flip-all-button">
          {flippedCards.size === HIRAGANA_CHARACTERS.length ? 'Show All Characters' : 'Show All Romaji'}
        </button>
      </div>

      <div className="dictionary-info">
        <p>Click any card to flip and see the romaji reading. Study all 46 characters!</p>
      </div>

      <div className="dictionary-grid">
        {HIRAGANA_CHARACTERS.map((char, index) => (
          <div
            key={index}
            className={`dict-card ${flippedCards.has(index) ? 'flipped' : ''}`}
            onClick={() => toggleCard(index)}
          >
            <div className="dict-card-inner">
              <div className="dict-card-front">
                <span className="dict-character">{char.character}</span>
              </div>
              <div className="dict-card-back">
                <span className="dict-romaji">{char.romaji}</span>
                <span className="dict-character-small">{char.character}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dictionary-footer">
        <p>Total: {HIRAGANA_CHARACTERS.length} characters</p>
      </div>
    </div>
  );
}

export default Dictionary;