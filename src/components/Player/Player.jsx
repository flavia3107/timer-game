import { useRef } from "react";
import { useState } from "react";
import styleClasses from './Player.module.css';

export default function Player() {
  const [player, setPlayer] = useState(null);
  const playerInputRef = useRef();

  function handleClick(){
    setPlayer(playerInputRef.current.value);
  }

  return (
    <section className={styleClasses.plauer}>
      <h2>Welcome { player ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerInputRef} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
