import React from 'react';
import './Flashcard.css';

function Flashcard({ character, showAnswer, romaji, feedback }) {
  return (
    <div className={`flashcard-container ${showAnswer ? 'revealed' : ''} ${feedback}`}>
      <div className="flashcard">
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div className="character-display">
              {character}
            </div>
            <div className="flashcard-label">Hiragana</div>
          </div>
          {showAnswer && (
            <div className="flashcard-back">
              <div className="romaji-display">
                {romaji}
              </div>
              <div className="character-small">
                {character}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;