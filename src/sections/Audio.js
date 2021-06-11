import React, { useState } from "react";
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';

function Audio() {
  const [audio, setAudio] = useState();

  const submitAudio = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let audio = event.target.files[0];
      await setAudio(URL.createObjectURL(audio));
    }
  };

  return (
    <>
      <div className="audio">
        <AudioPlayer
          src={audio}
          onPlay={e => console.log("onPlay")}
        />
        <div className="button">
          <label for="uploadAudio">Load Audio</label>
          <input id="uploadAudio" type="file" name="myAudioFile" accept="audio/*" onChange={submitAudio.bind(this)}/>
        </div>
      </div>
    </>
  );
}

export default Audio;