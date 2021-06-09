import React, { useState, useEffect, useCallback } from "react";

import AP from "./components/audioPlayer/audioPlayer";

import "./App.css";
import "react-h5-audio-player/lib/styles.css";
import BurgerMenu from "./components/burgerMenu/Menu";
import Audio from "./sections/Audio";
import SpeechToText from "./sections/SpeechToText";
import TextToSpeech from "./sections/TextToSpeech";

function App() {
  const sections = [
    {
      title: "Audio player",
      description: "Load an audio and play it here.",
      color: "#D2FFEA",
      element: <Audio />,
      id: 1,
    },
    {
      title: "Speech to text",
      description: "Your audio is converted to text.",
      color: "#DFFFFF",
      element: <SpeechToText />,
      id: 2,
    },
    {
      title: "Text to speech",
      description: "Your text is converted to audio.",
      color: "#DFEAFF",
      element: <TextToSpeech />,
      id: 3,
    },
    {
      title: "text compare",
      description: "Comparison between text and audio.",
      color: "#FFFEDF",
      element: <></>,
      id: 4,
    },
    {
      title: "verbal changes",
      description: "Change an object’s appearance verbally.",
      color: "#FFE9DF",
      element: <></>,
      id: 5,
    },
    {
      title: "photo panel",
      description: "Change a person’s appearance verbally.",
      color: "#FFD7D7",
      element: <></>,
      id: 6,
    },
  ];

  return (
    <>
      <BurgerMenu links={sections} />
      {sections.map((section, i) => (
        <section key={section.id} id={section.id}>
          <div
            className="coloredDiv"
            style={{ backgroundColor: section.color }}
          >
            <h1>{"0" + (i + 1)}</h1>
            <div>
              <h2>{section.title}</h2>
              <span className="description">{section.description}</span>
            </div>
          </div>
          <div
            className="content"
            style={{ backgroundColor: i % 2 !== 0 ? "#FAF9F9" : "" }}
          >
            {section.element}
          </div>
        </section>
      ))}
    </>
  );
}

export default App;
