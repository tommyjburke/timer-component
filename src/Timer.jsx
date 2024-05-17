import { useEffect, useState, useRef } from 'react'
import useSound from 'use-sound'

import tick from './assets/tick.mp3'

export default function Timer({
   duration,
   timerComplete,
   setTimerComplete,
   setTimerStarted,
}) {
   const [timer, setTimer] = useState(null)
   const timerRef = useRef(null)
   const [playClick] = useSound(tick)

   useEffect(() => {
      if (duration > 0 && !timerComplete) {
         playClick()
         const startTime = Date.now()
         const endTime = startTime + duration * 1000

         const intervalId = setInterval(() => {
            const remaining = Math.max(0, endTime - Date.now())
            setTimer(Math.ceil(remaining / 1000))

            if (remaining === 0) {
               clearInterval(intervalId)
               setTimerComplete(true)
               setTimerStarted(false)
            }
         }, 1000)

         timerRef.current = intervalId
      }

      return () => {
         clearInterval(timerRef.current)
      }
   }, [duration, timerComplete, setTimerComplete])

   return (
      <>
         {timer !== null && (
            <div className='flashing-element'>
               <div className='timerContainer flashing-element'>
                  <div className='timerCircle flashing-element'>
                     {timer}
                  </div>
               </div>
            </div>
         )}
         <button onClick={() => playClick()}>PLAY</button>
      </>
   )
}
