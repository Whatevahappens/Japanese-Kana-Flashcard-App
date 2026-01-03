import React, { useState } from 'react';
import './App.css';
import Training from './components/Training';
import Test from './components/Test';
import { HIRAGANA_CHARACTERS } from './data/hiragana';
import { KATAKANA_CHARACTERS } from './data/katakana';

function App() {
  const [currentView, setCurrentView] = useState('home'); // home, scriptSelect, modeSelect, training, test
  const [selectedScript, setSelectedScript] = useState(null); // 'hiragana' or 'katakana'

  const selectScript = (script) => {
    setSelectedScript(script);
    setCurrentView('modeSelect');
  };

  const selectMode = (mode) => {
    setCurrentView(mode); // 'training' or 'test'
  };

  const backToHome = () => {
    setCurrentView('home');
    setSelectedScript(null);
  };

  const backToModeSelect = () => {
    setCurrentView('modeSelect');
  };

  const getCurrentCharacters = () => {
    return selectedScript === 'hiragana' ? HIRAGANA_CHARACTERS : KATAKANA_CHARACTERS;
  };

  const getScriptName = () => {
    return selectedScript === 'hiragana' ? 'Hiragana' : 'Katakana';
  };

  return (
    <div className="App">
      <div className="background-pattern"></div>
      
      <header className="header">
        <h1 className="title" onClick={backToHome} style={{ cursor: 'pointer' }}>
          <span className="title-japanese">仮名マスター</span>
          <span className="title-english">Kana Master</span>
        </h1>
      </header>

      <main className="main-content">
        {currentView === 'home' && (
          <div className="home-screen">
            <div className="welcome-card">
              <h2>Choose Your Script</h2>
              <p className="subtitle">Select which Japanese writing system you want to practice</p>
              
              <div className="script-buttons">
                <button onClick={() => selectScript('hiragana')} className="script-button hiragana">
                  <span className="script-char">あ</span>
                  <span className="script-name">Hiragana</span>
                  <span className="script-desc">46 Characters</span>
                </button>
                
                <button onClick={() => selectScript('katakana')} className="script-button katakana">
                  <span className="script-char">ア</span>
                  <span className="script-name">Katakana</span>
                  <span className="script-desc">46 Characters</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'modeSelect' && (
          <div className="mode-select-screen">
            <button onClick={backToHome} className="back-button-top">
              ← Back to Home
            </button>
            
            <div className="mode-card">
              <h2>{getScriptName()} Practice</h2>
              <p className="subtitle">Choose how you want to learn</p>
              
              <div className="mode-buttons">
                <button onClick={() => selectMode('training')} className="mode-button training">
                  <span className="mode-icon">📚</span>
                  <span className="mode-name">Training Mode</span>
                  <span className="mode-desc">Study all characters with flashcards</span>
                  <ul className="mode-features">
                    <li>View all {getCurrentCharacters().length} characters</li>
                    <li>Click to flip and reveal romaji</li>
                    <li>Perfect for memorization</li>
                  </ul>
                </button>
                
                <button onClick={() => selectMode('test')} className="mode-button test">
                  <span className="mode-icon">✍️</span>
                  <span className="mode-name">Test Mode</span>
                  <span className="mode-desc">Quiz yourself on your knowledge</span>
                  <ul className="mode-features">
                    <li>Choose 5, 10, 15, 20, or all characters</li>
                    <li>Type the romaji reading</li>
                    <li>Track your score</li>
                  </ul>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'training' && (
          <Training 
            characters={getCurrentCharacters()}
            scriptName={getScriptName()}
            onBack={backToModeSelect}
          />
        )}

        {currentView === 'test' && (
          <Test 
            characters={getCurrentCharacters()}
            scriptName={getScriptName()}
            onBack={backToModeSelect}
          />
        )}
      </main>

      <footer className="footer">
        <p>Practice makes perfect! 頑張って!</p>
      </footer>
    </div>
  );
}

export default App;