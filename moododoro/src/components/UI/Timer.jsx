import { useState } from "react"

export const Timer = ({running, clock}) => {

  // hooks and props
  const [mode, setMode] = useState("work")
  const modes = {"work":5, "short break":3, "long break":4}
  const [time,setTime] = useState(modes[mode])
  const [counter, setCounter] = useState(1)
  let longBreakInter = 3

  /* Helper functions */

  // this updates timer
  setTimeout(()=>{
    if (running && time > 0) {
      setTime(modes["long break"])
      setTime(time - 1)
    } else if (running && time === 0) {
      console.log("mode change")
      changeMode()
    }
  },1000)

  // this formats it correctly
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60

    // pad to two digits
    return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}` 
  }

  // change mode logic
  const changeMode = () => {
    if (mode === "work") {
      // check for long break or short break break
      if (counter % longBreakInter === 0) {
        setMode("long break")
        setTime(modes["long break"])
      } else {
        setMode("short break")
        setTime(modes["short break"])
      }
    } else {
      setMode("work")
      setCounter(counter + 1);
      setTime(modes["work"])
    }
  }

  // component
  return (
    <div className="border-2 border-solid flex flex-col items-center p-2 m-2">
      <h1 id="timer">{formatTime(time)}</h1>
      <p>Counter: {counter}</p>
      <p>{mode}</p>
    </div>


  )
}

export default Timer
