import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { StateContextProvider } from './contexts/StateContext'
import { TimerContextProvider } from './contexts/TimerContext'
import { ImageContextProvider } from './contexts/ImageContext'

function App() {

return (
    <>
        <StateContextProvider>
            <TimerContextProvider>
                <ImageContextProvider>
                    <Header/>
                    <Main />
                    <Footer/>
                </ImageContextProvider>
            </TimerContextProvider>
        </StateContextProvider>
    </>
)
}

export default App
