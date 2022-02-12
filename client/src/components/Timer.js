import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props) => {
    const a = new Date()
    const b = new Date(props.auctionEndDate)
    const diff = function (a, b) {
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());

        return Math.floor((utc2 - utc1) / 1000);
    }
    const initialDays = Math.floor(diff(a, b) / 60 / 60 / 24);
    const initialHour = Math.floor((diff(a, b) - initialDays * 60 * 60 * 24) / 60 / 60);
    const initialMinute = Math.floor(((diff(a, b) - initialDays * 60 * 60 * 24) - initialHour * 60 * 60) / 60);;
    const initialSeconds = Math.floor(((diff(a, b) - initialDays * 60 * 60 * 24) - initialHour * 60 * 60) - initialMinute * 60)

    const [days, setDays] = useState(initialDays);
    const [hours, setHours] = useState(initialHour);
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    useEffect(() => {
        if (initialDays >= 0 && initialHour >= 0 && initialMinute >= 0 && initialSeconds >= 0) {
            let myInterval = setInterval(() => {
                if (seconds <= 0 && minutes <= 0 && hours <= 0 && days <= 0) {
                    return () => {
                        clearInterval(myInterval);
                    }
                }
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
                if (seconds === 0 && minutes === 0 && hours === 0 && days > 0) {
                    setDays(days - 1);
                    setHours(23);
                    setMinutes(59);
                    setSeconds(59);
                }

            }, 1000)
            return () => {
                clearInterval(myInterval);
            };
        } else { setDays(0); setHours(0); setMinutes(0); setSeconds(0) }
    });

    return (
        <div>
            {hours === 0 && minutes === 0 && seconds === 0 && days < 0
                ? null
                : <div> {days === 0 ? `` : days < 2 ? `${days} Day and` : `${days} Days and`} {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
            }
        </div>
    )
}

export default Timer;