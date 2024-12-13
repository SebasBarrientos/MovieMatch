import { log } from 'node:console';
import React, { useState } from 'react';

interface MovieProps {
  title: string;
  overview: string;
  posterPath: string;
  onVote: (vote: boolean) => void; // Callback for voting, `true` for positive, `false` for negative
  winner:number | null;
}

const MovieCard: React.FC<MovieProps> = ({ title, overview, posterPath, onVote, winner }) => {
  const [modalOpen, setModalOpen] = useState(false);
  if (winner!=null) {
    setModalOpen(true)
  }

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      {/* Movie Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className="rounded-lg shadow-lg mb-6"
      />

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>

      {/* Overview */}
      <p className="text-center text-gray-300 mb-6">{overview}</p>

      {/* Vote Buttons */}
      <div className="flex justify-around w-full">
        <button
          onClick={() => onVote(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg flex items-center"
        >
          <span className="material-icons mr-2">check</span> Vote
        </button>
        <button
          onClick={() => onVote(false)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg flex items-center"
        >
          <span className="material-icons mr-2">close</span> Reject
        </button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Category Matched</h2>
            <p className="mb-4">
              The winner is: <span className="font-semibold">{title}</span>
            </p>
            {/* <button
              onClick={handleContinue}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Restar
            </button> */} //Poner que redirija a home
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
