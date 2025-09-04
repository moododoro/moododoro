import { useState, useContext } from "react";
import { StateContext } from "../contexts/StateContext";
import { TimerContext } from "../contexts/TimerContext";
import { ImageContext } from "../contexts/ImageContext";

const logo = `${import.meta.env.BASE_URL}images/cow.png`;
const vaporWaveBg = `${import.meta.env.BASE_URL}images/retro_futuristic_background.jpg`;
const vaporWaveBgURL = `url(${import.meta.env.BASE_URL}images/retro_futuristic_background.jpg)`;

const Header = () => {
  const [backgroundCard, setBackgroundCard] = useState(false);
  const [settingsCard, setSettingsCard] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile hamburger toggle
  const [customBg, setCustomBg] = useState("");

  const { changeDuration, durations} = useContext(StateContext);
  const {intervalsTilLongBreak, setIntervalsTilLongBreak } = useContext(TimerContext);
  const { changeBackground, changeVideoBackground, setBgIsImage } = useContext(ImageContext);

  const [workTime, setWorkTime] = useState(durations["work"] / 60);
  const [shortBreakTime, setShortBreakTime] = useState(durations["short break"] / 60);
  const [longBreakTime, setLongBreakTime] = useState(durations["long break"] / 60);

  // Handlers
  const toggleBackgroundCard = () => {
    setBackgroundCard(!backgroundCard);
    setSettingsCard(false);
    setMenuOpen(false);
  };

  const toggleSettingsCard = () => {
    setSettingsCard(!settingsCard);
    setBackgroundCard(false);
    setMenuOpen(false);
  };
  const handleSubmitTimers = (e) => {
    setSettingsCard(!settingsCard);
    e.preventDefault();
    const conversion = 60;
    changeDuration("work", workTime * conversion);
    changeDuration("short break", shortBreakTime * conversion);
    changeDuration("long break", longBreakTime * conversion);
  };

  const handleSubmitBg = (e) => {
    setBackgroundCard(!backgroundCard);
    e.preventDefault();
    if(customBg != "") {
      // check for video
      if (customBg.includes("youtu")) {
        setBgIsImage(false);
        changeVideoBackground(customBg);
      } else {
        setBgIsImage(true);
        changeBackground(`url(${customBg})`);
      }
      
    }
  };

  return (
    <div className="relative bg-[#E5E0D8] font-[Franklin Gothic Medium]">
      <header className="flex items-center justify-between bg-[#E5E0D8] py-2 px-4 md:px-8 border-b-2">
        <div className="flex items-center">
          <img src={logo} width="50px" className="mr-4" />
          <h1 className="text-4xl md:text-6xl">moododoro</h1>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-4 text-2xl md:text-4xl text-[#444444]">
          <button onClick={toggleBackgroundCard} className="cursor-pointer">
            background
          </button>
          <button onClick={toggleSettingsCard} className="cursor-pointer">
            settings
          </button>
        </ul>

        {/* Hamburger button for mobile */}
        <button
          className="md:hidden focus:outline-none text-[#444444]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="flex flex-col md:hidden absolute top-full left-0 w-full bg-[#E5E0D8] border-t border-b z-50 p-4 space-y-2">
          <button onClick={toggleBackgroundCard} className="text-left text-2xl">
            background
          </button>
          <button onClick={toggleSettingsCard} className="text-left text-2xl">
            settings
          </button>
        </div>
      )}

      {/* Background card */}
      {backgroundCard && (
        <div className="absolute top-full right-4 md:right-10 z-50 bg-[#E5E0D8] p-4 border rounded shadow-lg w-64">
          <p className="text-3xl mb-2">background</p>
          <p className="text-2xl mb-2">retro-futuristic</p>
          <button className="border mb-2" onClick={() => changeBackground(vaporWaveBgURL)}>
            <img src={vaporWaveBg} alt="retro background" className="hover:opacity-80" />
          </button>
          <p className="text-2xl mb-2">static</p>
          <button
            className="w-[222px] h-[121px] bg-[#51c4cc] hover:opacity-80 rounded border mb-2"
            onClick={() => {
              setBgIsImage(false);
              changeBackground(null);
            }}
          />
          <p className="text-2xl mb-2">Custom</p>
          <form onSubmit={handleSubmitBg}>
            <input
              className="text-2xl border rounded mb-2 p-2 w-full overflow-x-auto whitespace-nowrap"
              type="text"
              onChange={(e) => setCustomBg(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                className="w-[64px] bg-gray-600 m-2 border-2 text-2xl border-white rounded-lg text-white p-1 hover:opacity-80"
                type="submit"
              >
                ok
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Settings card */}
      {settingsCard && (
        <div className="absolute top-full right-4 md:right-10 z-50 bg-[#E5E0D8] p-4 border rounded shadow-lg w-72">
          <p className="text-3xl mb-2">settings</p>
          <form onSubmit={handleSubmitTimers} className="flex flex-col space-y-2">
            <div className="flex flex-col">
              <label className="text-2xl">Work Timer (min)</label>
              <input
                className="text-2xl border rounded"
                type="number"
                step="1"
                min="1"
                max="99"
                value={workTime}
                onChange={(e) => setWorkTime(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-2xl">Short Break Timer (min)</label>
              <input
                className="text-2xl border rounded"
                type="number"
                step="1"
                min="1"
                max="99"
                value={shortBreakTime}
                onChange={(e) => setShortBreakTime(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-2xl">Long Break Timer (min)</label>
              <input
                className="text-2xl border rounded"
                type="number"
                step="1"
                min="1"
                max="99"
                value={longBreakTime}
                onChange={(e) => setLongBreakTime(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-2xl">Long Break Interval</label>
              <input
                className="text-2xl border rounded"
                type="number"
                step="1"
                min="1"
                max="99"
                 value={intervalsTilLongBreak}
                onChange={(e) => setIntervalsTilLongBreak(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                className="w-[64px] bg-gray-600 m-2 border-2 text-2xl border-white rounded-lg text-white p-1 hover:opacity-80"
                type="submit"
              >
                ok
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Header;
