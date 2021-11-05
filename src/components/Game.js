import { Container, imageListClasses } from "@mui/material";
import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";
import useMediaQuery from '@mui/material/useMediaQuery';
import  image from './image.jpeg';import Carousel from "./carosal";
;

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

    const matches = useMediaQuery('(min-width:600px)');

  return (
    <>
      <h1>ARJuN GAmE</h1>
      <Board squares={history[stepNumber]} onClick={handleClick} match={matches}/>
      
      

      <div className="info-wrapper">
        <div>
          <p></p>
          {renderMoves()}
        </div>
        <h1 style={{alignItems: "center"}}>{winner ? "Winner: " + winner : "Next Player: " + xO}</h1>
      </div>
      
    </>
  );
};

export default Game;
