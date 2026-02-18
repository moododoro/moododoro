import { useState, useEffect, useReducer } from "react";
import type { Timer, TimerDurations } from "./api/timerReducer";
import { reducer } from "./api/timerReducer";

function App() {
    const [workDuration, setWorkDuration] = useState<number>(0);
    const [sbDuration, setSBDuration] = useState<number>(0);
    const [lbDuration, setLBDuration] = useState<number>(0);
    const [longBreakInt, setLongBreakInt] = useState<number>(0);

    const durations: TimerDurations = {
        work: 1500,
        shortBreak: 300,
        longBreak: 600,
    };
    const initialState: Timer = {
        mode: "work",
        durations: durations,
        elapsedTime: 0,
        timeLeft: durations.work,
        startTime: null,
        isRunning: false,
        intervalBreak: 3,
        intervals: 1,
        autoStart: true,
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    /**
     * This calls TICK every second
     */
    useEffect(() => {
        // don't run if not set to true
        if (!state.isRunning) {
            return;
        }

        // update timer
        const intervalId = setInterval(() => {
            // console.log('updating timer');
            // get currently elapsed time
            // console.log('Timer started');
            dispatch({ type: "TICK" });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [state.isRunning, state.mode]);

    /**
     * Formats time in seconds to a clock time
     * @param time in seconds
     * @returns mm:ss
     */
    function formatTime(time: number): string {
        // console.log(`Formatting time ${time}`);
        const minutes = Math.floor(time / 60);
        // console.log(`Minutes ${minutes}`);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    /**
     * This allows for a timer duration to be changed
     * @param e event
     * @param mode TimerDuration to change
     */
    function updateDuration(
        e: React.SubmitEvent<HTMLFormElement>,
        mode: keyof TimerDurations,
        value: number,
    ) {
        //
        e.preventDefault();
        // update mode to value
        dispatch({ type: "CHANGE_DURATION", field: mode, value: value });
    }

    return (
        <div>
            <form onSubmit={(e) => updateDuration(e, "work", workDuration)}>
                <p>Enter work time:</p>
                <input
                    value={workDuration}
                    onChange={(e) => setWorkDuration(+e.target.value)}
                    type="number"
                />
                <button className="border">Submit</button>
            </form>

            <p>{formatTime(state.timeLeft)}</p>
            <p>{`Interval: #${state.intervals}`}</p>
            <p>{`Mode: ${state.mode}`}</p>
            <button onClick={() => dispatch({ type: "START" })}>Start</button>
            <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
            <button onClick={() => dispatch({ type: "SKIP" })}>Skip</button>
        </div>
    );
}

export default App;
