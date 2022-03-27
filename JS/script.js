//FistIcon格納
const opponentsRightFist = "fa fa-hand-grab-o d-flex align-items-center justify-content-center opponentFingerSize_Common opponentFist_right";
const opponentsLeftFist = "fa fa-hand-grab-o fa-flip-horizontal d-flex align-items-center justify-content-center opponentFingerSize_Common opponentFist_left";
const playersRightFist = "fa fa-hand-grab-o d-flex align-items-center justify-content-center playerFingerSize_Common playerFist_right";
const playersLeftFist = "fa fa-hand-grab-o fa-flip-horizontal d-flex align-items-center justify-content-center playerFingerSize_Common playerFist_left";
//2FingersIcon格納
const twoFingersToRightOfOpponent = "fa fa-thumbs-o-up d-flex align-items-center justify-content-center opponentFingerSize_Common opponentFinger_right";
const twoFingersToLeftOfOpponent = "fa fa-thumbs-o-down d-flex align-items-center justify-content-center opponentFingerSize_Common opponentFinger_left";
const twoFingersToRightOfPlayer = "fa fa-thumbs-o-down d-flex align-items-center justify-content-center playerFingerSize_Common playerFinger_right";
const twoFingersToLeftOfPlayer = "fa fa-thumbs-o-up d-flex align-items-center justify-content-center playerFingerSize_Common playerFinger_left";
//4FingersIcon格納
const fourFingersToRightOfOpponent = "fa fa-hand-o-right d-flex align-items-center justify-content-center opponentFingerSize_Common opponentFinger_right";
const fourFingersToLeftOfOpponent = "fa fa-hand-o-left d-flex align-items-center justify-content-center opponentFingerSize_Common opponent4Finger_left";
const fourFingersToRightOfPlayer = "fa fa-hand-o-left d-flex align-items-center justify-content-center playerFingerSize_Common player4Finger_right";
const fourFingersToLeftOfPlayer = "fa fa-hand-o-right d-flex align-items-center justify-content-center playerFingerSize_Common playerFinger_left";


function test(actual, expected) {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log("Test PASSED.");
    } else {
        console.error("Test FAILED. Keep trying!");
        console.group("Result:");
        console.log(actual);
        console.log(expected);
        console.trace();
        console.groupEnd();
    }
}
