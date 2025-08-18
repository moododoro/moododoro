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
        <div className="backdrop-blur flex flex-col items-center border-8 border-double border-white rounded-lg p-8 text-white box-border w-[600px] h-min mt-30">
            <h2 className='text-4xl font-semibold'>{state}</h2>
                <h1 id="timer" className='text-center text-[10rem] font-[Cutive Mono]'>
                {formatTime(timeLeft)}
                </h1>
            <h2 className='text-4xl font-semibold'>#{timerCount}</h2>
        </div>
        <div className='flex p-4 text-[1.5rem]'>
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

