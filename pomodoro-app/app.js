import {PomodoroTimer} from "./pomodoro/pomodoro.js";

// Constantes del circulo
const circleElement = document.querySelector('.pomodoro__progress-bg');
const radioCircle = parseInt(circleElement.getAttribute("r"));
const totalCircle = Math.round(Math.PI * 2 * radioCircle);
let currentProgressCircle = 0;
let progressBySecondCircle = 0;

const timerTextElement = document.querySelector(".pomodoro__timer");
const buttonRefreshForm = document.querySelector(".pomodoro__buttons--refresh");
const buttonPlayPomodoro = document.querySelector(".pomodoro__buttons--play");
const statusElement = document.querySelector(".pomodoro__legend");
const nextBlockTimer = document.querySelector(".pomodoro__buttons--next");

let buttonStatus = buttonPlayPomodoro.dataset;


const pomodoroStatus = {
    start: "start",
    paused: "paused",
    continue: "continue"
}

const startValuesFn = (seconds,{status, timerStart})=>{
    console.log(timerStart);
    progressBySecondCircle = totalCircle/seconds;
    currentProgressCircle = totalCircle;

    // Cambiamos contenido de los elementos HTML
    circleElement.style.strokeDashoffset = 264;
    timerTextElement.textContent = PomodoroTimer.formatTime(seconds);
    statusElement.textContent = status;


   

    if(!timerStart){
        buttonStatus.status = pomodoroStatus.start;
        buttonPlayPomodoro.firstElementChild.src = "./assets/play.svg";
    }

}

const updateValuesBySecondFn=(currentSeconds)=>{
    currentProgressCircle -= progressBySecondCircle;
    timerTextElement.textContent = PomodoroTimer.formatTime(currentSeconds);
    circleElement.style.strokeDashoffset = currentProgressCircle;

    if(currentSeconds===0){        
        const audio = new Audio('./assets/song.mp3');
        audio.play();
    }
}


const pomodoro = new PomodoroTimer({startValuesFn, updateValuesBySecondFn});
pomodoro.initValuesPomodoro();

// Evento cuando damos click a un botón.
buttonPlayPomodoro.addEventListener("click", ()=>{
    
    
    if(buttonStatus.status === pomodoroStatus.start){

        buttonStatus.status = pomodoroStatus.paused;

        pomodoro.startPomodoro();
        buttonPlayPomodoro.firstElementChild.src = "./assets/stop.svg";

    }
    else if(buttonStatus.status === pomodoroStatus.paused){

        buttonStatus.status = pomodoroStatus.continue;
        pomodoro.pausedPomodoro();
        buttonPlayPomodoro.firstElementChild.src = "./assets/play.svg";

    }
    else if(buttonStatus.status === pomodoroStatus.continue){
        
        pomodoro.continueTimer();
        buttonStatus.status = pomodoroStatus.paused;
        buttonPlayPomodoro.firstElementChild.src = "./assets/stop.svg";

    }


});


buttonRefreshForm.addEventListener("click", ()=>{
    pomodoro.restartPomodoro();
});


nextBlockTimer.addEventListener("click", ()=>{
    pomodoro.endCurrentSession();
});