import { useState } from "react"

export const Timer = ({running, clock}) => {

  // hooks and props
  const [mode, setMode] = useState("work")
  const modes = {work:5, short:3, long:4}
  const [time,setTime] = useState(modes[mode])

  /* Helper functions */

  // this updates timer
  setTimeout(()=>{
    if (running && time > 0) {
      setTime(time - 1)
    } else if (running && time === 0) {
      console.log("mode change")
      
      if (mode === "work") {
        setMode("short")
      } else {
        setMode("work")
      }
      setTime(modes[mode])
    }
  },1000)

  // this formats it correctly
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    return `${minutes}:${seconds}` 
  }

  // component
  return (
    <div>{formatTime(time)}</div>

  )
}

export default Timer
