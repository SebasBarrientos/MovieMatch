"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import MovieCard from "@/app/components/MovieCard";

const SelectMovies = () => {
    const { socket, room, movieList } = useSelector((state: RootState) => state.socket);
    const userId = socket?.id;
    const roomId = room.roomId;
    
    const [winner, setWinner] = useState(null);
    const [index, setIndex] = useState(0);
    const [movie, setMovie] = useState(movieList[0]); // Start with the first movie

    // Emit a vote for the current movie
    const vote = (like: boolean) => {
        console.log("Emitiendo Voto", like);
        socket.emit("vote-movie", { roomId, vote: like ? "like" : "dislike" });
        console.log("Voto emitido");
        
    };

    const handleWinner = (index: number) => {
        setWinner(index);
        console.log(index);
        
    };
    useEffect(() => {
        // Function to handle receiving the next movie
        const handleNextMovie = (newIndex: number) => {
            console.log("señal recibida");
            console.log(newIndex);
            
            setIndex(newIndex);
            setMovie(movieList[newIndex]);
        };

        socket.on("next-movie", handleNextMovie);
        socket.on("match-found", handleWinner);
 

        return () => {
            socket.off("next-movie", handleNextMovie);
        };
    }, [movie]); // Dependencies ensure the listener works with the current movie list and socket

    if (!movie) return <p>Loading movie...</p>;

    return (
        <MovieCard
            title={movie.title}
            overview={movie.overview}
            posterPath={movie.backdrop_path}
            onVote={vote}
            winner = {winner}
        />

        
    );
};

export default SelectMovies;
