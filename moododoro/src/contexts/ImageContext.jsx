import {createContext, useState} from "react";

const DEFAULT_BG = "#51c4cc"

// create context
export const ImageContext = createContext({
    background: DEFAULT_BG,
    changeBackground: () => {},
});

export function ImageContextProvider({ children }) {
    const [background, setBackground] = useState(DEFAULT_BG);

    function changeBackground(text) {
        console.log(`called with ${text}`);
        if (text == null) {
            setBackground(DEFAULT_BG);
        } else {
            setBackground(text);
        }
        console.log(`background ${background}`);
    }

    return (
        <ImageContext.Provider value={{ background, changeBackground }}>
            {children}
        </ImageContext.Provider>
    );
}

