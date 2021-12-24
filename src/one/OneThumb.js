import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const oneThumbGesture = new GestureDescription('oneThumb'); 

// Thumb 
oneThumbGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
oneThumbGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25);
oneThumbGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25);
oneThumbGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.25);


for(let finger of [Finger.Middle, Finger.Ring,Finger.Index,Finger.Pinky]){
    oneThumbGesture.addCurl(finger, FingerCurl.FullCurl, .75); 
    oneThumbGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}