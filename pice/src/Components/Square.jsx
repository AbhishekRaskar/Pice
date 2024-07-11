import React from 'react';

const Square = ({ piece, onClick }) => {
  let displayPiece;
  switch (piece.toLowerCase()) {
    case 'p': displayPiece = '♟'; break;
    case 'r': displayPiece = '♜'; break;
    case 'n': displayPiece = '♞'; break;
    case 'b': displayPiece = '♝'; break;
    case 'q': displayPiece = '♛'; break;
    case 'k': displayPiece = '♚'; break;
    default: displayPiece = '';
  }

  return (
    <button className="square" onClick={onClick}>
      <span style={{ color: piece === piece.toUpperCase() ? '#616161' : 'black' }}>
        {displayPiece}
      </span>
    </button>
  );
};

export default Square;