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
   <nav className="bg-[#E5E0D8] h-[50px] font-[Franklin Gothic Medium]">
    <ol className="flex flex-row">
      <li> <img className="h-[50px]" src={logo}/> </li>
      <li><Button text="settings" onClick={handleSettingsClick}/></li>
      <li><Button text="background" onClick={handleBackgroundClick}/></li>
    </ol>
   </nav>
  )
};

export default Header;
