import React from 'react';
import Square from './Square';

const Board = ({ board, onSquareClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((piece, colIndex) => (
            <Square
              key={colIndex}
              piece={piece}
              onClick={() => onSquareClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;