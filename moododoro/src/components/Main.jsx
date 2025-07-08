import {useState, useEffect } from "react"
import useSound from 'use-sound';

//TODO: set up session counter
//TODO: add in breaks
//TODO: add more sounds to buttons

const Main = () => {
    // State to hold the message
    const [time, setTime] = useState(10);
    const [displayTime, setDisplayTime] = useState("")
    const [running, setRunning] = useState(false);
    const [completedSound] = useSound(`${import.meta.env.BASE_URL}sounds/completed.mp3`);
    const [endSound] = useSound(`${import.meta.env.BASE_URL}sounds/error.mp3`);
    const [pauseSound] = useSound(`${import.meta.env.BASE_URL}sounds/popup.mp3`);
    const [startSound] = useSound(`${import.meta.env.BASE_URL}sounds/success.mp3`);

    // Use time
    useEffect(() => {
        // don't run until they hit start
        if (!running) return;

        // stop at 0!
        if (time < 0) {
        setRunning(false);
        return;
        }

        const id = setInterval(() => {
            setTime(c => c - 1);
        }, 1000);
        return () => {
            clearInterval(id);
        };
    }, [running]);

    // update display timer
    useEffect(() => {
        if (time < 0) return;
        updateDisplayTime();
    }, [time]);

    // play sound if it ends
    useEffect(() => {
        if(time === 0 && running) {
            completedSound();
        }
    }, [time, running]);

    const start = () => {
        setRunning(true);
        setTime(10);
        startSound();
    };
    
    function updateDisplayTime() {
        // convert to minutes
        let minutes = time / 60;
        let seconds = Math.round((minutes - Math.floor(minutes)) * 60);
        
        // handle padding
        let display = String(Math.floor(minutes)).padStart(2,'0') + ":" + String(seconds).padStart(2, '0');

        // set display time
        setDisplayTime(display);
    }

    const pause = () => {
        setRunning(false);
        pauseSound();
    };

    const stop = () => {
        setRunning(false);
        setTime(0);
        endSound();
    };



    return (
    <main className='flex flex-col items-center justify-center min-h-screen text-white'>
        <div className="flex flex-col items-center border-4 border-double border-white rounded-lg max-w-s p-8 text-white">
            <h2 className='text-2xl font-semibold justify-center'>timer</h2>
            <h1 className='text-9xl font-semibold justify-center'>{displayTime}</h1>
        </div>
        <div className='flex p-4'>
            <button className='m-2 border backdrop-blur-[px] border-white rounded-lg text-white p-2 hover:bg-[#E5E0D8]' onClick={start}>start</button>
            <button className='m-2 border  border-white rounded-lg text-white p-2 hover:bg-[#E5E0D8]' onClick={pause}>pause</button>
            <button className='m-2 border border-white rounded-lg text-white p-2 hover:bg-[#E5E0D8]' onClick={stop}>end</button>
            <button className='m-2 border border-white rounded-lg text-white p-2 hover:bg-[#E5E0D8]' onClick={stop}>skip</button>
        </div>
    </main>
    )
}

export default Main

