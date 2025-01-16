'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
const JoinRoom = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomIdState] = useState('');
  const handleJoinRoom = () => {
    if (!roomId) return;
    setLoading(true);
    router.push(`/room/${roomId}/lobby`);


  };

  return (
    <div className="flex  items-center justify-center gap-1">
      <input
        type="text"
        name="roomId"
        value={roomId}
        onChange={(e) => setRoomIdState(e.target.value)}
        className="bg-[#222630] px-3 py-2 outline-none text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
        placeholder="Enter Room ID"
      />
      <button
        onClick={handleJoinRoom}
        disabled={loading}
        className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
      >
        <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]">
        </span>
          {loading ? 'Joining Room...' : 'Join Room'}
      </button>
    </div>
  );
};

export default JoinRoom;
