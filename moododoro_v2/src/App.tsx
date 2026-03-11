import { useEffect, useReducer, useState } from "react";
import type { Timer, TimerDurations } from "./api/utils/timerReducer";
import { reducer } from "./api/utils/timerReducer";
import Button from "./components/ui/Button";
import Header from "./components/Header/Header";
import type { Dispatch } from "react";
import { formatTime } from "./api/utils/formatTime";
import type { TimerAction } from "./api/utils/timerReducer";
import { DEFAULT_COLOR } from "./api/globals/constants";

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
    const [bg, setBg] = useState(DEFAULT_COLOR);

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
            <Header state={state} dispatch={dispatch} bg={bg} setBg={setBg} />
            <div style={{ backgroundColor: bg }} className="flex-1">
                <Timer state={state} dispatch={dispatch} />
            </div>
        </div>
    );
}
interface TimerProp {
    state: Timer;
    dispatch: Dispatch<TimerAction>;
}

const modes = {
    shortBreak: "short break",
    work: "work",
    longBreak: "long break",
};
const Timer = ({ state, dispatch }: TimerProp) => {
    console.log(state.isRunning);
    return (
        <div className="*:text-white flex flex-col items-center justify-start pt-40 min-h-screen text-xl">
            <div
                id="timer"
                className="border-double border-4 w-fit px-8 py-12 m-4"
            >
                <p className="text-9xl font-family-mono" id="timer">
                    {formatTime(state.timeLeft)}
                </p>
            </div>
            <div className="flex flex-col items-center text-2xl">
                <div className="grid grid-cols-3">
                    <Button
                        className="w-24"
                        label={state.isRunning ? "Pause" : "Start"}
                        onClick={() => dispatch({ type: "START" })}
                    />
                    <Button
                        className="w-24"
                        label="Reset"
                        onClick={() => dispatch({ type: "RESET" })}
                    />
                    <Button
                        className="w-24"
                        label="Skip"
                        onClick={() => dispatch({ type: "SKIP" })}
                    />
                </div>
                <p>{`#${state.intervals}`}</p>
                <p>{`${modes[state.mode]}`}</p>
            </div>
        </div>
    );
};
export default App;
