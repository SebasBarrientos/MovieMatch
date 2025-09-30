import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";

export default function CardButtonsLobby() {
    return (
        <div className="w-full flex flex-col bg-slate-900 p-8 rounded-lg gap-2 items-center ">
            <JoinRoom />
            <div className="flex items-center gap-4 my-6 w-full">
                <div className="flex-1 h-px bg-slate-400"></div>
                <span className=" text-sm text-slate-400">or</span>
                <div className="flex-1 h-px bg-slate-400"></div>
            </div>
            <CreateRoom />
        </div>
    );
}
