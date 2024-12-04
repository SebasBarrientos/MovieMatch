"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import socket from "@/app/utils/socket";
import extractIdRoom from "@/app/utils/catchRoomId";

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
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold">Vote on Movie</h1>
            {/* <p>{movie.title}</p> */}
            <button onClick={() => vote(true)} className="btn-success">
                Like
            </button>
            <button onClick={() => vote(false)} className="btn-danger">
                Dislike
            </button>
        </div>
    );
};

export default SelectMovies;
