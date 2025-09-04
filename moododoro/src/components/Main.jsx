import {useState, useContext } from "react"
import { StateContext } from "../contexts/StateContext";
import { TimerContext } from "../contexts/TimerContext";
import { ImageContext } from "../contexts/ImageContext"

const Main = () => {
    
    // hooks
    const{state} = useContext(StateContext);
    const{startTimer, pauseTimer, skipTimer, endTimer, formatTime, timeLeft, 
        timerCount, isRunning} = useContext(TimerContext);
    const {background} = useContext(ImageContext);

    const isImage = background.startsWith("url(");

    return (
    <main style = {{
        backgroundColor: !isImage ? background : undefined,
        backgroundImage: isImage ? background : undefined,
        backgroundSize: isImage ? "cover" : undefined,
        backgroundPosition: isImage ? "center" : undefined,
     }} 
    className="flex flex-col items-center min-h-screen text-white transition-all duration-500">
        <div className="backdrop-blur flex flex-col items-center border-8 border-double border-white rounded-lg text-white box-border mt-30 p-6 lg:p-12 space-y-2 sm:space-y-4 md:space-y-6">
            <h2 className='text-lg sm:text-xl md:text-3xl lg:text-5xl font-semibold'>{state}</h2>
            <h1 id="timer" className='text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-font-[Cutive Mono]'>
                {formatTime(timeLeft)}
            </h1>
            <h2 className='text-lg sm:text-xl md:text-3xl lg:text-5xl font-semibold'>#{timerCount}</h2>
        </div>
        <div className='flex p-4 md:text-[1.5rem] text-[1rem] '>
            <button className='m-2 border-2 backdrop-blur border-white rounded-lg text-white p-2 hover:bg-[#E5E0D8]' onClick={startTimer}>
                {isRunning ? "pause" : "start"}
            </button>
            <button className='backdrop-blur m-2 border-2 border-white rounded-lg text-white p-2 hover:bg-[#E5E0D8]' onClick={endTimer}>end</button>
            <button className='backdrop-blur m-2 border-2 border-white rounded-lg text-white p-2 hover:bg-[#E5E0D8]'onClick={skipTimer}>skip</button>
        </div>
    </main>
    )
}

export default Main

