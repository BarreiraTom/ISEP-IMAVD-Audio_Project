import React, { useState, useEffect } from "react";
import { useSpeechRecognition } from 'react-speech-kit';

import defaultImage from '../resources/imgs/user.png';

function PhotoPanel() {
  const [useImage, setUseImage] = useState(false);
  const [image, setImage] = useState(defaultImage);

  const submitImage = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      await setImage(URL.createObjectURL(img));
    }
  };

  const [sttValue, setSttValue] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
    setSttValue(result);
    },
  });

  const callListen = () => {
    if(listening){
      stop();
    } 
    listen();
  }

  // useEffect(() => {
  //   console.log(sttValue);
  //   switch (sttValue[0]){
  //     case "rotate":
  //         document.getElementsByClassName("PanelCanvas")[0].children[0].style.transform = "rotate("+sttValue[1]+"deg)"
  //       break;
  //   }
  // }, [sttValue]);

  //console.log(document.getElementsByClassName("PanelCanvas")[0].children);


  const changeShapesImage = async (event) => {
    // const tempTarget = event;
    // event.preventDefault()
    // console.log("-----------------------------------------------");
    // console.log(event);
    // console.log(image);
    // console.log(useImage);

    // if (image) await setUseImage(!useImage);

    // setTimeout(() => {
    //   console.log(useImage);
    // }, 1000)
  }

  return (
    <>
    <div>
      <div>
        <div className="button">
          <label for="uploadImage">Load Image</label>
          <input id="uploadImage" type="file" name="myImageFile" accept="image/*" onChange={submitImage.bind(this)}/>
        </div>

        <div className="labeledSwitch">
          <p className="inline">
            Shapes
          </p>
          <label className="switch inline">
            <input type="checkbox" onChange={(e) => setUseImage(e.target.checked)} />
            <span className="slider round"></span>
          </label>
          <p className="inline">
            Submitted<br/>Image
          </p>
        </div>

        <button onClick={callListen.bind()}>
          {!listening ? ("Speak") : ("Stop")}
        </button>
        
      </div>

      <div>
      {sttValue}
        {useImage ? (
          <div className="PanelCanvas">
            <img src={defaultImage} />
          </div>
        ) : (
          <div className="PanelCanvas">
            
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default PhotoPanel;