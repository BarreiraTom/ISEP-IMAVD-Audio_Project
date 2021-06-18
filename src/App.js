import React from "react";

import "./App.css";
import "react-h5-audio-player/lib/styles.css";
import BurgerMenu from "./components/burgerMenu/Menu";
import audio from './resources/audioExercises.json';
import video from './resources/videoExercises.json';
import Audio from "./sections/Audio";
import SpeechToText from "./sections/SpeechToText";
import TextToSpeech from "./sections/TextToSpeech";
import TextCompare from "./sections/TextCompare";
import PhotoPanel from "./sections/PhotoPanel";
import VerbalChanges from "./sections/VerbalChanges";


function App() {
  const audioElements = [
    <Audio />,
    <SpeechToText />,
    <TextToSpeech />,
    <TextCompare />,
    <VerbalChanges/>,
    <PhotoPanel />
  ];

  audio.exercises.forEach((exercise, i) => {
    exercise.element = audioElements[i];
  });

  const videoElements = [
    <></>,
    <></>,
    <></>
  ];

  video.exercises.forEach((exercise, i) => {
    exercise.element = videoElements[i];
  });

  const exercises = audio.exercises.concat(video.exercises);

  console.log(exercises);

  return (
    <>
      <BurgerMenu audioLinks={audio} videoLinks={video} />
      {exercises.map((exercise, i) => (
        <section key={exercise.id} id={exercise.id}>
          <div
            className="coloredDiv"
            style={{ backgroundColor: exercise.color }}
          >
            <h1>{exercise.id.toLocaleString('en-US', { minimumIntegerDigits: 2 })}</h1>
            <div>
              <h2>{exercise.title}</h2>
              <span className="description">{exercise.description}</span>
            </div>
          </div>
          <div
            className="content"
            style={{ backgroundColor: i % 2 !== 0 ? "#FAF9F9" : "" }}
          >
            {exercise.element}
          </div>
        </section>
      ))}
    </>
  );
}

export default App;
