import { useState, useEffect, useReducer } from 'react';

/**
 * Timers have TimerStates, that contain a name, state, and length.
 */
type TimerState = 'work' | 'shortBreak' | 'longBreak';

/**
 * Defining where durations of timer states
 */
type TimerDurations = {
    work: number;
    shortBreak: number;
    longBreak: number;
};

/**
 * This is an interface for a Timer object
 */
interface Timer {
    mode: TimerState;
    durations: TimerDurations;
    timeLeft: number;
    startTime: number | null;
    isRunning: boolean;
}

type TimerAction =
    | { type: 'START' }
    | { type: 'PAUSE' }
    | { type: 'SKIP' }
    | { type: 'TICK' }
    | { type: 'CHANGE_DURATION' }
    | { type: 'CHANGE_STATE' }
    | { type: 'CHANGE_LB_INTERVAL' };

function reducer(state: Timer, action: TimerAction): Timer {
    switch (action.type) {
        case 'START':
            return {
                ...state,
                isRunning: !state.isRunning,
                startTime: Date.now(),
            };
        case 'PAUSE':
            // update
            return { ...state, isRunning: false, startTime: Date.now() };
        case 'TICK': {
            // update time left
            if (state.startTime === null) return state;
            const elapsedTime = Math.floor(
                (Date.now() - state.startTime) / 1000,
            );
            return { ...state, timeLeft: state.durations.work - elapsedTime };
        }
        default:
            return state;
    }
}

function App() {
    const durations: TimerDurations = {
        work: 1500,
        shortBreak: 300,
        longBreak: 600,
    };
    const initialState: Timer = {
        mode: 'work',
        durations: durations,
        timeLeft: durations.work,
        startTime: null,
        isRunning: false,
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        // console.log(`Submission entered ${inputValue}`);
    }

    /**
     * Formats time in seconds to a clock time
     * @param time in seconds
     * @returns mm:ss
     */
    function formatTime(time: number): string {
        console.log(state.startTime);
        console.log(`Formatting time ${time}`);
        const minutes = Math.floor(time / 60);
        // console.log(`Minutes ${minutes}`);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        // don't run if not set to true
        if (!state.isRunning) {
            return;
        }

        // update timer
        const intervalId = setInterval(() => {
            // console.log('updating timer');
            // get currently elapsed time
            console.log('Timer started');
            dispatch({ type: 'TICK' });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [state.isRunning]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Enter time:</p>
                <input type="text" />
                <button className="border">Submit</button>
            </form>

            <p>{formatTime(state.timeLeft)}</p>
            <button onClick={() => dispatch({ type: 'START' })}>
                Start timer
            </button>
        </div>
    );
}

export default App;
