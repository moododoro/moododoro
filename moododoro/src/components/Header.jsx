import { useState} from "react";
import Button from "./UI/Button.jsx"
const logo = `${import.meta.env.BASE_URL}images/cow.png`;
const vaporWaveBg = `${import.meta.env.BASE_URL}images/retro_futuristic_background.jpg`;
const vaporWaveBgURL = `url(${import.meta.env.BASE_URL}images/retro_futuristic_background.jpg)`;

const Header = () => {

  const handleSettingsClick = () => {
    console.log("clicked settings")
  }

  const handleBackgroundClick = () => {
    console.log("clicked background")
  }
      
  // bg-[#E5E0D8] font-[Franklin Gothic Medium]
  return (
   <nav className="bg-[#E5E0D8] h-[40px] font-[Franklin Gothic Medium] border-b-2 flex flex-row [&_*]:mx-2 [&_*]:items-center">
      <div className="flex flex-row text-2xl">
        <img className="h-[35px]" src={logo}/>
        <h1>moododoro</h1>
      </div>
      <div className="flex w-screen justify-end text-2xl">
        <Button text="settings" onClick={handleSettingsClick}/>
        <Button text="background" onClick={handleBackgroundClick}/>
      </div>
   </nav>
  )
};

export default Header;
