import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const twoThumbIndexGesture = new GestureDescription('twoThumbIndex'); 

// Thumb 
twoThumbIndexGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
twoThumbIndexGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.25);

twoThumbIndexGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
twoThumbIndexGesture.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.25);
twoThumbIndexGesture.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.25);



for(let finger of [Finger.Middle, Finger.Ring,Finger.Pinky]){
    twoThumbIndexGesture.addCurl(finger, FingerCurl.FullCurl, .75); 
    twoThumbIndexGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}