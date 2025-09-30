import { PeopleIcon, MovieIcon, StarIcon } from "../utils/icons";

export default function Instructions() {
    const instructionsContentList = [
        {
            id: "step1",
            icon: <PeopleIcon size={"size-6"} color={"violet"} />,
            title: "Invite Friends",
            description: "Share your room ID and watch together",
            bgColor: "violet",
        },
        {
            id: "step2",
            icon: <MovieIcon size={"size-6"} color={"violet"} />,
            title: "Browse Movies",
            description: "Discover new films and add favorites",
            bgColor: "violet",
        },
        {
            id: "step3",
            icon: <StarIcon size={"size-6"} color={"violet"} />,
            title: "Vote Together",
            description: "Find the perfect movie everyone loves",
            bgColor: "violet",
        },
    ];

    return (
        <footer className="flex gap-5">
            {instructionsContentList.map((step, index) => {
                return (
                    <div className="flex flex-col items-center gap-3" key={step.id}>
                        <div className={`bg-${step.bgColor} opacity-90 rounded-3xl p-1.5 bg-opacity-80`}>{step.icon}</div>
                        <div className="text-m text-zinc-50">{step.title}</div>
                        <div className="text-xs text-zinc-400">{step.description}</div>
                    </div>
                );
            })}
        </footer>
    );
}
