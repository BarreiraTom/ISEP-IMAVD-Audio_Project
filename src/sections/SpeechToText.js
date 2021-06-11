import React, { useState } from "react";
import { useSpeechRecognition } from 'react-speech-kit';

function SpeechToText() {

    const [sttValue, setSttValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
        setSttValue(result);
        },
    });

    const callListen = () => {
        if(listening){
          stop();
          return 0;
        } 
        listen();
    }

    return(
        <>
        <div>
            <label className="label">Record your audio</label>   
            <button onClick={callListen.bind()}>
                {!listening ? ("Record") : ("Stop")}
            </button>
            <label className="label" id="strongLabel">Your text to speech will appear here:</label>
            <p>{sttValue}</p>
            {/*listening && <div>Go ahead I'm listening</div>*/}
        </div>
        </>
    );
}

export default SpeechToText;