"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    let router = useRouter();
    const [data, setData] = useState("");

    let onLogout = async () => {
        let response = await axios.get("/api/users/logout");
        console.log(`logout successfull`);
        router.push("/login");
    };

    let getUserDetails = async () => {
        let response = await axios.get("/api/users/me");
        setData(response.data.data._id);
        console.log(`get user details `, response.data.data._id);
    };
    
    return (
        <>
            <div className="flex justify-center items-center h-screen flex-col ">
                <div>Welcome to Profile Page </div>
                <button
                    type="button"
                    className="rounded-md border border-white px-3 py-2 text-sm my-4 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={onLogout}
                >
                    Logout
                </button>
                <button
                    type="button"
                    className="rounded-md border border-blue-400 px-4 py-2 text-sm my-4 font-semibold text-blue-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={getUserDetails}
                >
                    {data ==="" ? "Nothing" : <Link href={`/profile/${data}`}> {data} </Link> }
                </button>
                <button
                    type="button"
                    className="rounded-md border border-green-400  px-3 py-2 text-sm my-4 font-semibold text-green-700 shadow-sm focus-visible:outline focus-visible:outline-8 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={getUserDetails}
                >
                    Get User Details
                </button>
            </div>
        </>
    );
};

export default page;
