"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { connectSocket } from "@/app/GlobalRedux/features/socket/socketSlice";
import { AppDispatch } from "@/app/GlobalRedux/store";
import MainPageTitle from "./components/MainPageTitle";
import Instructions from "./components/Instructions";
import CardButtonsLobby from "./components/CardButtonsLobby";

const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(connectSocket());
    }, []);

    return (
        <div className=" min-h-screen flex flex-col justify-center items-center px-6 pb-12 gap-6">
            <div className="max-w-4xl text-center flex flex-col gap-8 ">
                <MainPageTitle />
                <CardButtonsLobby />
                <Instructions />
            </div>
        </div>
    );
};

export default Page;
