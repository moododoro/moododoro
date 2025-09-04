import {useState, useContext } from "react"
import { StateContext } from "../contexts/StateContext";
import { TimerContext } from "../contexts/TimerContext";
import { ImageContext } from "../contexts/ImageContext"

const Main = () => {
    
    // hooks
    const{state} = useContext(StateContext);
    const{startTimer, pauseTimer, skipTimer, endTimer, formatTime, timeLeft, 
        timerCount, isRunning, resetTimer} = useContext(TimerContext);
    const {background, bgIsImage} = useContext(ImageContext);
    const isImage = background.startsWith("url(");

    return (
    <main className="relative flex flex-col items-center min-h-screen text-white transition-all duration-500 w-full">

      {/* Video background */}
      {!bgIsImage && (
        <iframe 
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${background}?autoplay=0&mute=0&loop=1&playlist=${background}&controls=1&modestbranding=1`}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Background Video"
        >
        </iframe>
      )}

      {/* Image or color background */}
      {bgIsImage && (
        <div
          className="absolute top-0 left-0 w-full h-full -z-10"
          style={{
            backgroundColor: !isImage ? background : undefined,
            backgroundImage: isImage ? background : undefined,
            backgroundSize: isImage ? "cover" : undefined,
            backgroundPosition: isImage ? "center" : undefined,
          }}
        />
      )} 
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
            <button className='backdrop-blur m-2 border-2 border-white rounded-lg text-white p-2 hover:bg-[#E5E0D8]'onClick={resetTimer}>reset</button>
        </div>
    </main>
    )
}

export default Main

