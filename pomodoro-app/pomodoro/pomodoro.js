import { Timer } from "./timer.js";


export class PomodoroTimer extends Timer{

    totalSecondsPomodoro;
    currentSeconds;

    states = {
        longBreak: {
            name: "longBreak",
            time: .2,
            status: "break"
        },
        shortBreak: {
            name: "shortBreak",
            time: .1,
            status: "break"
        },
        pomodoro: {
            name: "pomodoro",
            time: .4,
            status: "Focus"
        }
    }

    currentState = this.states.pomodoro;
    infoPomodoro = {
        state: this.currentState.name,
        currentTime: this.currentState.time,
        sessions: 1,
        status: this.currentState.status,
        timerStart: false
    }

    constructor({startValuesFn, updateValuesBySecondFn}){
        super();

        this.startValuesFn = startValuesFn;
        this.updateValuesBySecondFn = updateValuesBySecondFn;
    }

    // Inicia el pomodoro
    startPomodoro(){
        if(this.infoPomodoro.timerStart) throw new Error("No se permiten crear más de 2 Timers en un mismo pomodoro")

       
        this.infoPomodoro.timerStart = true;
        this.initValuesPomodoro();
        this.initTimerPomodoro();
    }

    // Iniciamos el Pomodoro y sus valores iniciales.
    initValuesPomodoro(){
        this.changeStatePomodoro();
        this.totalSeconds = this.infoPomodoro.currentTime * 60;
        this.currentSeconds = this.totalSeconds;

        this.startValuesFn(this.totalSeconds, this.infoPomodoro);
    }

    // Cambia el estado del pomodoro
    changeStatePomodoro(){
        if(this.infoPomodoro.sessions%2!==0){
            this.currentState = this.states.pomodoro;
        }else if(this.infoPomodoro.sessions%6==0){
            this.currentState = this.states.longBreak;
        }else if(this.infoPomodoro.sessions%2==0){
            this.currentState = this.states.shortBreak;
        }else{
            this.currentState = this.states.pomodoro;
        }

        this.infoPomodoro.state = this.currentState.name;
        this.infoPomodoro.currentTime = this.currentState.time;
        this.infoPomodoro.status = this.currentState.status;

    }


    // Inicia el Timer con los segundos faltantes
    initTimerPomodoro(){
        // No me permite crear más de 2 timers.
        if(this.timer)
            throw new Error("No se permiten crear más de 2 Timers en un mismo pomodoro");
        
        this.startTimer(this.currentSeconds, this.updateValuesPomodoro);
    }



    // Actualiza datos del pomodoro.
    updateValuesPomodoro(timerEnd){
       
        this.currentSeconds--;
        this.updateValuesBySecondFn(this.currentSeconds);

        if(timerEnd){
            this.endPomodoro();
        }

    }

    // Pausamos el Pomodoro.
    pausedPomodoro(){
        this.pausedTimer();
    }

    // Continuar el Timer
    continuePomodoro(){
        // No permite empezar un pomodoro sin que este haya sido activado
        if( !this.infoPomodoro.timerStart )
            throw new Error("No se permite crear un timer si este no ha sido empezado");

        
        this.continueTimer();
    }

    // Reiniciar Pomodoro
    restartPomodoro(){

        if(!this.infoPomodoro.timerStart) throw new Error("No se puede reiniciar un Pomodoro si este no se ha iniciado.");
        
        // Si el Timer no está pausado, entonces lo quitamos
        if(this.timer){
            this.pausedTimer();
        }

        this.infoPomodoro.timerStart = false;
        this.initValuesPomodoro();
    }

    // Finaliza el pomodoro Actual
    endCurrentSession(){
        // Preguntamos si existe un pomodoro actual, en todo caso lo pausamos
        if(this.timer){
            this.pausedPomodoro();
        }

        this.endPomodoro();
    }

    // Finaliza  el pomodoro actual correctamente
    endPomodoro(){
        this.infoPomodoro.timerStart = false;
        this.infoPomodoro.sessions++;

        this.initValuesPomodoro();
        //this.startValuesFn(this.totalSeconds, this.infoPomodoro);
    }

    
}



