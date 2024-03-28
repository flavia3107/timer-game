import {forwardRef, useImperativeHandle, useRef} from 'react';
import { createPortal } from 'react-dom';
import styleClasses from './ResultModal.module.css';
/**
 * forwardRef will forward the ref value from TimeChallenge (parent) to ResultModal (child).
 * To use forwardRef the component function will be wrapped with it, which will return a new component
 * as a result (store in a constant which will be used in the parent component to use the child)
 * The child component will get a ref property (a second property , out of the destructered object) which will 
 * be the parent's ref. That will be used as a property value inside the child component.
 * The parent component will pass the ref property as a normal property.
 */

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset}, ref){
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedRemaingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000))*100);

    useImperativeHandle(ref, () => ({
        open(){
            dialog.current.showModal();
        }
    }))
    /**
     * useImperativeHandle - hook used to make sure that the app won't break when a developer modifies the jsx 
     * code of a component, whose functions are being used in a different component.
     * What this hook does, it makes sure that functions will always be available by exposing them, and making them 
     * independent from the possible changes of the jsx. 
     * Everything will work as long as the functions are exposed and the component itself works as expected.
     * Also the hook will always work with the forwardRef hook.
     */

    return createPortal(<dialog ref={dialog} className={styleClasses.result_modal} onClose={onReset}>
            {userLost && <h2>You lost </h2>}
            {!userLost && <h2>Your Score: {score} </h2>}

            <p>The target time was <strong>{targetTime}</strong> seconds. </p>
            <p>You stopped the timer with <strong> {formattedRemaingTime} seconds left</strong> </p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>, 
        document.getElementById('modal')
    );
});

export default ResultModal;