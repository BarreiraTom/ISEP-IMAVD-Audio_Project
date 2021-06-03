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
        } 
        listen();
    }

    return(
        <>
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
        </>
    );
}

export default SpeechToText;