import React, { useState, useEffect, useRef } from 'react';

const Countdown = ({ end_date }) => {
    const Ref = useRef(null);
    const [timer, setTimer] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
    });

    const getTimeRemaining = (endtime) => {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        return {
            total,
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const startTimer = (endtime) => {
        let { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);
        if (total >= 0) {
            setTimer({
                days: days > 9 ? days : "0" + days,
                hours: hours > 9 ? hours : "0" + hours,
                minutes: minutes > 9 ? minutes : "0" + minutes,
                seconds: seconds > 9 ? seconds : "0" + seconds
            });
        } else {
            clearInterval(Ref.current);
        }
    };

    const clearTimer = (endtime) => {
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(endtime);
        }, 1000);
        Ref.current = id;
    };

    useEffect(() => {
        if (end_date) {
            clearTimer(end_date);
        }
        return () => {
            if (Ref.current) clearInterval(Ref.current);
        };
    }, [end_date]);

    return (
        <div className='flex md:flex-row flex-col my-2 md:my-4 md:gap-24 text-black items-center justify-center'>
            <h2 className=''>Offer Ends In:</h2>
            <div className='flex space text-center items-center font-bold '>
                <div className='flex flex-col items-center'>
                    <div>Days</div>
                    <div className='flex items-center space-x-3'>
                        <h2 className='font-extrabold text-3xl'>{timer.days}</h2>
                        <span className='text-red-800 font-[900] text-3xl'>:</span>
                    </div>
                </div>
                <div className='flex flex-col items-center space-x-3'>
                    <div>Hours</div>
                    <div className='flex items-center space-x-3'>
                        <h2 className='font-extrabold text-3xl'>{timer.hours}</h2>
                        <span className='text-red-800 font-extrabold text-3xl'>:</span>
                    </div>
                </div>
                <div className='flex flex-col items-center space-x-4'>
                    <div>Minutes</div>
                    <div className='flex items-center space-x-4'>
                        <h2 className='font-extrabold text-3xl'>{timer.minutes}</h2>
                        <span className='text-red-800 font-extrabold text-3xl'>:</span>
                    </div>
                </div>
                <div className='flex flex-col items-center space-x-3'>
                    <div>Seconds</div>
                    <h2 className='font-extrabold text-3xl'>{timer.seconds}</h2>
                </div>
            </div>
        </div>
    );
};

export default Countdown;
