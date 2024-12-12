"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import socket from "@/app/utils/socket";
import extractIdRoom from "@/app/utils/catchRoomId";
import MovieCard from "@/app/components/MovieCard";

const SelectMovies = () => {

    const roomId = extractIdRoom();
    console.log(roomId);

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        socket.on("next-movie", (movie) => {
            setMovie(movie);
        });

        socket.on("match-found", (movie) => {
            alert(`Match Found! Movie: ${movie.title}`);
        });

        return () => {
            socket.off("next-movie");
            socket.off("match-found");
        };
    }, []);

    const vote = (like: boolean) => {
        socket.emit("vote-movie", { roomId, vote: like ? "like" : "dislike" });
    };

    if (!movie) return <p>Loading movie...</p>;

    return (
        <MovieCard
            title="Absolution"
            overview="An aging ex-boxer gangster working as muscle for a Boston crime boss..."
            posterPath="/cNtAslrDhk1i3IOZ16vF7df6lMy.jpg"
            onVote={(vote) => console.log(vote ? "Voted Yes" : "Voted No")}
        />

    );
};

export default SelectMovies;
