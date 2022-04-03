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

//ボタン取得
const totalBtn = document.getElementsByClassName("totalBtn");
const fightingBtn = document.getElementsByClassName("fightingBtn");

//オブジェクトにまとめてアクセス簡略化
const fingerObj = {
    "com" : {
        "rightFist" : "fa fa-hand-grab-o d-flex align-items-center justify-content-center comFingerSize_Common comFist_right",
        "leftFist" : "fa fa-hand-grab-o fa-flip-horizontal d-flex align-items-center justify-content-center comFingerSize_Common comFist_left",
        "twoFingersToRight" : "fa fa-thumbs-o-up d-flex align-items-center justify-content-center comFingerSize_Common comFinger_right",
        "twoFingersToLeft" : "fa fa-thumbs-o-down d-flex align-items-center justify-content-center comFingerSize_Common comFinger_left",
        "fourFingersToRight" : "fa fa-hand-o-right d-flex align-items-center justify-content-center comFingerSize_Common comFinger_right",
        "fourFingersToLeft" : "fa fa-hand-o-left d-flex align-items-center justify-content-center comFingerSize_Common com4Finger_left",
        "showRight" : document.getElementById("comRight"),
        "showLeft" : document.getElementById("comLeft"),
    },
    "player" : {
        "rightFist" : "fa fa-hand-grab-o d-flex align-items-center justify-content-center playerFingerSize_Common playerFist_right",
        "leftFist" : "fa fa-hand-grab-o fa-flip-horizontal d-flex align-items-center justify-content-center playerFingerSize_Common playerFist_left",
        "twoFingersToRight" : "fa fa-thumbs-o-down d-flex align-items-center justify-content-center playerFingerSize_Common playerFinger_right",
        "twoFingersToLeft" : "fa fa-thumbs-o-up d-flex align-items-center justify-content-center playerFingerSize_Common playerFinger_left",
        "fourFingersToRight" : "fa fa-hand-o-left d-flex align-items-center justify-content-center playerFingerSize_Common player4Finger_right",
        "fourFingersToLeft" : "fa fa-hand-o-right d-flex align-items-center justify-content-center playerFingerSize_Common playerFinger_left",
        "showRight" : document.getElementById("playersRight"),
        "showLeft" : document.getElementById("playersLeft"),
    },
};

//選択した番号表示先格納
const totalDisplay = document.getElementById("totalDisplay");
const myDisplay = document.getElementById("myDisplay");
const expectedDisplayOfCom = document.getElementById("expectedDisplayOfCom");
//待機時処理
const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//resultテキスト
const turnAndResult = document.getElementsByClassName("turnAndResult");
const colorList = ["turnAndResult_red", "turnAndResult_blue", "turnAndResult_green"];
//ターン判断フラグ
let turnFlg = true;
let isWinnerFlg = false;

//現在残ってる指
let totalOfFingersNow = 4;
let playersRemainingFingers = 2;
let comRemainingFingers = 2;
//予想の合計
let totalExpectedOfPlayer = 0;
let totalExpectedOfCom = 0;
//実際に出す指の数
let playersFightingFingers = 0;
let comFightingFingers = 0;
//COMの学習
let max = 0;
let min = 0;

//初期化
function resetOnce () {
    totalExpectedOfPlayer = 0;
    totalExpectedOfCom = 0;
    playersFightingFingers = 0;
    comFightingFingers = 0;
    totalDisplay.innerText = 0;
    myDisplay.innerText = 0;
}

function resetAll () {
    totalOfFingersNow = 4;
    playersRemainingFingers = 2;
    comRemainingFingers = 2;
}

//勝敗の判断
function winOrLose () {
    if (playersRemainingFingers === 0 && turnFlg === true) {  //プレイヤーゲーム勝利の場合
        resetOnce();
        closeFingers(playersRemainingFingers, "player");
        closeFingers(comRemainingFingers, "com");
        resetAll();
        expectedDisplayOfCom.innerText = 0;
        showTurnAndResult("You Win !!!", "red");
        resultModalToggleLabel.innerHTML = "You Win! Congratulation!!! <i class='fa fa-thumbs-o-up fa-2x'></i><i class='fa fa-thumbs-o-up fa-2x'></i>"
        return true;
    } else if (comRemainingFingers === 0 && turnFlg === false) {  //COMゲーム勝利の場合
        resetOnce();
        closeFingers(playersRemainingFingers, "player");
        closeFingers(comRemainingFingers, "com");
        resetAll();
        expectedDisplayOfCom.innerText = 0;
        showTurnAndResult("You Lose......", "red");
        resultModalToggleLabel.innerHTML = "All right, cheer up!! <i class='fa fa-thumbs-o-up fa-2x'></i>"
        return true;
    }
}

//buttonクリックイベント付与対象要素格納
const totalFingerEvent = document.querySelectorAll(".totalFingerEvent");
const myFingerEvent = document.querySelectorAll(".myFingerEvent");
const readyFight = document.querySelectorAll(".readyFight");
const modalButton = document.querySelector("#modalButton");
const resultModalToggleLabel = document.querySelector("#resultModalToggleLabel");

//イベント付与関数を呼び出し
totalFingerEvent.forEach(addEvent);
myFingerEvent.forEach(addEvent);
readyFight.forEach(addEvent);

//選択された数字を画面に反映 & 数字を返す
function addTotalFinger(elem) {
    totalDisplay.innerText = elem.innerText;
    return Number(elem.innerText);
}
function addMyFinger(elem) {
    myDisplay.innerText = elem.innerText;
    return Number(elem.innerText);
}

//各ボタンにクリックイベントを付与
function addEvent(elem) {
    if (elem.classList.contains("totalFingerEvent") === true) {
        elem.addEventListener("click", () => totalExpectedOfPlayer = addTotalFinger(elem));
    } else if (elem.classList.contains("myFingerEvent") === true) {
        elem.addEventListener("click", () => playersFightingFingers = addMyFinger(elem));
    } else {
        elem.addEventListener("click", getReadyFight);
    }
}

//Total乱数取得
function getExpectedOfCom (fingers) {
    return Math.floor(Math.random() * fingers);
}
//Fighting乱数取得
function getFightingOfCom (max, min) {
    console.log('max: ', max - 1);
    console.log('min: ', min);
    return Math.floor(Math.random() * (max - min)) + min;
}

//指Iconを反映
function showFingers(fighting, remaining, people) {
    if (fighting === 2) {
        fingerObj[people]["showRight"].className = fingerObj[people]["twoFingersToRight"];
        fingerObj[people]["showLeft"].className = fingerObj[people]["twoFingersToLeft"];
    }
    if (fighting === 1) {
        if (remaining === 2) {
            fingerObj[people]["showRight"].className = fingerObj[people]["twoFingersToRight"];
            fingerObj[people]["showLeft"].className = fingerObj[people]["leftFist"];
        } else if (remaining === 1) {
            fingerObj[people]["showRight"].className = fingerObj[people]["twoFingersToRight"];
            fingerObj[people]["showLeft"].className = "";
        }
    }
    if (fighting === 0) {
        if (remaining === 2) {
            fingerObj[people]["showRight"].className = fingerObj[people]["rightFist"];
            fingerObj[people]["showLeft"].className = fingerObj[people]["leftFist"];
        } else if (remaining === 1) {
            fingerObj[people]["showRight"].className = fingerObj[people]["rightFist"];
            fingerObj[people]["showLeft"].className = "";
        }
    }
}

//指Iconを反映
function closeFingers(fingerNum, people) {
    if (fingerNum === 0) {
        fingerObj[people]["showRight"].className = "";
        fingerObj[people]["showLeft"].className = "";
    }
    if (fingerNum === 1) {
        fingerObj[people]["showRight"].className = fingerObj[people]["rightFist"];
        fingerObj[people]["showLeft"].className = "";
    }
    if (fingerNum === 2) {
        fingerObj[people]["showRight"].className = fingerObj[people]["rightFist"];
        fingerObj[people]["showLeft"].className = fingerObj[people]["leftFist"];
    }
}

function btnDisabled (array, num) {
    const arr = Array.from(array);
    arr.forEach(btn => {
        if (arr.indexOf(btn) < num + 1) {
            btn.classList.remove("disabled");
            btn.ariaDisabled = false;
        } else {
            btn.classList.add("disabled");
            btn.ariaDisabled = true;
        }
    })
}

function showTurnAndResult(str, color) {
    turnAndResult[0].innerText = str;
    colorList.forEach(classColor => turnAndResult[0].classList.remove(classColor));
    turnAndResult[0].classList.add(`turnAndResult_${color}`);
}

function getTurnText () {
    // テキスト反映
    if (turnFlg) {
        showTurnAndResult("Com`s Turn", "blue");
        turnFlg = false;
    } else {
        showTurnAndResult("Your Turn", "red");
        turnFlg = true;
    }
}

function GetComFingersTotal () {
    if (comRemainingFingers === playersRemainingFingers) {  //COM残り = player残り
        //予想 > COM残り
        if (totalExpectedOfCom > comRemainingFingers) {
            max = comRemainingFingers + 1;
            min = totalExpectedOfCom - comRemainingFingers;
        } else {
            max = totalExpectedOfCom + 1;
            min = 0;
        }
    } else if (comRemainingFingers > playersRemainingFingers) {  //COM残り > player残り
        //予想 > COM残り
        if (totalExpectedOfCom > comRemainingFingers) {
            max = comRemainingFingers + 1;
        } else {
            max = totalExpectedOfCom + 1;
        }
        //予想 > player残り
        if (totalExpectedOfCom > playersRemainingFingers) {
            min = playersRemainingFingers;
        } else {
            min = 0;
        }
    } else if (playersRemainingFingers > comRemainingFingers) {  //player残り > COM残り
        //予想 > COM残り
        if (totalExpectedOfCom > comRemainingFingers) {
            max = comRemainingFingers + 1;
        } else {
            max = totalExpectedOfCom + 1;
        }
        //予想 > player残り
        if (totalExpectedOfCom > playersRemainingFingers) {
            min = totalExpectedOfCom - playersRemainingFingers;
        } else {
            min = 0;
        }
    }
    return [max, min];
}

//試合開始
async function getReadyFight () {
    //COMの期待値合計を取得
    totalExpectedOfCom = getExpectedOfCom(totalOfFingersNow + 1);
    //COMが実際に出す指の合計値を取得
    if (turnFlg) {
        comFightingFingers = getExpectedOfCom(comRemainingFingers + 1);
    } else {
        ComFingersTotal = GetComFingersTotal();
        comFightingFingers = getFightingOfCom(ComFingersTotal[0], ComFingersTotal[1]);
    }
    console.log('予想合計: ', totalExpectedOfCom);
    console.log('実際の数: ', comFightingFingers);
    //そのターンの指合計
    let totalFightingFingers = playersFightingFingers + comFightingFingers;
    //テキスト反映
    showTurnAndResult("Ready...", "green");
    //待機
    await _sleep(1000);
    //テキスト反映
    showTurnAndResult("Fight !!!", "green");
    //指を反映
    showFingers(comFightingFingers, comRemainingFingers, "com");
    showFingers(playersFightingFingers, playersRemainingFingers, "player");
    //COM's Expected テキスト表示
    if (!turnFlg) {
        expectedDisplayOfCom.innerText = totalExpectedOfCom;
    }
    //待機
    await _sleep(1000);
    //試合結果判断
    if (totalExpectedOfPlayer === totalFightingFingers && turnFlg === true) {  //【turn】player【win】player
        isWinnerFlg = true;
        playersRemainingFingers--;
        showTurnAndResult("Great !!!", "red");
    } else if (totalExpectedOfCom === totalFightingFingers && turnFlg === false) {  //【turn】COM【win】COM
        isWinnerFlg = true;
        comRemainingFingers--;
        showTurnAndResult("Oh My God...", "red");
    } else {
        isWinnerFlg = false;
        if (totalExpectedOfPlayer !== totalFightingFingers && turnFlg === true) {  //【turn】player【win】COM
            showTurnAndResult("Oh No...", "red");
        } else if (totalExpectedOfCom !== totalFightingFingers && turnFlg === false) {  //【turn】COM【win】player
            showTurnAndResult("Safe !!!", "red");
        }
        resetOnce();
        await _sleep(1500);
        closeFingers(playersRemainingFingers, "player");
        closeFingers(comRemainingFingers, "com");
        expectedDisplayOfCom.innerText = 0;
        getTurnText();
    }
    if (isWinnerFlg) {
        totalOfFingersNow--;
        if (!winOrLose()) {
            resetOnce();
            await _sleep(1500);
            closeFingers(playersRemainingFingers, "player");
            closeFingers(comRemainingFingers, "com");
            expectedDisplayOfCom.innerText = 0;
            getTurnText()
        } else {
            await _sleep(1500);
            modalButton.click();
        }
    }
    if (!turnFlg) {
        //COMのターン時、トータルボタンDisabled
        expectedDisplayOfCom.innerText = totalExpectedOfCom;
        btnDisabled(totalBtn, -1);
        btnDisabled(fightingBtn, playersRemainingFingers);
    } else {
        //ボタンのDisable付与
        btnDisabled(totalBtn, totalOfFingersNow);
        btnDisabled(fightingBtn, playersRemainingFingers);
    }
}
