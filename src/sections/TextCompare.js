import React, { useState, useEffect } from "react";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';

function TextCompare() {
    const [speechVoice, setSpeechVoice] = useState();
    const [isRecording, setIsRecording] = useState(false);

    const [value, setValue] = useState('');
    const { voices, speak } = useSpeechSynthesis();
  
    const changeSelectedVoice = e => setSpeechVoice(e.target.selectedIndex);

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
            <div>
                <label className="label">Select your language</label>
                <select name="voices" id="voices" onChange={""} >
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
            </div> 

            <div>
                <label className="label">Write here your text</label>
                <textarea
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </div>
            
            <div id="textCompareRecordContainer">
                <div id="textCompareRecordLabel">
                    <label className="label">Record your audio</label>   
                    <button onClick={callListen.bind()}>
                        {!listening ? ("Record") : ("Stop")}
                    </button>
                </div>
                <label className="label" id="strongLabel">Your text to speech will appear here:</label>
                <p>{sttValue}</p>
                {/*listening && <div>Go ahead I'm listening</div>*/}
            </div>
        </div>
        </>
    );
}

export default TextCompare;