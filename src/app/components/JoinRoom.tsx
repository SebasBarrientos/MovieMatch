'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setRoomId } from '@/app/GlobalRedux/features/socket/socketSlice';
import { joinRoom } from '@/app/utils/socket';

const JoinRoom = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomIdState] = useState('');

  const handleJoinRoom = () => {
    if (!roomId) return;
    setLoading(true);
    
    // Llamar a la función de unirse a la sala desde socket.ts
    joinRoom(roomId);

    // Escuchar el evento de sala unida desde socket.ts
    // socket.on('room-joined', () => {
    //   dispatch(setRoomId(roomId)); // Actualiza el roomId en el estado global
    //   router.push(`/room/${roomId}`);
    // });

    // socket.on('error', (message) => {
    //   alert(message);
    //   setLoading(false);
    // });
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
