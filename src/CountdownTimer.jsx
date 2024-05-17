import React, { useState, useEffect, useRef } from 'react'
import useSound from 'use-sound'
import click from './assets/tick.mp3'
import click2 from './assets/tick2.mp3'
import groove1 from './assets/GrooveA.mp3'
import groove2 from './assets/GrooveB.mp3'
import groove3 from './assets/GrooveC.mp3'

import countdownEnding from './assets/countdownEnding.mp3'

function CountdownTimer({ duration, onTimeUp }) {
   const [playGrooveA] = useSound(groove1)
   const [playGrooveB] = useSound(groove2)
   const [playGrooveC] = useSound(groove3)

   const [playClick] = useSound(click)

   const [playClick2] = useSound(click2)

   const [playEnding] = useSound(countdownEnding)
   //    const [playDing] = useSound(ding)
   const [timeRemaining, setTimeRemaining] = useState(
      duration + 1
   )
   const [count, setCount] = useState(duration + 1)
   const [timeUp, setTimeUp] = useState(false)
   const [intervalId, setIntervalId] = useState(null)
   const [secondsLeft = 0, setSecondsLeft] = useState(0)
   let timerId // Define timerId variable here
   const [visible, setVisible] = useState(false)
   const interValRef = useRef()
   const timerCount = useRef(duration + 1)

   // if (timeRemaining < 11) {
   //    robotTalk(timeRemaining)
   // }
   if (timerCount.current > 2 && timerCount.current % 20 === 0) {
      playGrooveA()
   } else if (
      timerCount.current > 19 &&
      timerCount.current % 10 === 0
   ) {
      playGrooveB()
   } else if (
      timerCount.current > 10 &&
      timerCount.current < 12
   ) {
      playGrooveC()
   }

   function robotTalk(currentTimer) {
      let newWord = `${currentTimer}`
      let utterance = new SpeechSynthesisUtterance(newWord)
      speechSynthesis.speak(utterance)
   }

   // if (count === duration) {
   //    robotTalk(count)
   // }

   console.log('count: ', count)
   console.log('timerCount: ', timerCount.current)

   useEffect(() => {
      let interval = null
      if (count > 0) {
         interval = setInterval(() => {
            if (timerCount.current < 12) {
               robotTalk(timerCount.current - 1)
            }
            timerCount.current = timerCount.current - 1
            setCount(count - 1)
         }, 1000)
      } else {
         onTimeUp()
         clearInterval(interval)
      }
      // return () => clearInterval(intervalId)

      //Prevent memory leak
      return () => clearInterval(interval)
   }, [count])

   // useEffect(() => {
   //    interValRef.current = setInterval(() => {
   //       setCount((count) => count - 1)
   //       robotTalk(count - 1)
   //    }, 1000)
   //    return () => {
   //       clearInterval(interValRef.current)
   //    }
   // })

   // useEffect(() => {
   //    let intervalId = null
   //    if (timeRemaining > 0) {
   //       intervalId = setInterval(() => {
   //          setTimeRemaining((prevTimeRemaining) => {
   //             const newTimeRemaining = prevTimeRemaining - 1
   //             // if (newTimeRemaining < 11) {
   //             //    robotTalk(newTimeRemaining)
   //             // }
   //             // if (newTimeRemaining > 2) {
   //             //    playClick()
   //             // } else if (newTimeRemaining > 1) {
   //             //    playEnding()
   //             // }
   //             return newTimeRemaining
   //          })
   //       }, 1000)
   //    } else {
   //       onTimeUp()
   //       clearInterval(intervalId)
   //    }
   //    return () => clearInterval(intervalId)
   // }, [timeRemaining])

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
                  {/* <span> {timeRemaining} </span> */}
                  {timerCount.current != duration + (1 || 2) && (
                     <span> {timerCount.current}</span>
                  )}
               </span>
            </div>
         )}

         {/* <button onClick={() => playClick()}>PLAY</button> */}
      </div>
   )
}

export default CountdownTimer
