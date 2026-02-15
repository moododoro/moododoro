import { useState, useEffect } from 'react';

function App() {
    const [workTime, setWorkTime] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(0);
    const [displayTime, setDisplayTime] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string | null>('');
    const [isRunning, setIsRunning] = useState(false);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        // console.log(`Submission entered ${inputValue}`);

        const numericTime = Number(inputValue);
        setWorkTime(numericTime);
        setDisplayTime(numericTime);
    }

    /**
     * Formats time in seconds to a clock time
     * @param time in seconds
     * @returns mm:ss
     */
    function formatTime(time: number): string {
        // console.log(`Formatting time ${time}`);
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, '0');
        // console.log(`Minutes ${minutes}`);
        const seconds = Math.floor(time - minutes * 60)
            .toString()
            .padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    function runTimer() {
        // update startTime
        setStartTime(new Date().getTime());
        // set runTimer to true
        setIsRunning((prev) => !prev);
    }

    useEffect(() => {
        // don't run if not set to true
        if (!isRunning) {
            return;
        }

        // update timer
        const intervalId = setInterval(() => {
            // console.log('updating timer');
            // get currently elapsed time
            setDisplayTime(() => {
                return workTime - Math.floor((Date.now() - startTime) / 1000);
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
            // console.log('interval cleared');
        };
    }, [isRunning]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Enter time:</p>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="border">Submit</button>
            </form>

            <p>{formatTime(displayTime)}</p>
            <button onClick={() => runTimer()}>Start timer</button>
        </div>
    );
}

export default App;
