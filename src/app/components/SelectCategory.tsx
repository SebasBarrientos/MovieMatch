"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import socket, { sendEvent } from "@/app/utils/socket";
import extractIdRoom  from "@/app/utils/catchRoomId";
const categories = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];


const SelectCategories = () => {

  const router = useRouter();

  const roomId = extractIdRoom();
  console.log(roomId);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    sendEvent("select-categories", {
      roomId,
      categories: selectedCategories,
    });

    socket.on("category-match", (category) => {
      router.push(`/room/${roomId}/movies`);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Select Categories</h1>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => toggleCategory(cat.id)}
              className={`btn ${selectedCategories.includes(cat.id) ? "btn-selected" : ""
                }`}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} className="btn-primary">
        Submit Categories
      </button>
    </div>
  );
};

export default SelectCategories;
