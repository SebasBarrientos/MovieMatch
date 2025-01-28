"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import MovieCard from "@/app/components/MovieCard";
import { setMovieList } from "@/app/GlobalRedux/features/socket/socketSlice";
import { useRouter } from "next/navigation";
interface Movie {
    title: string;
    overview: string;
    backdrop_path: string;
    release_date: string;
}

const SelectMovies = () => {
    const { socket, room, movieList } = useSelector((state: RootState) => state.socket);
    const userId = socket?.id;
    const roomId = room.roomId;
    const dispatch = useDispatch();
    const router = useRouter();

    const [winner, setWinner] = useState(null);
    const [index, setIndex] = useState(0);
    const [movie, setMovie] = useState<Movie | null>(null); // Start with the first movie
    if (socket === null) {
        alert('No hay conexión con el servidor.');
        router.push("/")
        return;
    }
    // Emit a vote for the current movie
    const vote = (like: boolean) => {
        socket.emit("vote-movie", { roomId, vote: like ? "like" : "dislike" });

    };
    useEffect(() => {
        // Establecer la película inicial solo si `movieList` no está vacío
        if (movieList.length > 0) {
            setMovie(movieList[index]);
        }
    }, [movieList, index]);
    useEffect(() => {
        setMovie(movieList[index]);
    }, [movieList])

    useEffect(() => {
        const handleWinner = (index: number) => {
            setWinner(movieList[index]);
        };
        // Function to handle receiving the next movie
        const handleNextMovie = (newIndex: number) => {
            setIndex(newIndex);
            setMovie(movieList[newIndex]);
        };

        socket.on("next-movie", handleNextMovie);
        socket.on("match-found", handleWinner);
        socket.on("no-more-movies", ({ results, index }:{results:[], index:number}) => {
            setIndex(index)
            dispatch(setMovieList(results));
        });

        return () => {
            socket.off("next-movie", handleNextMovie);
            socket.off("match-found", handleWinner);
            socket.off("no-more-movies", handleWinner);

        };
    }, [socket, movieList]);

    if (!movie) return <p>Loading movie...</p>;

    return (
        <MovieCard
            title={movie.title}
            overview={movie.overview}
            posterPath={movie.backdrop_path}
            release_date={movie.release_date}
            onVote={vote}
            winner={winner}
        />


    );
};

export default SelectMovies;
