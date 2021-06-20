import React, { useState } from "react";
import { useSpeechRecognition } from 'react-speech-kit';

function VerbalChanges() {

    const defaultSquareStyle = {
        marginTop: "5px",
        width: 100,
        height: 100,
        backgroundColor: "DodgerBlue"
    };

    const sttStyle = {
        display: "block",
        textAlign: "center"
    }

    const defaultRectangleStyle = {
        width: 100 * 2,
        height: 100,
        backgroundColor: "red",
        marginTop: "5px",
    };
    const defaultCircleStyle = {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: "green",
        marginTop: "5px",
    };
    const styles = {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    };

    const buttonDiv = {
        marginTop: "20px",
        float: "right"
    };

    const voiceActions = ["rotate", "grow", "color", "colour", "shrink", "default", "duplicate"];
    const objects = ["square", "rectangle", "circle"];
    const colors = [
        "blue", "red", "green", "yellow", "black", "gray", "white"
    ]

    const getOccurrence = (array, value) => {
        return array.filter((v) => (v === value)).length;
    }

    const [squareStyle, setSquareStyle] = useState(defaultSquareStyle);
    const [rectangleStyle, setRectangleStyle] = useState(defaultRectangleStyle);
    const [circleStyle, setCircleStyle] = useState(defaultCircleStyle);
    const [duplicatedObjects, setDuplicatedObjects] = useState(objects);

    const [sttValue, setSttValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setSttValue(result);
        },
    });

    const executeInstruction = (styleArray, object, order, instruction) => {
        if (order === "color" || order === "colour") {
            styleArray.backgroundColor = colors.indexOf(instruction) !== -1 ? instruction : "blue";
        } else if (order === "grow") {
            styleArray.height = styleArray.height * 1.5;
            styleArray.width = styleArray.width * 1.5;
        } else if (order === "rotate") {
            if (instruction === "right") {
                styleArray.animation = 'spin 4s linear infinite'
            } else if (instruction === "left") {
                styleArray.animation = 'spin 4s linear infinite reverse'
            } else {
                styleArray.animation = ''
            }
        } else if (order === "shrink") {
            styleArray.height = styleArray.height * 0.5;
            styleArray.width = styleArray.width * 0.5;
        } else if (order === "default") {
            styleArray = defaultSquareStyle;
        } else if (order === "duplicate") {
            let newDuplicatedObjects = [...duplicatedObjects, ...Array(getOccurrence(duplicatedObjects, object)).fill(object)];
            setDuplicatedObjects(newDuplicatedObjects);
        }
        return styleArray;
    }

    const getInstructions = () => {
        if (sttValue === "default") {
            setDuplicatedObjects(objects);
            setSquareStyle(defaultSquareStyle)
            setRectangleStyle(defaultRectangleStyle)
            setCircleStyle(defaultCircleStyle)
        } else {
            let voiceCommand = sttValue.split(" ");
            if (voiceCommand.length === 2 || voiceCommand.length === 3) {
                let object = voiceCommand[0].toLocaleLowerCase();
                let order = voiceCommand[1].toLocaleLowerCase();
                let instruction = voiceCommand.length > 2 ? voiceCommand[2].toLocaleLowerCase() : "";

                console.log("object", object);
                console.log("order", order);
                console.log("instruction", instruction);

                if (objects.indexOf(object) !== -1 && voiceActions.indexOf(order) !== -1) {
                    switch (object) {
                        case "square":
                            let newSquareStyle = executeInstruction({ ...squareStyle }, object, order, instruction);
                            setSquareStyle(newSquareStyle);
                            break;
                        case "rectangle":
                            let newRectangleStyle = executeInstruction({ ...rectangleStyle }, object, order, instruction);
                            setRectangleStyle(newRectangleStyle);
                            break;
                        case "circle":
                            let newCircleStyle = executeInstruction({ ...circleStyle }, object, order, instruction);
                            setCircleStyle(newCircleStyle);
                            break;
                        default:
                            break;
                    }
                } else {
                    console.log("nao entrei");
                }
            } else {
                console.log("correu mal!");
            }
        }
    }

    const callListen = () => {
        if (listening) {
            stop();
            getInstructions();
        }
        listen({ lang: "en-US" });
    }

    return (
        <div>
            <div style={sttStyle}>{sttValue}</div>
            <div style={styles}>
                {
                    duplicatedObjects && duplicatedObjects.map((object, key) => {
                        if (object === "square") {
                            return (<div style={squareStyle}></div>)
                        } else if (object === "rectangle") {
                            return (<div style={rectangleStyle}></div>)
                        } else if (object === "circle") {
                            return (<div style={circleStyle}></div>)
                        }
                    })
                }
            </div>
            <div style={buttonDiv}>
                <button onClick={callListen.bind()}>
                    {!listening ? ("Speak") : ("Stop")}
                </button>
            </div>

        </div>
    )
}

export default VerbalChanges;