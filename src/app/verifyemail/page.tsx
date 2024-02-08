"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function verifyEmailPage() {
    const [token, setToken] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);
    const [st, setSt] = useState("");

    let verifyUserEmail = async () => {
        try {
            let res = await axios.post(`/api/users/verifyemail`, { token });
            console.log(res);
            setIsVerified(true);
            setSt("Email verified. Login");
            toast.success("Email verified. Login");
        } catch (error: any) {
            setError(true);
            setSt(error.response.data.error);
            // console.log(error.response.data.error);
            toast.error(error.response.data.error);
        }
    };

    useEffect(() => {
        let searchQuery = window.location.search.split("=")[1];
        setToken(searchQuery || "");
        console.log(searchQuery[1]);
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <>
            {/* <h1>Email Verification Page</h1>
            <div>
                {" "}
                User is {isVerified === false
                    ? "not Verified"
                    : "Verified"}.{" "}
            </div>
            <div> {token ? `${token}` : "no token here"} </div> */}
            <Toaster />
            <div className="dark:bg-indigo-900 h-[100vh] w-min-[350px] w-max-[639px] sm:w-[100vw] box-border ">
                <div className=" py-2 px-4 h-[15%]  ">
                    <img src="Group 47603.png" />
                </div>
                <div className=" h-[75%] w-[100%] sm:w-[100%] flex items-center sm:justify-start   ">
                    <div className="  mx-auto w-[80%] sm:w-[35%] sm:mx-28  box-border ">
                        <div className="text-sm flex justify-start flex-row items-center ">
                            <Link href="/login">
                                <ChevronLeft />
                            </Link>
                            Back to login
                        </div>
                        <div className="  my-10 font-bold   ">
                            <div className="text-4xl dark:text-white">
                                Verify email
                            </div>
                            <div className="font-light my-3 text-sm dark:text-white ">
                                An authentication code has been sent to your
                                email.
                            </div>
                            <div className="font-light my-5  text-base dark:text-white ">
                                Email verification Status:{" "}
                                <span
                                    className={` font-medium ${
                                        error
                                            ? "dark:text-red-400   "
                                            : "text-green-600"
                                    } `}
                                >
                                    {" "}
                                    {st}{" "}
                                </span>
                            </div>
                        </div>
                        <div className="form">
                            {/* <form action="#" autoComplete="off">
                                <div className="flex flex-col mb-2">
                                    <div className="flex relative ">
                                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                            <Mail />
                                        </span>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            placeholder="Your email"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <div className="flex relative ">
                                        <span
                                            className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm"
                                            onClick={handleHide}
                                        >
                                            {hide ? <EyeOff /> : <Eye />}
                                        </span>
                                        <input
                                            type={hide ? "password" : "text"}
                                            id="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                            className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            placeholder="Your password"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center mb-6 -mt-4">
                                    <div className="flex ml-auto">
                                        <button
                                            type="button"
                                            className="inline-flex text-xs font-light text-red-700 sm:text-sm dark:text-white 
                                            dark:font-medium hover:text-gray-700 dark:hover:text-white"
                                            onClick={forgotPassword}
                                        >
                                            Forgot Your Password?
                                        </button>
                                    </div>
                                </div>
                                <div className="flex w-full">
                                    <button
                                        type="button"
                                        className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                        onClick={onLogin}
                                    >
                                        {buttonDisabled
                                            ? "Fill Details"
                                            : loading
                                            ? "Processing..."
                                            : "Login"}
                                    </button>
                                </div>
                                <div className=" mb-6 mt-2">
                                    <div className="flex ml-auto justify-center ">
                                        <Link
                                            href="/signup"
                                            type="button"
                                            className="inline-flex text-xs font-light text-dark-700 sm:text-sm dark:text-white hover:text-gray-700 dark:hover:text-white"
                                        >
                                            Don’t have an account? &nbsp;
                                            <span className="text-red-700 dark:text-white dark:font-medium">
                                                Sign up
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </form> */}
                        </div>
                        <div className="flex items-center">
                            <hr className="flex-grow border-t border-gray-400" />
                            <div className="mx-4 font-light text-sm ">
                                Or login with
                            </div>
                            <hr className="flex-grow border-t border-gray-400" />
                        </div>
                        <div className="flex justify-center gap-2  my-5">
                            <Button variant="outline" size="sm">
                                {" "}
                                Google{" "}
                            </Button>
                            <Button variant="outline" size="sm">
                                {" "}
                                Facebook{" "}
                            </Button>
                            <Button variant="outline" size="sm">
                                GitHub
                            </Button>
                        </div>
                    </div>
                    <div className=" hidden sm:block sm:h-[100%]  sm:mx-auto ">
                        <img
                            src="emailverify.png"
                            className="object-contain  shadow-lg w-[100%] h-[100%] "
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
