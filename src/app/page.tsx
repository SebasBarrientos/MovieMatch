"use client";
import React, { useEffect } from "react";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import { useDispatch } from "react-redux";
import { connectSocket } from "@/app/GlobalRedux/features/socket/socketSlice";
import { AppDispatch } from "@/app/GlobalRedux/store";
import MainPageTitle from "./components/MainPageTitle";

const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(connectSocket());
    }, []);

    return (
        <div>
            <div className="bg-slate-950 text-slate-400 min-h-screen flex flex-col items-center justify-center px-6 py-12">
                <div className="max-w-4xl text-center">
                    <MainPageTitle />
                    <div className="flex flex-col items-center justify-center gap-6">
                        <CreateRoom />
                        <JoinRoom />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
