export class Timer{

    currentSecondsTimer;
    totalSeconds;
    #timer;
    functionTimer;
    pomodoroFunction;

    static formatTime(seconds){
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
    
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
    }


    // Empezamos el timer
    startTimer(totalSeconds, pomodoroFunction = ()=>{}){
        // Verificamos si hay un timer hecho previamente
        if(this.#timer) throw new Error("No se puede crear más de un Timer a la vez");

        this.pomodoroFunction = pomodoroFunction;
        this.totalSeconds = totalSeconds; 
        this.currentSecondsTimer = 1;
        this.controlTimer();

        //Usamos función flecha para no perder el contexto.
        this.#timer = setInterval(()=> { 
            this.controlTimer(); 
        }, 1000);

        return true;
    }


    
    // Pausamos el Timer
    pausedTimer(){
        if(!this.#timer) throw new Error("No se puede pausar un Timer que no existe");

        clearInterval(this.#timer);
        this.#timer = null;

        return true;
    }


    // Reanudamos el Timer
    continueTimer(){
        // No se permite crear más de 2 timers
        if(this.#timer) throw new Error("No se puede crear más de un Timer a la vez");

        //Usamos función flecha para no perder el contexto.
        this.#timer = setInterval(()=> { 
            this.controlTimer(); 
        }, 1000);

        return true;
    }

    // Función que controla el timer
    controlTimer() {
        
        // Verificamos si ya termina el Timer
        if(this.currentSecondsTimer >= this.totalSeconds){
            this.pausedTimer();
            this.pomodoroFunction(true);

            return;
        }
        this.pomodoroFunction(false);
        this.currentSecondsTimer++;

    
    }

    get timer(){
        return this.#timer;
    }

}