import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Clock from './components/Clock'

function App() {
    const [workTime, setWorkTime] = useState(1500);
    const [breakTime, setBreakTime] = useState(300);
    const [running, setRunning] = useState(false);
    const [useImage, setImage] = useState("");

return (
    <>
        <Header workTime={workTime} setWorkTime={setWorkTime}
                            breakTime={breakTime} setBreakTime={setBreakTime}
                            useImage={useImage} setImage={setImage}/>
        <Clock workTime={workTime} breakTime={breakTime} 
                running={running} setRunning={setRunning}
                useImage={useImage} setImage={setImage}/>
        <Footer/>
    </>
)
}

export default App
