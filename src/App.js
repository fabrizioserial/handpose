import React,{useRef,useState,useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"
import Webcam from 'react-webcam'
import { drawHand } from '../src/utilities';
import * as fp from 'fingerpose'
import {useSpeechSynthesis} from 'react-speech-kit'

import {loveYouGesture} from '../src/LoveYou'
import {oneIndexGesture} from '../src/one/OneIndex'
import {oneThumbGesture} from '../src/one/OneThumb'
import { twoThumbIndexGesture } from './two/TwoThumbIndex';


function App() {

  const [value,setText] = useState('')
  //speech
  const {speak,voices } = useSpeechSynthesis()

  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  const runHandpose = async () =>{
    const net = await handpose.load()
    //console.log("Handpose loaded")

    setInterval(()=>{
      detect(net)
    },1500)
  }

  const detect = async (net)=>{
    if(
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4 ){
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const hand = await net.estimateHands(video)

        if(hand.length > 0){
          const GE = new fp.GestureEstimator([
            //fp.Gestures.ThumbsUpGesture,
            //loveYouGesture
            oneIndexGesture,
            oneThumbGesture,
            twoThumbIndexGesture
          ])

          const gesture = await GE.estimate(hand[0].landmarks,4)
          if(gesture.gestures !== undefined && gesture.gestures.length > 0){
            console.log(gesture)
            const confidence = gesture.gestures.map(prediction => prediction.confidence)
            const maxConfidence =confidence.indexOf(Math.max.apply(null,confidence))

            if(gesture.gestures[maxConfidence].name === 'oneThumb'){
              setText("oneThumb")
              console.log(gesture)
            }else if(gesture.gestures[maxConfidence].name == 'oneIndex'){
              setText("oneIndex")
              console.log(gesture)
            }else if(gesture.gestures[maxConfidence].name === 'twoThumbIndex'){
              setText("twoThumbIndex")
              console.log(gesture)
            }
            //console.log("use state: ",value)
           //console.log(gesture.gestures[maxConfidence].name)
          }
        }

        const ctx = canvasRef.current.getContext("2d")
        drawHand(hand,ctx)
      }
  }

  useEffect(()=>{
    if('oneThumb' === value){
      speak({text:"UNO",voice:voices[3]})
    }
    if('twoThumbIndex' === value){
      speak({text:"DOS",voice:voices[3]})
    }
    if('oneIndex' === value){
      speak({text:"UNO",voice:voices[3]})
    }
  },[value])

runHandpose()



  return (
    <div className="App">
      <header className="App-header">

        <Webcam ref={webcamRef}
        style={{
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          textAlign:"center",
          zindex:9,
          width:640,
          height:480
        }}/>
        <canvas ref={canvasRef}
        style={{
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          textAlign:"center",
          zindex:9,
          width:640,
          height:480
        }}
        />
      </header>
    </div>
  );
}

export default App;
