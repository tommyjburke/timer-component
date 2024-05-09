import { useState } from 'react'

import './App.css'
import Lorem from './Lorem'
import Timer from './Timer'
import CountdownTimer from './CountdownTimer'

function App() {
   const [showLorem, setShowLorem] = useState(false)

   const [duration, setDuration] = useState(6)
   const [timerComplete, setTimerComplete] = useState(false)
   const [timerStarted, setTimerStarted] = useState(false)
   const [timeUp, setTimeUp] = useState(false)

   const startTimer = () => {
      if (!timerStarted) {
         setTimerComplete(false)
         setTimerStarted(true)
      } else {
         setTimerStarted(false)
      }
   }

   const onTimeUp = () => {
      setTimerStarted(false)
   }

   const handleDurationChange = (e) => {
      setDuration(parseInt(e.target.value, 10))
   }

   return (
      <>
         <div>
            <input
               className='large-input'
               type='number'
               value={duration}
               onChange={handleDurationChange}
               placeholder='Enter duration in seconds'
            />
            {/* <div>
               <button onClick={startTimer}>Start Timer</button>
               {timerStarted && (
                  <Timer
                     duration={duration}
                     timerComplete={timerComplete}
                     setTimerComplete={setTimerComplete}
                     setTimerStarted={setTimerStarted}
                  />
               )}
               {timerComplete && <div>Timer Complete</div>}
            </div> */}
            <div>
               <button onClick={() => startTimer()}>
                  {timerStarted ? 'STOP' : 'START'}
               </button>
               {timerStarted && (
                  <CountdownTimer
                     duration={duration}
                     onTimeUp={onTimeUp}
                     // setTimerComplete={setTimerComplete}
                     // setTimerStarted={setTimerStarted}
                  />
               )}
               {timerComplete && <div>Timer Complete</div>}
            </div>
         </div>
         <br />
         <div>
            {/* <button
               onClick={() =>
                  setShowLorem((isShowing) => !isShowing)
               }
            >
               LOREM
            </button> */}
         </div>

         <div>
            <> {timerStarted && <Lorem />}</>
         </div>
      </>
   )
}

export default App
