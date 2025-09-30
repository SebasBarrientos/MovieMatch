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

    );
};

export default Lobby;
