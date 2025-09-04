/*
* This context tells the timer component what to do based on the state
*/
import {createContext, useState, useContext, useEffect} from "react";
import { StateContext } from "./StateContext";
import useSound from 'use-sound';
const startSound = `${import.meta.env.BASE_URL}sounds/success.mp3`;
const endSound = `${import.meta.env.BASE_URL}sounds/completed.mp3`;
const skipSound = `${import.meta.env.BASE_URL}sounds/error.mp3`;
const pauseSound = `${import.meta.env.BASE_URL}sounds/popup.mp3`;

// create context
export const TimerContext = createContext({
    timeLeft: 0,
    timerCount: 0,
    startTimer: () => {},
    pauseTimer: () => {},
    skipTimer: () => {},
    endTimer: () => {},
    formatTime: ()=> {}
});

export function TimerContextProvider({ children }) {

    const [timeLeft, setTimeLeft] = useState(0); // seconds remaining
    const [isRunning, setIsRunning] = useState(false);
    const {state, durations, changeState} = useContext(StateContext);
    const [timerCount, setTimerCount] = useState(1);
    const [intervalsTilLongBreak, setIntervalsTilLongBreak] = useState(3);
    const[playStart] = useSound(startSound);
    const[playEnd] = useSound(endSound);
    const[playSkip] = useSound(skipSound);
    const[playPause] = useSound(pauseSound);

    // use effects to update timer when state changes
    useEffect(()=> {
        setTimeLeft(durations[state]);
    },[state, durations]);

    // use effect to countdown timer when it is running
    useEffect(() => {                              // Define a side effect that runs after the component renders and whenever `isRunning` changes
        if (!isRunning) return;                      // If the timer is not running, exit early (do nothing)

        const interval = setInterval(() => {         // Start a new interval that repeats the inner function every 1000ms (1 second)
            setTimeLeft(prev => prev - 1);             // Decrement `timeLeft` by 1 each second
        }, 1000);

        // check for time == 0
        if (timeLeft === 0) {
            playEnd();
            clearInterval(interval);
            setTimeout(() => changeState(nextMode()),1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);                               

    
    const startTimer = () => {
        if (isRunning) {
            console.log("Pause Timer");
            playPause();
            
        } else {
            console.log("Start timer");
            playStart();
        }
        
        setIsRunning(!isRunning);
        
    }

    const skipTimer = () => {
        console.log("Skip Timer");
        // pause
        setIsRunning(false);
        playSkip();
        // change to next mode
        changeState(nextMode());
    }

    const endTimer = () => {
        console.log("End Timer");
        // stop running
        setIsRunning(false);
        playEnd();
        // set time left to 0
        setTimeLeft(0);        
    }

    const formatTime = (time) => {
        let min = Math.floor(time / 60).toString().padStart(2,"0");
        const sec = (time % 60).toString().padStart(2,"0");
        return `${min}:${sec}`;
    }

    const resetTimer = () => {
        setTimerCount(1);
    }

    /**
     * This method handles state changes during events that trigger a state change.
     * @returns next state to change to
     */
    const nextMode = () => {        

        // get key array
        const keysArray = Object.keys(durations);
        const index = keysArray.indexOf(state);

        // check counter for a long break
        if (timerCount % intervalsTilLongBreak == 0 && index != 2) {
            return keysArray[2] // set to L_break
        }

        // change to next index with wrap around can only set 0 or 1
        switch (keysArray.indexOf(state)) {
            case(0): // switching from work to break
                return keysArray[1];
            default: // switching from short break to work
                setTimerCount((prev) => prev + 1);
                return keysArray[0]
        } 
    }

    return (
        <TimerContext.Provider value={{startTimer, skipTimer, 
                                        endTimer, formatTime, timeLeft, 
                                        timerCount, setIsRunning, setTimeLeft,
                                        isRunning, intervalsTilLongBreak, 
                                        setIntervalsTilLongBreak, resetTimer}}>
            {children}
        </TimerContext.Provider>
    );
}