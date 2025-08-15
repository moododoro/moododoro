import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { StateContextProvider } from './contexts/StateContext'
import { TimerContextProvider } from './contexts/TimerContext'

function App() {

return (
    <>
        <StateContextProvider>
            <TimerContextProvider>
                <Header/>
                <Main />
                <Footer/>
            </TimerContextProvider>
        </StateContextProvider>
    </>
)
}

export default App
