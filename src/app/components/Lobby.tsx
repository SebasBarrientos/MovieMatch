import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ExtractIdRoom from "@/app/utils/catchRoomId";
import { useDispatch, useSelector } from "react-redux";
import { connectToRoom, setUsers } from "../GlobalRedux/features/socket/socketSlice";
import { RootState, AppDispatch } from "@/app/GlobalRedux/store";
import { PeopleIcon, PlayIcon } from "../utils/icons";

const Lobby = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { socket, room, conectionError } = useSelector((state: RootState) => state.socket);
    const router = useRouter();
    if (!socket) {
        alert("No connection to the server, going back to the homepage.");
        router.push("/");
        return null;
    }
    const roomId = ExtractIdRoom();
    socket.on("update-users", (users: []) => {
        dispatch(setUsers(users));
    });
    socket.on("users-ready", (roomId: string) => {
        router.push(`/room/${roomId}/categories`);
    });
    useEffect(() => {
        dispatch(connectToRoom(roomId as string));
    }, []);

    useEffect(() => {}, [room.users]);

    useEffect(() => {
        if (conectionError) {
            alert("Error joining, going back to the homepage.");

            router.push("/"); // Redirect to homepage
        }
    }, [conectionError]);

    const handleReady = () => {
        socket.emit("ready", roomId);
    };

    return (
        <div className="min-h-screen flex items-center justify-center backdrop-blur">
            <div className="flex flex-col bg-slate-900 p-8 rounded-lg gap-3 items-center align-middle border-2 border-orange/20">
                <div className="text-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-orange via-accent to-orange bg-clip-text text-transparent">
                        Movie Match Lobby
                    </h1>
                    <h3 className="text-sm text-slate-400 ">Wait for everyone to to join...</h3>
                </div>
                <div className="w-full space-y-2">
                    <label className="text-xs text-slate-500">Room ID</label>
                    <div className="flex-1 bg-slate-800 rounded-md px-4 py-3 font-mono text-slate-100 text-xl font-bold text-center tracking-wider">
                        {roomId}
                    </div>
                    {/* <button  className="border-orange/30 hover:border-primary">
                            <Copy className="h-5 w-5" />
                        </button> */}
                </div>
                <div className="w-full space-y-2">
                    <div className="bg-slate-800/50 flex gap-3 rounded-md p-4 text-slate-200 text-lg font-semibold text-center ">
                        <PeopleIcon color="orange" size="size-6" /> {room.users?.length} Players in the room
                    </div>
                </div>

                <button
                    onClick={handleReady}
                    className="w-full mx-3 flex py-2 gap-2 items-center justify-center text-sm rounded-md bg-orange/90 hover:opacity-90 transition-opacity"
                >
                    <PlayIcon color="currentcolor" size="size-5" /> Start Movie Selection
                </button>
            </div>
        </div>

        //   <div className="flex flex-col items-center justify-center text-slate-400  font-medium px-6 py-8 rounded-md shadow-lg max-w-lg mx-auto">
        //     <h1 className="text-2xl font-bold text-slate-200 mb-4">
        //       Room ID: <span className="text-sky-500">{roomId}</span>
        //     </h1>
        //     <p className="text-lg text-slate-400 mb-2 text-center">
        //       Share the Room ID with the other participants.
        //     </p>
        //     <p className="text-lg text-slate-400 mb-6 text-center">
        //       Connected participants: <span className="text-sky-500 font-semibold">{room.users?.length}</span>
        //     </p>
        //     <button
        //       onClick={handleReady}
        //       className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
        //     >
        //       <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
        //       Start Matching
        //     </button>
        //   </div>
    );
};

export default Lobby;
