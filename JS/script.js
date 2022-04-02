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
//Icon出力先要素格納
const opponentsRightTarget = document.getElementById("opponentsRight");
const opponentsLeftTarget = document.getElementById("opponentsLeft");
const playersRightTarget = document.getElementById("playersRight");
const playersLeftTarget = document.getElementById("playersLeft");
//選択した番号表示先格納
const totalDisplay = document.getElementById("totalDisplay")
const myDisplay = document.getElementById("myDisplay")

//初期化
let maxFinger = 4;
let totalFinger = undefined;
let myFinger = undefined;

//buttonクリックイベント付与対象要素格納
const totalFingerEvent = document.querySelectorAll(".totalFingerEvent");
const myFingerEvent = document.querySelectorAll(".myFingerEvent");
const readyFight = document.querySelectorAll(".readyFight");

//選択された数字を画面に反映 & 数字を返す
function addTotalFinger(elem) {
    totalDisplay.innerText = elem.innerText;
    return elem.innerText;
}
function addMyFinger(elem) {
    myDisplay.innerText = elem.innerText;
    return elem.innerText;
}

//各ボタンにクリックイベントを付与
function addEvent(elem) {
    if (elem.classList.contains("totalFingerEvent") === true) {
        elem.addEventListener("click", () => totalFinger = addTotalFinger(elem));
    } else if (elem.classList.contains("myFingerEvent") === true) {
        elem.addEventListener("click", () => myFinger = addMyFinger(elem));
    } else {
        elem.addEventListener("click", getReadyFight);
    }
}

//イベント付与関数を呼び出し
totalFingerEvent.forEach(addEvent)
myFingerEvent.forEach(addEvent)
readyFight.forEach(addEvent)

function getReadyFight () {
    
}

