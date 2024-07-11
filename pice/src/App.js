import React, { useState } from 'react';
import './App.css';
import Board from './Components/Board';

const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [player, setPlayer] = useState('W');
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(initialBoard);
    setSelectedPiece(null);
    setPlayer('W');
    setWinner(null);
  };

  const isMoveLegal = (board, from, to) => {
    const piece = board[from.row][from.col];
    const isWhitePiece = piece === piece.toUpperCase();

    // Check if there are any capturing moves available
    const capturingMoves = getCapturingMoves(board, isWhitePiece);

    if (capturingMoves.length > 0) {
      // If there are capturing moves
      return capturingMoves.some(move =>
        move.from.row === from.row &&
        move.from.col === from.col &&
        move.to.row === to.row &&
        move.to.col === to.col
      );
    }

    // If there are no capturing moves
    return isValidChessMove(board, from, to);
  };

  const getCapturingMoves = (board, isWhitePiece) => {
    const capturingMoves = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if ((isWhitePiece && piece === piece.toUpperCase()) ||
          (!isWhitePiece && piece === piece.toLowerCase())) {
          const moves = getPieceMoves(board, { row, col });
          const captures = moves.filter(move =>
            board[move.to.row][move.to.col] !== '' &&
            isOpponentPiece(board[move.to.row][move.to.col], isWhitePiece)
          );
          capturingMoves.push(...captures);
        }
      }
    }

    return capturingMoves;
  };

  const isOpponentPiece = (piece, isWhitePiece) => {
    return isWhitePiece ? piece === piece.toLowerCase() : piece === piece.toUpperCase();
  };

  const isValidChessMove = (board, from, to) => {

    return true;
  };

  const getPieceMoves = (board, from) => {

    return [];
  };

  const handleSquareClick = (row, col) => {
    if (winner) return;

    if (selectedPiece) {
      if (isMoveLegal(board, selectedPiece, { row, col })) {
        const newBoard = board.map((r, rowIndex) =>
          r.map((c, colIndex) => {
            if (rowIndex === selectedPiece.row && colIndex === selectedPiece.col) {
              return '';
            }
            if (rowIndex === row && colIndex === col) {
              return board[selectedPiece.row][selectedPiece.col];
            }
            return c;
          })
        );
        setBoard(newBoard);
        setSelectedPiece(null);
        setPlayer(player === 'W' ? 'B' : 'W');
        checkForWinner(newBoard);
      } else {
        alert('Illegal move! Capturing is mandatory when possible.');
        setSelectedPiece(null);
      }
    } else {
      if (board[row][col] && (player === 'W' ? board[row][col] === board[row][col].toUpperCase() : board[row][col] === board[row][col].toLowerCase())) {
        setSelectedPiece({ row, col });
      }
    }
  };

  const checkForWinner = (board) => {
    const whitePieces = board.flat().filter(piece => piece === piece.toUpperCase() && piece !== '');
    const blackPieces = board.flat().filter(piece => piece === piece.toLowerCase() && piece !== '');

    if (whitePieces.length === 0) {
      setWinner('W');
    } else if (blackPieces.length === 0) {
      setWinner('B');
    }
  };

  return (
    <div className="app">
      <h1>Chess Game</h1>
      {winner ? (
        <h2>{winner === 'W' ? 'P1 (Grey)' : 'P2 (Black)'} wins!</h2>
      ) : (
        <h2>{player === 'W' ? 'P1 (Grey)' : 'P2 (Black)'}'s turn</h2>
      )}
      <Board board={board} onSquareClick={handleSquareClick} />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button onClick={resetGame}>Reset</button>
        <button onClick={() => setWinner(player === 'W' ? 'B' : 'W')}>Quit</button>
      </div>

    </div>
  );
};

export default App;