import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props) => {
    // const {initialMinute = 0,initialSeconds = 0} = props;
    const initialHour = 1;
    const initialMinute = 1;
    const initialSeconds = 20;
    // const a = new Date()
// const b = new Date(props.flightDate)
// console.log(props.flightDate)
// const diff = async function (a, b) {
//   const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
//   const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());

//   return Math.floor((utc2 - utc1) / 1000);
// }
// console.log("ttt",diff(a, b))
// const initialDays = Math.floor(diff(a, b) /60/60/24);
// const initialHour = Math.floor((diff(a, b)-initialDays*60*60*24) / 60/60);
// const initialMinute = Math.floor(((diff(a, b)-initialDays*60*60*24) - initialHour*60*60)/60);;
// const initialSeconds = Math.floor(((diff(a, b)-initialDays*60*60*24) - initialHour*60*60) -initialMinute*60)
// console.log(initialDays, initialHour, initialMinute, initialSeconds)


    const [hours, setHours] = useState(initialHour);
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0 && minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
            if (seconds === 0 && minutes === 0 && hours > 0) {
                setHours(hours - 1);
                setMinutes(59);
                setSeconds(59);
            }
            if (seconds === 0 && minutes === 0 && hours === 0){
                clearInterval(myInterval)
            }
            
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <div>
            {hours === 0 && minutes === 0 && seconds === 0
                ? null
                : <h1> {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
        </div>
    )
}

export default Timer;