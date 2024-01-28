"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SignupPage() {
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [Loading, setLoading] = useState(false)
    const [user, setUser] = useState({ email: "", password: "", username: "" });

    const onSignup = async () => {
        if (buttonDisabled) {
            return;
        }
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup",user)
            console.log(`signup successful`,response.data);
            router.push("/login")

        } catch (error:any) {
            console.log(`Error on signup`, error.message)
        }finally{
            setLoading(false)
        }
    };
    useEffect(() => {
        if (
            user.username.length > 0 &&
            user.email.length > 0 &&
            user.password.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    let handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        // console.log(e.target.name, e.target.value);
    };

    return (
        <>
            <div className="">
                <div className="text-center text-white text-2xl">
                    <h1 className="my-10">Signup Page</h1>
                    <div className="flex flex-col  items-end w-5/6   ">
                        <div className="my-2">
                            <label className=" text-4xl " htmlFor="username">
                                Username :{" "}
                            </label>
                            <input
                                className="text-black px-4 py-2 rounded-md"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                value={user.username}
                                type="text"
                                placeholder="username"
                                name="username"
                                id="username"
                            />
                        </div>
                        <div className="my-2">
                            <label className=" text-4xl " htmlFor="email">
                                Email :{" "}
                            </label>
                            <input
                                className="text-black px-4 py-2 rounded-md"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                value={user.email}
                                type="text"
                                placeholder="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="my-2">
                            <label className=" text-4xl " htmlFor="password">
                                Password :{" "}
                            </label>
                            <input
                                className="text-black px-4 py-2 rounded-md"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                value={user.password}
                                type="text"
                                placeholder="password"
                                name="password"
                                id="password"
                            />
                        </div>
                    </div>
                    <div className="my-2">
                        <button
                            type="button"
                            className="py-3 px-6  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
                            onClick={onSignup}
                        >
                            {buttonDisabled ? "No Signup " : Loading ? "Processing...":"Signup" }
                        </button>
                    </div>
                    <div className="my-2">
                        <button
                            type="button"
                            className="py-3 px-4   bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                            <Link href="/login">Go to Login</Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
