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
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Join a Room</h2>
      <input
        type="text"
        name="roomId"
        value={roomId}
        onChange={(e) => setRoomIdState(e.target.value)}
        className="p-2 border rounded"
        placeholder="Enter Room ID"
      />
      <button
        onClick={handleJoinRoom}
        className="btn-primary mt-4"
        disabled={loading}
      >
        {loading ? 'Joining Room...' : 'Join Room'}
      </button>
    </div>
  );
};

export default JoinRoom;
