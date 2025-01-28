import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import socketService from "../GlobalRedux/features/socket/socketService";

interface MovieProps {
  title: string;
  overview: string;
  posterPath: string;
  release_date: any;
  onVote: (vote: boolean) => void;
  winner: any;
}

const MovieCard: React.FC<MovieProps> = ({
  title,
  overview,
  posterPath,
  release_date,
  onVote,
  winner,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonState, setButtonState] = useState({
    text: "Where can I find it?",
    disabled: false,
  });

  const router = useRouter();
  const { socket, room } = useSelector((state: RootState) => state.socket);

  const roomId: any = room.roomId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (winner != null) {
      setModalOpen(true);
    }
  }, [winner]);
  const closeModal = () => {
    setModalOpen(false)
  }
  const handleContinueToProviders = async () => {
    const movieId = winner.id;
    console.log(movieId);

    try {
      const url = await socketService.movieProviders(roomId, movieId);
      console.log(url);

      if (url === "Only in Cinemas") {
        console.log("Solo en cines");
        setButtonState({
          text: "We are sorry, it's only in cinemas",
          disabled: true,
        });
      } else if (url === undefined) {
        window.open(`https://www.themoviedb.org/movie/${movieId}/watch`);
        alert("We couldn't find providers for this movie in your country.");
      } else {
        window.open(url);
      }
    } catch (error) {
      console.error("Error fetching movie providers:", error);
      alert("An error occurred while fetching movie providers.");
    }
  };

  const handleContinueToIMDB = async () => {
    const movieId = winner.id;
    console.log(movieId);

    try {
      const imdb_id = await socketService.movieDetails(roomId, movieId);
      console.log(imdb_id);
      if (imdb_id === undefined) {
        alert("We couldn't find it in IMDB!");
      } else {
        window.open(`https://www.imdb.com/es/title/${imdb_id}`, "_blank");
      }
    } catch (error) {
      console.error("Error fetching movie in IMDB:", error);
      alert("An error occurred while getting the movie in IMDB.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className="rounded-lg shadow-lg mb-6"
      />

      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
      </div>

      <p className="text-center text-gray-300 mb-6">{overview}</p>

      <p className="text-center text-gray-300 mb-6">Release Date: {release_date}</p>
      <div className="flex justify-around w-full">
        <button
          onClick={() => onVote(true)}
          className="bg-blue-500 text-white border border-blue-500 border-b-4 font-medium overflow-hidden relative px-3 py-1 rounded-md hover:bg-blue-600 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
        >
          <span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          <span className="material-icons ">Let's watch it!</span>
        </button>
        <button
          onClick={() => onVote(false)}
          className="bg-gray-500 text-white border border-gray-500 border-b-4 font-medium overflow-hidden relative px-3 py-1 rounded-md hover:bg-gray-600 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
        >
          <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          <span className="material-icons">Next movie</span>
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2
              className="text-3xl cursor-pointer text-white font-bold relative mb-4 text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[20px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[25px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
            >
              MovieMatch 🍿
            </h2>
            <p className="mb-4 text-center relative ">
              The winner is: <span className="font-semibold">{title}</span>
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[3px] w-full max-w-xs bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-full z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[1px] before:-bottom-[1px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-full before:hover:blur-md before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%]"></span>
            </p>
            <div className="flex justify-center items-center gap-4 ">
              <button
                onClick={handleContinueToProviders}
                disabled={buttonState.disabled}
                className={`${buttonState.disabled
                  ? "bg-gray-600 text-gray-400 border border-gray-600 cursor-not-allowed"
                  : "bg-slate-950 text-slate-400 border border-slate-400 border-b-4 hover:brightness-150 hover:border-t-4 active:opacity-75 group"
                  } font-medium overflow-hidden relative px-4 py-2 rounded-md outline-none duration-300`}
              >
                {!buttonState.disabled && (
                  <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                )}
                {buttonState.text}
              </button>
              <button
                onClick={handleContinueToIMDB}
                className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
              >
                <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]">
                </span>
                Open in IMDB
              </button>

            </div>


            <div className="flex justify-center items-center mt-6 ">

              <button
                onClick={closeModal}
                className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-1 py-1 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                Not sure? Keep matching!
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[3px] w-full max-w-xs bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-full z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[1px] before:-bottom-[1px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-full before:hover:blur-md before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%]"></span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
