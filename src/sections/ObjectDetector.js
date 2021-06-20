import React, { useState, useEffect } from "react";

import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";

import { makeStyles } from "@material-ui/core/styles";

function ObjectDetector() {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));
    const classes = useStyles();

    const webcamRef = React.useRef(null);

    const [videoWidth, setVideoWidth] = useState(960);
    const [videoHeight, setVideoHeight] = useState(640);


    const [model, setModel] = useState();

    async function loadModel() {
        try {
            const model = await cocoSsd.load();
            setModel(model);
            console.log("setloadedModel");
        } catch (err) {
            console.log(err);
            console.log("failed load model");
        }
    }

    useEffect(() => {
        tf.ready().then(() => {
            loadModel();
        });
    }, []);

    async function predictionFunction() {
        const predictions = await model.detect(document.getElementById("img"));
        setVideoHeight(webcamRef.current.video.videoHeight);
        setVideoWidth(webcamRef.current.video.videoWidth);
        var cnvs = document.getElementById("myCanvas");


        var ctx = cnvs.getContext("2d");
        ctx.clearRect(
            0,
            0,
            webcamRef.current.video.videoWidth,
            webcamRef.current.video.videoHeight
        );

        if (predictions.length > 0) {
            console.log(predictions);
            for (let n = 0; n < predictions.length; n++) {
                // Check scores
                console.log(n);
                if (predictions[n].score > 0.7) {
                    let bboxLeft = predictions[n].bbox[0];
                    let bboxTop = predictions[n].bbox[1];
                    let bboxWidth = predictions[n].bbox[2];
                    let bboxHeight = predictions[n].bbox[3] - bboxTop;

                    console.log("bboxLeft: " + bboxLeft);
                    console.log("bboxTop: " + bboxTop);

                    console.log("bboxWidth: " + bboxWidth);

                    console.log("bboxHeight: " + bboxHeight);

                    ctx.beginPath();
                    ctx.font = "28px Arial";
                    ctx.fillStyle = "red";

                    ctx.fillText(
                        predictions[n].class +
                        ": " +
                        Math.round(parseFloat(predictions[n].score) * 100) +
                        "%",
                        bboxLeft,
                        bboxTop
                    );

                    ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
                    ctx.strokeStyle = "#FF0000";

                    ctx.lineWidth = 3;
                    ctx.stroke();

                    console.log("detected");
                }
            }
        }

        setTimeout(() => predictionFunction(), 500);
    }

    function detectWebcam(callback) {
        let md = navigator.mediaDevices;
        if (!md || !md.enumerateDevices) return callback(false);
        md.enumerateDevices().then(devices => {
            console.log(devices);
            callback(devices.some(device => 'videoinput' === device.kind));
        })
    }

    detectWebcam(function (hasWebcam) {
        console.log('Webcam: ' + (hasWebcam ? 'yes' : 'no'));
    })

    const videoConstraints = {
        height: 1080,
        width: 1920,
        maxWidth: "100vw",
        facingMode: "environment",
    };

    return (
        <div style={{ position: "relative" }}>
            <button
                onClick={() => {
                    predictionFunction();
                }}
            >
                Start Detect
            </button>
            <div style={{ position: "absolute", zIndex: "9999" }}>
                <canvas
                    id="myCanvas"
                    width={videoWidth}
                    height={videoHeight}
                    style={{ backgroundColor: "transparent" }}
                />
            </div>
            <div style={{ position: "absolute" }}>
                <Webcam
                    audio={false}
                    id="img"
                    ref={webcamRef}
                    // width={}
                    screenshotQuality={1}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
            </div>
        </div>)

}

export default ObjectDetector;