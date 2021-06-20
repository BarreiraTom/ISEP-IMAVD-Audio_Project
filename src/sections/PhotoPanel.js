import React, { useState } from "react";
import { useSpeechRecognition } from 'react-speech-kit';

import defaultImage from '../resources/imgs/user.png';

function PhotoPanel() {

  const voiceActions = ["rotate", "grow", "shrink", "default", "filter", "move"];

  const styles = {
    wrapper: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr"
    },
    images: {
      width: 100,
      height: "auto",
      position: "relative"
    },
    sttStyle: {
      display: "block",
      textAlign: "center"
    },
    wrapperBtns: {
      justifyContent: "space-between"
    }
  };

  const [imagesArray, setImagesArray] = useState([defaultImage]);
  const [addDisabled, setAddDisabled] = useState(false);
  const [imagesStyle, setImagesStyle] = useState(styles.images);


  const getInstructions = () => {
    let voiceCommand = sttValue.split(" ");
    if (sttValue === "default") {
      setImagesStyle(styles.images);
    } else {
      let order = voiceCommand[0].toLocaleLowerCase();
      let instruction = voiceCommand.length > 1 ? voiceCommand[1].toLocaleLowerCase() : "";

      console.log("order", order);
      console.log("instruction", instruction);

      let newImagesStyle = { ...imagesStyle };

      if (order === "rotate") {
        if (instruction === "left") {
          newImagesStyle.animation = 'spin 4s linear infinite reverse'
        } else if (instruction === "right") {
          newImagesStyle.animation = 'spin 4s linear infinite'
        } else {
          newImagesStyle.animation = ''
        }
      } else if (order === "grow") {
        newImagesStyle.width = newImagesStyle.width * 1.5;
      } else if (order === "shrink") {
        newImagesStyle.width = newImagesStyle.width * 0.5;
      } else if (order === "filter") {
        if(instruction === "red"){
          newImagesStyle.filter = "grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)"
        } else if(instruction === "blue"){
          newImagesStyle.filter = "grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8)"
        } else if(instruction === "green"){
          newImagesStyle.filter = "grayscale(100%) brightness(40%) sepia(100%) hue-rotate(50deg) saturate(1000%) contrast(0.8)"
        } 
      } else if (order === "move") {
        newImagesStyle.animation = "goingAround 5s normal infinite"
      }

      setImagesStyle(newImagesStyle);
    }
  }

  const submitImage = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      let newImagesArray = [...imagesArray]

      if (imagesArray[0] === defaultImage) {
        newImagesArray[0] = URL.createObjectURL(img);
      } else {
        newImagesArray.push(URL.createObjectURL(img))
      }
      if (newImagesArray.length === 6) {
        setAddDisabled(true);
      }
      await setImagesArray(newImagesArray);
    }
  };

  const [sttValue, setSttValue] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setSttValue(result);
    },
  });

  const callListen = () => {
    if (listening) {
      stop();
      getInstructions();
    }
    if (!listening) {
      setSttValue('');
    }
    listen({ lang: "en-US" });
  }

  return (
    <>
      <div>
        <div style={styles.wrapperBtns}>
          <div className="button">
            <label htmlFor="uploadImage">Load Image</label>
            <input id="uploadImage" type="file" name="myImageFile" accept="image/*" onChange={submitImage.bind(this)} disabled={addDisabled} />
          </div>

          <button onClick={callListen.bind()}>
            {!listening ? ("Speak") : ("Stop")}
          </button>
        </div>
        <div style={styles.sttStyle}>{sttValue}</div>
        <div style={styles.wrapper}>
          {imagesArray.map((image, key) => {
            return (<img key={key} src={image} style={imagesStyle} />)
          })}
        </div>
      </div>
    </>
  );
}

export default PhotoPanel;