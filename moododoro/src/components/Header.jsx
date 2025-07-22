import {useState, useEffect } from "react"
const logo = `${import.meta.env.BASE_URL}images/cow.png`
const bgimage = `${import.meta.env.BASE_URL}images/retro_futuristic_background.jpg`

const Header = ({workTime, setWorkTime, breakTime, setBreakTime, setImage, useImage}) => {
  const [backgroundCard, setBackgroundCard] = useState(false);
  const [settingsCard, setSettingsCard] = useState(false);
  // TODO: add settings card on click to show timer settings
  // TODO: add background card on click to let user select background / add
  //       their own

  //TODO: fill out background functionality
  //TODO: finish settings functionality


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

  return (
    <div className="relative bg-[#E5E0D8]">
          
      <header className="flex bg-[#E5E0D8] items-center py-2 border-b-2">
          <nav className="flex items-center w-full text-[#444444]">
              <img src={logo} width="50px" className="ml-4 mr-4"/>
              <h1 className="mr-4 text-4xl">moododoro</h1>
              <ul className="flex text-2xl ml-auto">
                  <button onClick={backgrounds} className="mr-4 cursor-pointer">background</button>
                  <button onClick={settings} className="mr-4 cursor-pointer">settings</button>
              </ul>
          </nav>
      </header>

      {backgroundCard && (
        <div className="absolute top-15 right-1 z-50 bg-[#E5E0D8] p-4 border rounded shadow-l w-64">
          <p className="text-2xl">background</p>
          <p className="text">retro-futuristic</p>
          <button className= "border" onClick={changeBackgroundImage}>
            <img src={bgimage} alt="Custom Button" className="hover:opacity-80" />
          </button>
          <p className="text">static</p>
          <button className="w-[222px] h-[121px] bg-[#51c4cc] hover:opacity-80 rounded border" onClick={changeToClassic}>
          </button>
        </div>
      )}

      {settingsCard && (
        <div className="absolute top-15 right-1 bg-[#E5E0D8] p-4 border rounded shadow-l">
          <p className="text-2xl">settings</p>
          <div className="flex flex-col">
            <p>Work Timer</p>
            <input className="border rounded" type="number" defaultValue={1500}
            onChange={(e) => setWorkTime(Number(e.target.value))}/>
          </div>
          <div className="flex flex-col">
            <p>Break Timer</p>
            <input className="border rounded" type="number" defaultValue={300}
            onChange={(e) => setBreakTime(Number(e.target.value))}/>
          </div>
        </div>
      )}
        
    </div>
  )
}

export default Header