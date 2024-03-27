import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}){
    /**
     * Can't use a normal variable since the function get re-executed because of useState, 
     * so the variable will be re-initialized everytime the function gets executed.
     * This is why is needed useRef
     */
    const timer = useRef();
    const dialog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
    
    if(timeRemaining <= 0 ){
        clearInterval(timer.current);
        dialog.current.open();
    }
   
    function handleStart(){
       timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        },  10);
    }

    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current);
    }
    
    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }

    return <>
    {/* refs can't be passed as properties
        <ResultModal ref={dialog} targetTime={targetTime} result="lost"/>
        To pass ref from parent to child use: forwardRef
    */}
        <ResultModal ref={dialog} targetTime={targetTime} result="lost" 
        remainingTime={timeRemaining} onReset={handleReset}/>
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time"> {targetTime} second {targetTime > 1 ? 's' : ''} </p>
            <p>
                <button onClick={ timerIsActive ? handleStop : handleStart}>{ timerIsActive ? 'Stop':'Start'} Challenge</button>
            </p>
            <p className={ timerIsActive ? 'active': undefined}>
                { timerIsActive ? 'Time is running ...':' Timer inactive '}
            </p>
        </section>
    </> 
}