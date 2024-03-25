import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}){
    const [timerExpired, setTimerExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const dialog = useRef();

    /**
     * Can't use a normal variable since the function get re-exectuted because of useState, 
     * so the variable will be re-initialized everytime the function gets executed.
     * This is why is needed useRef
     */
    const timer = useRef(); 

    function handleStart(){
       timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialog.current.showModal();
        }, targetTime * 1000);
        
        setTimerStarted(true)
    }

    function handleStop(){
        clearTimeout(timer.current)
    }

    return <>
    {/* refs can't be passed as properties
        <ResultModal ref={dialog} targetTime={targetTime} result="lost"/>
        To pass ref from parent to child use: forwardRef
    */}
        <ResultModal ref={dialog} targetTime={targetTime} result="lost"/>
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time"> {targetTime} second {targetTime > 1 ? 's' : ''} </p>
            <p>
                <button onClick={ timerStarted ? handleStop : handleStart}>{ timerStarted ? 'Stop':'Start'} Challenge</button>
            </p>
            <p className={ timerStarted ? 'active': undefined}>
                { timerStarted ? 'Time is running ...':' Timer inactive '}
            </p>
        </section>
    </> 
}