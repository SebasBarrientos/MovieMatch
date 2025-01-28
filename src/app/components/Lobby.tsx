import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ExtractIdRoom from "@/app/utils/catchRoomId";
import { useDispatch, useSelector } from "react-redux";
import { connectToRoom, setUsers } from "../GlobalRedux/features/socket/socketSlice";
import { RootState, AppDispatch } from '@/app/GlobalRedux/store';


const Lobby = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { socket, room, conectionError } = useSelector((state: RootState) => state.socket);
  const router = useRouter();
  if (!socket) {
    alert('No connection to the server, going back to the homepage.');
    router.push("/")
    return null;
  }
  const roomId = ExtractIdRoom();
  socket.on("update-users", (users: []) => {
    dispatch(setUsers(users));
  });
  socket.on("users-ready", (roomId: string) => {

    router.push(`/room/${roomId}/categories`)
  });
  useEffect(() => {
    dispatch(connectToRoom(roomId as string));
  }, [])

  useEffect(() => {
  }, [room.users])

  useEffect(() => {
    if (conectionError) {
      alert("Error joining, going back to the homepage.");

      router.push("/"); // Redirect to homepage
    }
  }, [conectionError])

  const handleReady = () => {
    socket.emit("ready", roomId);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-950 text-slate-400  font-medium px-6 py-8 rounded-md shadow-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-slate-200 mb-4">
        Room ID: <span className="text-sky-500">{roomId}</span>
      </h1>
      <p className="text-lg text-slate-400 mb-2 text-center">
        Share the Room ID with the other participants.
      </p>
      <p className="text-lg text-slate-400 mb-6 text-center">
        Connected participants: <span className="text-sky-500 font-semibold">{room.users?.length}</span>
      </p>
      <button
        onClick={handleReady}
        className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
      >
        <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
        We’re ready!
      </button>
    </div>

  );
};

export default Lobby;
