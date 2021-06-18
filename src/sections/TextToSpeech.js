import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from 'react-speech-kit';

function TextToSpeech() {
    const [speechVoice, setSpeechVoice] = useState();
    const [isRecording, setIsRecording] = useState(false);

    const [value, setValue] = useState('');
    const { voices, speak } = useSpeechSynthesis();

    const changeSelectedVoice = e => setSpeechVoice(e.target.selectedIndex);

    return (
        <>
            <div>
                <div>
                    <label className="label">Select your language</label>
                    <select name="voices" id="voices" onChange={changeSelectedVoice.bind(this)} >
                        {
                            voices.map((voice, key) => {
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

                <button id="speak" onClick={() => speak({ text: value, voice: voices[speechVoice] })}>Speak</button>
            </div>
        </>
    );
}

export default TextToSpeech;