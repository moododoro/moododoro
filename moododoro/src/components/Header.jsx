import {useState, useContext } from "react"
const logo = `${import.meta.env.BASE_URL}images/cow.png`
const bgimage = `${import.meta.env.BASE_URL}images/retro_futuristic_background.jpg`
import { StateContext } from "../contexts/StateContext"
import { TimerContext } from "../contexts/TimerContext"

const Header = () => {
  
  const [backgroundCard, setBackgroundCard] = useState(false);
  const [settingsCard, setSettingsCard] = useState(false);
  const {changeDuration, durations, state, changeState} = useContext(StateContext);
  const {setIsRunning, setTimeLeft} = useContext(TimerContext);
  const [workTime, setWorkTime] = useState(durations["work"]/60);
  const [shortBreakTime, setShortBreakTime] = useState(durations["short break"]/60);
  const [longBreakTime, setLongBreakTime] = useState(durations["long break"]/60);


  // handles background card generation
  function backgrounds() {
    setSettingsCard(false); // close settings card
    setBackgroundCard(!backgroundCard) // open / close bg card
    
  }

  // handles settings card 
  function settings() {
    setBackgroundCard(false); // closses bg card
    setSettingsCard(!settingsCard)
  }

  function changeBackgroundImage() {
    // change background in main?
    console.log(bgimage);
    setImage(bgimage);
  }

  function changeToClassic() {
    // change background to default color
    setImage();
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // no page reload
    changeDuration("work", workTime * 60);
    changeDuration("short break", shortBreakTime * 60);
    changeDuration("long break", shortBreakTime * 60);            
  }

  return (
    <div className="relative bg-[#E5E0D8]">
          
      <header className="flex bg-[#E5E0D8] items-center py-2 border-b-2">
          <nav className="flex items-center w-full text-[#444444]">
              <img src={logo} width="50px" className="ml-4 mr-4"/>
              <h1 className="mr-4 text-6xl">moododoro</h1>
              <ul className="flex text-4xl ml-auto">
                  <button onClick={backgrounds} className="mr-4 cursor-pointer">background</button>
                  <button onClick={settings} className="mr-4 cursor-pointer">settings</button>
              </ul>
          </nav>
      </header>

      {backgroundCard && (
        <div className="absolute top-25 right-[10ch] z-50 bg-[#E5E0D8] p-4 border rounded shadow-l w-64">
          <p className="text-3xl mb-2">background</p>
          <p className="text-2xl mb-2">retro-futuristic</p>
          <button className= "border" onClick={changeBackgroundImage}>
            <img src={bgimage} alt="Custom Button" className="hover:opacity-80" />
          </button>
          <p className="text-2xl mb-2">static</p>
          <button className="w-[222px] h-[121px] bg-[#51c4cc] hover:opacity-80 rounded border" onClick={changeToClassic}>
          </button>
        </div>
      )}

      {settingsCard && (
        <div className="absolute top-25 right-[10ch] z-50 bg-[#E5E0D8] p-4 border rounded shadow-l w-72">
          <p className="text-3xl mb-2">settings</p>
          <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-2xl">Work Timer (min)</label>
            <input className="text-2xl border rounded mb-2" type="number" step="1" max="99"  min="1" defaultValue={workTime}
            onChange={(e) => setWorkTime(Number(e.target.value))}/>
          </div>
          <div className="flex flex-col">
            <p className="text-2xl">Short break Timer (min)</p>
            <input className="text-2xl border rounded mb-2 " type="number" max="99" min="1" defaultValue={shortBreakTime}
            onChange={(e) => setShortBreakTime(Number(e.target.value))}/>
          </div>
          <div className="flex flex-col">
            <p className="text-2xl">Long break Timer (min)</p>
            <input className="text-2xl border rounded mb-2"
            type="number" 
            max="99"
            min="1"
            defaultValue={longBreakTime}
            onChange={(e) => setLongBreakTime(Number(e.target.value))}/>
          </div >
            <div className="flex justify-end mt-2">
              <button className="w-[16] bg-backdrop-blur bg-gray-600 m-2 border-2 text-2xl border-white rounded-lg text-white p-2 hover:opacity-80" 
                type="submit"> 
                ok
              </button>
            </div>
            
          </form>

        </div>
      )}
        
    </div>
  )
}

export default Header