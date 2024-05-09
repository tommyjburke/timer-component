import React, { useState, useEffect } from 'react'
import useSound from 'use-sound'
import click from './assets/tick.mp3'

import countdownEnding from './assets/countdownEnding.mp3'

function CountdownTimer({ duration, onTimeUp }) {
   const [playClick] = useSound(click)
   const [playEnding] = useSound(countdownEnding)
   //    const [playDing] = useSound(ding)
   const [timeRemaining, setTimeRemaining] = useState(duration)
   const [timeUp, setTimeUp] = useState(false)
   const [intervalId, setIntervalId] = useState(null)
   const [secondsLeft = 0, setSecondsLeft] = useState(0)
   let timerId // Define timerId variable here

   if (timeRemaining > 2) {
      playClick()
   } else if (timeRemaining > 1) {
      playEnding()
   }

   useEffect(() => {
      let intervalId = null

      if (timeRemaining > 0) {
         intervalId = setInterval(() => {
            setTimeRemaining(
               (prevTimeRemaining) => prevTimeRemaining - 1
            )
         }, 1000)
      } else {
         onTimeUp()
         clearInterval(intervalId)
      }
      return () => clearInterval(intervalId)
   }, [timeRemaining])

   return (
      <div className='timerContainer'>
         {/* <div className='countdown-timer2'> */}
         {timeRemaining === 0 ? (
            <div>_</div>
         ) : (
            <div
               className='timerCircle'
               //            {
               //       timeRemaining % 2 === 0
               //          ? 'countdown-flashing'
               //          : ''
               //    }
            >
               <span style={{ fontSize: 30 }}>
                  {timeRemaining}
               </span>
            </div>
         )}

         {/* <button onClick={() => playClick()}>PLAY</button> */}
      </div>
   )
}

export default CountdownTimer
