import React, { useState, useEffect, useCallback } from "react";
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';
import AudioPlayer from 'react-h5-audio-player';

import AP from './components/audioPlayer/audioPlayer'

import './App.css';
import 'react-h5-audio-player/lib/styles.css';

function App() {

  const [audio, setAudio] = useState();
  const [speechVoice, setSpeechVoice] = useState();
  const [isRecording, setIsRecording] = useState(false);

  const submitAudio = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let audio = event.target.files[0];
      await setAudio(URL.createObjectURL(audio));
    }
  };


  const [sttValue, setSttValue] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setSttValue(result);
    },
  });
 
  const [value, setValue] = useState('');
  const { voices, speak } = useSpeechSynthesis();

  const changeSelectedVoice = e => setSpeechVoice(e.target.selectedIndex);

  const callListen = () => {
    if(listening){
      stop();
    } 
    listen();
  }
  
  useEffect(() => {
    console.log(voices);
  }, [])

  return (
    <>
      <input type="file" name="myfile" accept="audio/*" onChange={submitAudio.bind(this)}/>
      {/* <AudioPlayer
        src={audio}
        onPlay={e => console.log("onPlay")}
      /> */}

      <AP></AP>


      <br/><br/><br/>

      <div>
      <textarea
        value={sttValue}
        onChange={(event) => setSttValue(event.target.value)}
      />
      <button onClick={callListen.bind()}>
        {!listening ? ("🎤") : ("🛑")}
      </button>
      {listening && <div>Go ahead I'm listening</div>}
    </div>

    <br/><br/><br/>

    <div>
    <select name="voices" id="voices" onChange={changeSelectedVoice.bind(this)} >
      {
        voices.map((voice,key) => {
          return (voice.default ? (
            <option 
              key={key} 
              value={voice.lang}
              selected
            >{voice.name}</option>
          ) : (
            <option 
              key={key} 
              value={voice.lang}
            >{voice.name}</option>
          ));
        })
      }
    </select>

      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={() => speak({ text: value , voice: voices[speechVoice] })}>Speak</button>
    </div>
    </>
  );
}

export default App;
