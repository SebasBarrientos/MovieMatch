"use client"

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/app/GlobalRedux/store';
import { selectCategory, setMovieList } from "../GlobalRedux/features/socket/socketSlice";
import { useRouter } from "next/navigation";


type Category = {
  id: number;
  name: string;
};

const categories: Category[] = [
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

function SelectCategories() {
  const { socket, room, loading } = useSelector((state: RootState) => state.socket);
  const router = useRouter();
  

  const userId = socket?.id
  const roomId = room.roomId
  console.log(roomId);

  const dispatch = useDispatch();

  const [selected, setSelected] = useState<number[]>([]);

  const toggleCategory = (id: number): void => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else if (prevSelected.length < 3) {
        return [...prevSelected, id];
      }
      return prevSelected;
    });
  };

  const handleSubmit = (): void => {

    dispatch(selectCategory({ roomId, userId, selected }));

  };
  if (!socket) {
    alert('No hay conexión con el servidor.');
    router.push("/")
    return;
  }

  socket.on("category-match", ({selectedCategory, results}) => {
    //Agregar popup
    console.log(results);
    
    dispatch(setMovieList(results))
    // router.push(`/room/${roomId}/movieMatch`)
  });
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Select up to 3 Categories</h1>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`p-4 text-center border-2 rounded cursor-pointer ${selected.includes(category.id)
              ? "border-red-500 shadow-[0_0_10px_#ff0000]"
              : "border-gray-300"
              }`}
          >
            {category.name}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
}



export default SelectCategories;

