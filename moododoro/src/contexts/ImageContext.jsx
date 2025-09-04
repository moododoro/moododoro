import {createContext, useState} from "react";

const DEFAULT_BG = "#51c4cc"

// create context
export const ImageContext = createContext({
    background: DEFAULT_BG,
    changeBackground: () => {},
});

export function ImageContextProvider({ children }) {
    const [background, setBackground] = useState(DEFAULT_BG);
    const [bgIsImage, setBgIsImage] = useState(true);

    function changeBackground(text) {
        setBgIsImage(true);
        console.log(`image background called with ${text}`);
        if (text == null) {
            setBackground(DEFAULT_BG);
        } else {
            setBackground(text);
        }
        console.log(`background ${background}`);
    }

    function changeVideoBackground(text) {
        console.log(`video background called with ${text}`);
        if (text == null) {
            setBackground(DEFAULT_BG);
        } else {
            // extract video id
            const regExp = /(\?v=)(.{11})/;
            const match = text.match(regExp);
            console.log(match)
            if (match != null && match[2].length === 11) {
                setBackground(match[2]);
            } else {
                alert("Message from server: failed to fetch youtube video!");
                setBgIsImage(true);
                setBackground(DEFAULT_BG);
            }
            
        }
        console.log(`background ${background}`);
    }

    return (
        <ImageContext.Provider value={{ background, changeBackground , bgIsImage, setBgIsImage,
            changeVideoBackground
        }}>
            {children}
        </ImageContext.Provider>
    );
}

/*
<iframe width="2033" height="829" src="https://www.youtube.com/embed/9ou1pl0XNRs?list=RD9ou1pl0XNRs" title="Skyrim - Music &amp; Ambience - Night [10 Hours]" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
*/