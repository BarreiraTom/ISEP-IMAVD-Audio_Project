import React, { useState, useEffect, useCallback } from "react";

import './App.css';
import 'react-h5-audio-player/lib/styles.css';
import Audio from "./Audio/Audio";
import SpeechToText from "./SpeechToText/SpeechToText";
import TextToSpeech from "./TextToSpeech/TextToSpeech";

function App() {
  const sections = [
    { title: 'Audio player', description: 'Load an audio and play it here.', color: '#D2FFEA', element: <Audio /> },
    { title: 'Speech to text', description: 'Your audio is converted to text.', color: '#DFFFFF', element: <SpeechToText /> },
    { title: 'Text to speech', description: 'Your text is converted to audio.', color: '#DFEAFF', element: <TextToSpeech /> },
    { title: 'text compare', description: 'Comparison between text and audio.', color: '#FFFEDF', element: <></> },
    { title: 'verbal changes', description: 'Change an object’s appearance verbally.', color: '#FFE9DF', element: <></> },
    { title: 'photo panel', description: 'Change a person’s appearance verbally.', color: '#FFD7D7', element: <></> }
  ];

  return (
    <>
    {
    sections.map((section, i) =>
      <section>
        <div className="coloredDiv" style={{backgroundColor: section.color}}> 
          <h1>{'0' + (i + 1)}</h1>
          <div>
            <h2>{section.title}</h2>
            <span className="description">{section.description}</span>
          </div>
        </div>
        <div className="content" style={{ backgroundColor: (i%2 != 0) ? '#FAF9F9' : '' }}>
          {section.element}
        </div>
      </section>
      )}
    </>
  );
}

export default App;
