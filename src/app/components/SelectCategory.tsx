"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
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
  const userId = socket?.id;
  const roomId = room.roomId;
  const dispatch = useDispatch();

  const [selected, setSelected] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [matchedCategory, setMatchedCategory] = useState<string | null>(null);

  const getCategoryNameById = (id: number): string => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : "Unknown Category";
  };
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
    alert("No hay conexión con el servidor.");
    router.push("/");
    return;
  }

  socket.on("category-match", ({ selectedCategory, results }) => {
    dispatch(setMovieList(results));
    const categoryName = getCategoryNameById(Number(selectedCategory)); 
    setMatchedCategory(categoryName); 
    setModalOpen(true); 
  });

  const handleContinue = (): void => {
    setModalOpen(false);
    router.push(`/room/${roomId}/movieMatch`);
  };

  return (
    <div className="p-6 bg-slate-950 text-slate-400 rounded-lg shadow-lg max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold text-slate-200 mb-6 text-center">
      Select up to 3 Categories
    </h1>
    <div className="grid grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => toggleCategory(category.id)}
          className={`p-4 text-center rounded-md cursor-pointer border-2 transition-all duration-300 hover:brightness-125 ${selected.includes(category.id)
            ? "border-red-500 shadow-[0_0_10px_#ff0000]"
            : "border-slate-400"
            }`}
        >
          {category.name}
        </div>
      ))}
    </div>
    <button
      onClick={handleSubmit}
      className="mt-6 bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group mx-auto block"
    >
      <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
      Submit
    </button>
  
    {/* Modal */}
    {modalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-slate-950 p-6 rounded-lg shadow-xl text-slate-300 max-w-md w-full text-center">
          <h2 className="text-lg font-bold mb-4 text-slate-200">Category Matched</h2>
          <p className="mb-4">
            The selected category is: <span className="font-semibold text-sky-500">{matchedCategory}</span>
          </p>
          <button
            onClick={handleContinue}
            className="w-full bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
          >
            <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Continue
          </button>
        </div>
      </div>
    )}
  </div>
  );
}

export default SelectCategories;
