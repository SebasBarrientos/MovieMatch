import { MovieIcon, PeopleIcon, StarIcon } from "../utils/icons";

export default function MainPageTitle() {
    return (
        <div className="flex flex-col gap-10 mt-8 items-center">
            <div className="text-5xl flex text-orange gap-5">
                <MovieIcon size={"size-10"} color={"orange"} />
                <StarIcon size={"size-10"} color={"orange"} />
                <PeopleIcon size={"size-10"} color={"orange"} />
            </div>
            <h1 className="font-bold text-5xl md:text-6xl text-zinc-50 ">
                Choose Movies <span className="text-orange block">Together</span>
            </h1>
            <div className="flex justify-center items-center ">
                <p className="text-md text-zinc-50 opacity-60 max-w-3xl text-center">
                    Create a room, invite your friends, and discover the <span className="block"></span> perfect movie for your next movie
                    night!
                </p>
            </div>
        </div>
    );
}
