/**
 * Timers have TimerStates, that contain a name, state, and length.
 */
export type TimerState = "work" | "shortBreak" | "longBreak";

/**
 * Defining where durations of timer states
 */
export type TimerDurations = {
    work: number;
    shortBreak: number;
    longBreak: number;
};

/**
 * This is an interface for a Timer object
 */
export interface Timer {
    mode: TimerState; // tracks mode of timer, work, short break, long break
    durations: TimerDurations; // type that holds onto duration of each mode
    elapsedTime: number; // tracks how much time has passed
    timeLeft: number; // tracks how much time is left
    startTime: number | null; // used to hold the actual time of the timer start
    isRunning: boolean; // tracks if the timer is running
    intervals: number; // intervals per longbreak
    intervalBreak: number; // how many intervals pass before long rbeak
    autoStart: boolean; // tracks whether or not to start counting down timer automatically on state change
}

export type TimerAction =
    | { type: "START" }
    | { type: "SKIP" }
    | { type: "RESET" }
    | { type: "TICK" }
    | { type: "CHANGE_DURATION"; field: keyof TimerDurations; value: number }
    | { type: "CHANGE_LB_INTERVAL"; value: number }
    | { type: "CHANGE_AUTOSTART" };

/**
 * When time elapsed hits one, we need to set the next mode, it takes in the state
 */
function nextMode(state: Timer): Timer {
    // check which state we are in
    const nextIntervals = state.intervals + 1;
    if (state.mode === "work") {
        // check if long or short break

        if (state.intervals % state.intervalBreak === 0) {
            // long break
            console.log("-----------TRANISTION TO LONGBREAK------------");
            return {
                ...state,
                mode: "longBreak",
                elapsedTime: 0,
                timeLeft: state.durations.longBreak,
                startTime: Date.now(),
                isRunning: state.autoStart,
            };
        } else {
            console.log("-----------TRANISTION TO SHORTBREAK------------");
            return {
                ...state,
                mode: "shortBreak",
                elapsedTime: 0,
                timeLeft: state.durations.shortBreak,
                startTime: Date.now(),
                isRunning: state.autoStart,
            };
        }
    } else {
        // returning from break to work
        console.log("-----------TRANISTION TO WORK------------");
        return {
            ...state,
            elapsedTime: 0,
            mode: "work",
            intervals: nextIntervals,
            timeLeft: state.durations.work,
            startTime: Date.now(),
            isRunning: state.autoStart,
        };
    }
}

/**
 * This handles timer business logic
 * @param state interface which contains the attributes of a timer
 * @param action what state the timer is in, and what should be done
 * @returns
 */
export function reducer(state: Timer, action: TimerAction): Timer {
    switch (action.type) {
        case "START": // this also handles pausing
            return {
                ...state,
                isRunning: !state.isRunning,
                startTime: Date.now() - state.elapsedTime * 1000,
            };
        case "TICK": {
            // check elapsed time and change mode if need be
            if (state.timeLeft <= 0) {
                return nextMode(state);
            }

            // update time left
            if (state.startTime === null) return state;
            const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
            return {
                ...state,
                elapsedTime: elapsed,
                timeLeft: state.durations[state.mode] - elapsed,
            };
        }
        case "RESET": {
            if (state.mode === "work") {
                return {
                    ...state,
                    timeLeft: state.durations.work,
                    elapsedTime: 0,
                    startTime: Date.now(),
                };
            } else if (state.mode === "shortBreak") {
                return {
                    ...state,
                    timeLeft: state.durations.shortBreak,
                    elapsedTime: 0,
                    startTime: Date.now(),
                };
            } else {
                return {
                    ...state,
                    timeLeft: state.durations.longBreak,
                    elapsedTime: 0,
                    startTime: Date.now(),
                };
            }
        }
        case "SKIP": {
            return nextMode(state);
        }

        case "CHANGE_DURATION": {
            // takes field and value
            return {
                ...state,
                durations: { ...state.durations, [action.field]: action.value },
                timeLeft:
                    action.field === state.mode ? action.value : state.timeLeft,
            };
        }
        case "CHANGE_LB_INTERVAL": {
            // takes value
            console.log(action.value);
            return {
                ...state,
                intervalBreak: action.value,
            };
        }
        case "CHANGE_AUTOSTART": {
            return { ...state, autoStart: !state.autoStart };
        }
        default:
            return state;
    }
}
