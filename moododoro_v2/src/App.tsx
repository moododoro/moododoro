import { useEffect, useReducer } from "react";
import type { Timer, TimerDurations } from "./api/timerReducer";
import { reducer } from "./api/timerReducer";
import Button from "./components/Button";
import Header from "./components/Header";
import type { Dispatch } from "react";
import { formatTime } from "./api/formatTime";

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

function App() {
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

    return (
        <div className="flex flex-col h-screen">
            <Header state={state} dispatch={dispatch} />
            <div className="bg-primary flex-1">
                <Timer state={state} dispatch={dispatch} />
            </div>
        </div>
    );
}
interface TimerProp {
    state: Timer;
    dispatch: Dispatch<TimerAction>;
}
const Timer = ({ state, dispatch }: TimerProp) => {
    return (
        <div className="*:text-white flex flex-col items-center">
            <div className="border w-fit p-4 m-4">
                <p className="text-9xl" id="timer">
                    {formatTime(state.timeLeft)}
                </p>
            </div>
            <div>
                <Button
                    label="Start"
                    onClick={() => dispatch({ type: "START" })}
                />
                <Button
                    label="Reset"
                    onClick={() => dispatch({ type: "RESET" })}
                />
                <Button
                    label="Skip"
                    onClick={() => dispatch({ type: "SKIP" })}
                />
                <p>{`Interval: #${state.intervals}`}</p>
                <p>{`Mode: ${state.mode}`}</p>
                <p>{`LB Interval: #${state.intervalBreak}`}</p>
            </div>
        </div>
    );
};
export default App;
