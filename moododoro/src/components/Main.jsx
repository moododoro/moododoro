import {useState} from "react"
import Timer from "./UI/Timer.jsx"
import Button from "./UI/Button.jsx"
const DEFAULT_BG = "#51c4cc"

const Main = () => {

  // hooks
  const [running, setRunning] = useState(false)

  // helper functions
  const handleStart = () => {
    console.log("setting running to true")
    setRunning(true)
  }

  const handlePause = () => {
    console.log("setting running to false")
    setRunning(false)
  }

  const changeMode = () => {
    if (time === 0) {
      console.log("Change mode")
    }
  }

  // component
  return (
  <main className="relative flex flex-col items-center min-h-screen text-white transition-all duration-500 w-full bg-[#51c4cc]">
    <Timer running={running}/>
    <div className="[&>*]:mx-2 [&>*]:p-2 [&>*]:border-2 [&>*]:hover:bg-[#E5E0D8]">
      <Button text="start" onClick={handleStart}/>
      <Button text="pause" onClick={handlePause}/>
      <Button text="next"/>
      <Button text="stop"/>
    </div>

  </main>
  )
}

export default Main

