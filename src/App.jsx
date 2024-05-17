import { useState } from 'react'

import './App.css'
import Lorem from './Lorem'
import Timer from './Timer'
import CountdownTimer from './CountdownTimer'

function App() {
   const [showLorem, setShowLorem] = useState(false)

   const [duration, setDuration] = useState(30)
   const [timerComplete, setTimerComplete] = useState(false)
   const [timerStarted, setTimerStarted] = useState(false)
   const [timeUp, setTimeUp] = useState(false)
   const [gameOver, setGameOver] = useState('')
   const [isDisabled, setIsDisabled] = useState(false)

   const startTimer = () => {
      setIsDisabled(true)
      if (!timerStarted) {
         setTimerComplete(false)
         setTimerStarted(true)
         setGameOver('')
      } else {
         setTimerStarted(false)
         setGameOver('')
         setIsDisabled(false)
      }
   }

   const onTimeUp = () => {
      setTimerStarted(false)
      setGameOver('GAME OVER!')
      setIsDisabled(false)
   }

   const handleDurationChange = (e) => {
      setDuration(parseInt(e.target.value, 10))
   }

   const handleBlur = (e) => {
      const newValue = parseInt(e.target.value, 10)
      if (isNaN(newValue) || newValue % 10 !== 0) {
         e.target.value = value
      }
   }

   return (
      <>
         <div>
            {!isDisabled && (
               <input
                  step={10}
                  min={10}
                  className='large-input'
                  type='number'
                  value={duration}
                  onChange={handleDurationChange}
                  placeholder='Enter duration in seconds'
                  onBlur={handleBlur}
                  disabled={isDisabled}
               />
            )}
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
               <h1>{gameOver}</h1>
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

         <div className='flashing-element'>
            <> {timerStarted && <Lorem />}</>
         </div>
      </>
   )
}

export default App
