import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const oneIndexGesture = new GestureDescription('oneIndex'); 

// Index 
oneIndexGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
oneIndexGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.25);

oneIndexGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.75);
oneIndexGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.75);
oneIndexGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.25);
oneIndexGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.25);



for(let finger of [Finger.Middle, Finger.Ring,Finger.Pinky]){
    oneIndexGesture.addCurl(finger, FingerCurl.FullCurl, .75); 
    oneIndexGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}