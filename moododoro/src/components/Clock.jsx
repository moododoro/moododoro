import {useState, useEffect } from "react"
import useSound from 'use-sound';

//TODO: set up session counter
//TODO: add in breaks
//TODO: add more sounds to buttons
//TODO: stationary timer box
let STATES = ["work", "break", "paused", "longBreak"];

const Clock = ({workTime, setWorkTime, breakTime, setBreakTime, useImage, setImage}) => {
    
    // hooks
    const[time, setTime] = useState(workTime);
    const[displayTime, setDisplayTime] = useState("25:00")// displayTime
    const[mode, setMode] = useState("work")// mode (work, break, paused, long break)
    const[running, setRunning] = useState(false);

    // count down time
    useEffect(() => {
        // don't run until they hit start
        if (!running ) return;

        // countdown based on mode?
        switch (mode) {
            case "work":
                return workMode();
            case "break":
                return breakMode();
            case "paused":
                // show paused
                break;
        }        
    },[running,mode, time]);

    // initialize time on mode change
    useEffect(() => {
        // don't run until they hit start
        if (!running ) return;

        // countdown based on mode?
        switch (mode) {
            case "work":
                setTime(workTime);
                break;
            case "break":
                setTime(breakTime);
                break;
            case "paused":
                break;
        }        
    },[mode]);

    // change mode
    function workMode() {
        if (mode != "work") return;

        const id = setInterval(() => {
                setTime(c => {
                    if (c === 0) {
                        clearInterval(id);
                        setMode("break");
                        return 0;
                    }
                    return c - 1;
                });
            }, 1000);

        return () => clearInterval(id);
    }

    // change mode
    function breakMode() {
        if (mode != "break") return;

        const id = setInterval(() => {
            setTime(c => {
                if (c === 0) {
                    clearInterval(id);
                    setMode("work");
                    return 0;
                }
                return c - 1;
            });
        }, 1000);

        return () => clearInterval(id);
    }

    function start() {
        setRunning(true);
    }

    function pause() {
        setRunning(false);
    }

    function end() {
        setRunning(false);
        setTime(0);
    }

    function formatTime(time){
        let min = Math.floor(time / 60).toString().padStart(2,"0");
        const sec = (time % 60).toString().padStart(2,"0");
        return `${min}:${sec}`;
    }

    const backgroundStyle = useImage
    ? {
        backgroundImage: `url(${useImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {};


    return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white transition-all duration-500 bg-[#51c4cc]" style={backgroundStyle}>
        <div className="backdrop-blur flex flex-col items-center border-4 border-double border-white rounded-lg p-8 text-white box-border w-[400px]">
            
            <h2 className='text-2xl font-semibold justify-center'>{mode} </h2>
            <h1 className='text-9xl font-semibold justify-center'>{formatTime(time)}</h1>
        </div>
        <div className='flex p-4'>
            <button className='m-2 border-2 backdrop-blur border-white rounded-lg text-white p-2 hover:bg-[#E5E0D8]' onClick={start}>start</button>
            <button className='backdrop-blur m-2 border-2  border-white rounded-lg text-white p-2 hover:bg-[#E5E0D8]' onClick={pause}>pause</button>
            <button className='backdrop-blur m-2 border-2 border-white rounded-lg text-white p-2 hover:bg-[#E5E0D8]' onClick={end}>end</button>
            <button className='backdrop-blur m-2 border-2 border-white rounded-lg text-white p-2 hover:bg-[#E5E0D8]'>skip</button>
        </div>
    </main>
    )
}

export default Clock

