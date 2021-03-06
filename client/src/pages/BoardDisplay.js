import React from 'react';
import Navbar from '../components/navigation/Navbar';
import Board from '../components/boards/Board';

const BoardDisplay = (props) => {
  const { boardId } = props.match.params;

  return (
    <div className="h-full w-full min-h-screen bg-green-500">
      <div className="w-full transparent-black px-1 py-1">
        <Navbar />
      </div>
      <div className="h-screen overflow-x-scroll">
        <Board boardId={boardId} />
      </div>
    </div>
  );
};

export default BoardDisplay;
