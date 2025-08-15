import {createContext, useState} from "react";

// create enums for state
const States = Object.freeze({
    WORK: "work",
    S_BREAK: "short break",
    L_BREAK: "long break"
})


// create context
export const StateContext = createContext({
    state: States.WORK,
    durations: {},
    changeState: () => {},
    changeDuration: () => {}
});

export function StateContextProvider({ children }) {
    // default state
    const [state, setState] = useState(States.WORK);
    
    // default durations
    const [durations, setDurations] = useState({
        [States.WORK]: 25 * 60,
        [States.S_BREAK]: 5 * 60,
        [States.L_BREAK]: 10 * 60
    });

    // function to change state
    const changeState = (newState) => {
        setState(newState);
    };

    // function to change durations
    const changeDuration = (mode, seconds) => {
        setDurations(prev => ({ ...prev, [mode]: seconds }))
    }

    return (
        <StateContext.Provider value={{ state, changeState, durations, changeDuration }}>
            {children}
        </StateContext.Provider>
    );
}