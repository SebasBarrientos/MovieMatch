import React from 'react';

interface MovieProps {
  title: string;
  overview: string;
  posterPath: string;
  onVote: (vote: boolean) => void; // Callback for voting, `true` for positive, `false` for negative
}

const MovieCard: React.FC<MovieProps> = ({ title, overview, posterPath, onVote }) => {
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
    </div>
  );
};

export default MovieCard;
