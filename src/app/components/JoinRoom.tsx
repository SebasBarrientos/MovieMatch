"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
const JoinRoom = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [roomId, setRoomIdState] = useState("");
    const handleJoinRoom = () => {
        if (!roomId) return;
        setLoading(true);
        router.push(`/room/${roomId}/lobby`);
        setLoading(false);
    };

    return (
        <div className="flex gap-2 w-full mt-2">
            <input
                type="text"
                name="roomId"
                value={roomId}
                onChange={(e) => setRoomIdState(e.target.value)}
                className="bg-[#222630] w-3/4 px-3 py-2 outline-none text-slate-400 rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[º#596A95] border-[#2B3040] italic"
                placeholder={"Enter room ID"}
            />
            <button
                onClick={handleJoinRoom}
                disabled={loading}
                className=" w-1/4 text-slate-400 font-semibold rounded-md h-12 px-8 bg-violet hover:bg-violet/80 hover:text-slate-300 "
            >
                {loading ? "Joining Room..." : "Join"}
            </button>
        </div>
    );
};

export default JoinRoom;
