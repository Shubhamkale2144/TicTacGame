import React, { useState } from 'react';
import "../assets/Tic.css"

function Tic() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [nameInput, setNameInput] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(''));
  const [isXTurn, setIsXTurn] = useState(Math.random() > 0.5);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [error, setError] = useState('');

  const handleStart = () => {
    if (player1.trim() === '' || player2.trim() === '') {
      setError('Please enter names for both players.');
      return;
    }

    if (player1.trim().toLowerCase() === player2.trim().toLowerCase()) {
      setError('Player names must be different.');
      return;
    }

    setError('');
    setNameInput(false);
    setBoard(Array(9).fill(''));
    setWinner(null);
    setIsXTurn(Math.random() > 0.5);
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      setScore((prev) => ({
        ...prev,
        [win]: prev[win] + 1,
      }));
    } else if (newBoard.every((cell) => cell !== '')) {
      setWinner('Draw');
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(''));
    setWinner(null);
    setIsXTurn(Math.random() > 0.5);
  };

  const restartGame = () => {
    setNameInput(true);
    setPlayer1('');
    setPlayer2('');
    setBoard(Array(9).fill(''));
    setWinner(null);
    setScore({ X: 0, O: 0 });
  };

  return (
    <div className="game-container">
      {nameInput ? (
        <div className="start-screen">
          <h1>Tic Tac Toe</h1>
          <input
            type="text"
            placeholder="Player 1 Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Player 2 Name"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          <button onClick={handleStart}>Start Game</button>
        </div>
      ) : (
        <div className="game-board">
          <h1>Tic Tac Toe</h1>
          <h2>
            {winner === 'Draw'
              ? 'Game is a Draw 🤝'
              : winner
              ? `🎉 Winner: ${winner === 'X' ? player1 : player2}`
              : `Turn: ${isXTurn ? player1 : player2}`}
          </h2>

          <div className="board">
            {board.map((val, idx) => (
              <div
                key={idx}
                className={`cell ${val ? 'filled' : ''} ${val}`}
                onClick={() => handleClick(idx)}
              >
                {val}
              </div>
            ))}
          </div>

          <div className="scoreboard">
            <p>{player1} (X): {score.X} Wins</p>
            <p>{player2} (O): {score.O} Wins</p>
          </div>

          <div className="buttons horizontal-buttons">
            <button className='button-74'><span onClick={resetBoard}>Reset Board</span></button>
            <button className='button-75'><span onClick={restartGame}>Restart Game</span></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tic;
