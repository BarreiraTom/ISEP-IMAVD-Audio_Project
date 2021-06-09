/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";

import "./audioPlayer.css";

import playIcon from "../../resources/imgs/play-icon.png";
import pauseIcon from "../../resources/imgs/pause-icon.png";
import stopIcon from "../../resources/imgs/stop-icon.png";
import skipFwdIcon from "../../resources/imgs/skip-fwd-icon.png";
import skipBcwdIcon from "../../resources/imgs/skip-bcwd-icon.png";

export default function AudioPlayer(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [curTime, setCurTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const handleChange = (event) => {
    setVolume({value: event.target.value});
  }

  return (
    <>
      <div id="player">
        <div id="timeline">
          <label id="curTime">0:00</label>
          <input
            id="audioTime"
            type="range"
            step="1"
            min="0"
            max="0"
            value="0"
          />
          <label id="finalTime">0:00</label>
        </div>
        <div id="audioControls">
          <input
            type="image"
            src={skipBcwdIcon}
            onclick="skipBcwd_aud()"
          />
          {isPlaying ? (
            <input
              type="image"
              src={pauseIcon}
              onclick="pause_aud()"
            />
          ) : (
            <input
              type="image"
              src={playIcon}
              onclick="play_aud()"
            />
          )}
          <input
            type="image"
            src={stopIcon}
            onclick="stop_aud()"
          />
          <input
            type="image"
            src={skipFwdIcon}
            onclick="skipFF_aud()"
          />
          <div id="audioVolume">
            <img src="images/volume.png" />
            <input
              type="range"
              onChange={handleChange.bind(this)}
              step="0.05"
              min="0"
              max="1"
              value={volume}
            />
          </div>
        </div>
      </div>
    </>
  );
}
