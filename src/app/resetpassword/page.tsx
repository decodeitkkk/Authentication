"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
    const [DisplayPassword, setDisplayPassword] = useState(false);
    const [hide, setHide] = useState(true);
    const [error, setError] = useState(false);
    const [userPassword, setUserPassword] = useState({
        newPassword1: "",
        newPassword2: "",
    });

    let handlePasswordChange = (e: any) => {
        setUserPassword((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    let onSubmit = async (e: any) => {
        e.preventDefault();
        if (
            userPassword.newPassword1.length == 0 ||
            userPassword.newPassword2.length == 0
        ) {
            toast.error(`Enter Password`);
            return;
        }
        if (userPassword.newPassword1 !== userPassword.newPassword2) {
            toast.error(`password not matched`);
            return;
        }
        let token = window.location.search.split("=")[1];

        console.log(userPassword.newPassword1, token);

        try {
            let response = await axios.post("/api/users/resetpassword", {
                password: userPassword.newPassword1,
                token,
            });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            // console.log(response.data.message);
        } catch (error: any) {
            toast.error(error);
            console.log(error);
        }
    };

    let showPassword = (e: any) => {
        e.preventDefault();
        setHide((prev) => !prev);
    };

    useEffect(() => {
        let match = () => {
            if (userPassword.newPassword2 === userPassword.newPassword1) {
                setError(false);
            } else {
                setError(true);
            }
        };
        match();
    }, [userPassword.newPassword2]);

    return (
        <>
            <div className="dark:bg-indigo-900 h-[100vh] w-min-[350px] w-max-[639px] sm:w-[100vw] box-border ">
                <div className=" py-2 px-4 h-[15%]  ">
                    <img src="Group 47603.png" />
                </div>
                <div className=" h-[75%] w-[100%] sm:w-[100%] flex items-center sm:justify-start   ">
                    <div className="  mx-auto w-[80%] sm:w-[35%] sm:mx-28  box-border ">
                        <div className="  my-10 font-bold   ">
                            <div className="text-4xl dark:text-white">
                                Set a password
                            </div>
                            <div className="font-light my-3 text-sm dark:text-white ">
                                Your previous password has been reseted. Please
                                set a new password for your account.
                            </div>
                        </div>
                        <div className="form">
                            <form action="#" autoComplete="off">
                                <div className="flex flex-col mb-6">
                                    <div className="flex relative ">
                                        <input
                                            type={hide ? "password" : "text"}
                                            id="newPassword1"
                                            name="newPassword1"
                                            value={userPassword.newPassword1}
                                            onChange={handlePasswordChange}
                                            className=" rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            placeholder="New Password"
                                        />

                                        <span className="rounded-r-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                            <button
                                                type="button"
                                                onClick={showPassword}
                                            >
                                                {hide ? <EyeOff /> : <Eye />}
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <div className="flex relative ">
                                        <input
                                            type={hide ? "password" : "text"}
                                            id="newPassword2"
                                            name="newPassword2"
                                            value={userPassword.newPassword2}
                                            onChange={handlePasswordChange}
                                            className=" rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            placeholder=" Confirm Password"
                                        />

                                        <span className="rounded-r-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                            <button
                                                type="button"
                                                onClick={showPassword}
                                            >
                                                {hide ? <EyeOff /> : <Eye />}
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center mb-6 ">
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
                                    >
                                        <span
                                            className={` ml-2 font-semibold  ${
                                                error
                                                    ? "text-red-600"
                                                    : "text-white"
                                            } `}
                                        >
                                            {error
                                                ? "Password Not Matching"
                                                : ""}
                                        </span>
                                    </a>
                                </div>

                                <div className="flex w-full">
                                    <button
                                        type="submit"
                                        className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                        onClick={onSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className=" hidden sm:block sm:h-[100%]  sm:mx-auto ">
                        <img
                            src="resetpassword.png"
                            className="object-contain  shadow-lg w-[100%] h-[100%] "
                            alt=""
                        />
                    </div>
                </div>
            </div>

            {/* <div className="h-screen flex justify-center items-center ">
                <Toaster/>
                <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                    <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                        Reset Your Password
                    </div>
                    <div className="mt-8">
                        <form action="#" autoComplete="off">
                            <div className="flex flex-col mb-6">
                                <div className="flex relative ">
                                    <input
                                        type={hide ? "password":"text"}
                                        id="newPassword1"
                                        name="newPassword1"
                                        value={userPassword.newPassword1}
                                        onChange={handlePasswordChange}
                                        className=" rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="New Password"
                                    />

                                    <span className="rounded-r-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <button type="button" onClick={showPassword}>
                                            <svg
                                                width="15"
                                                height="15"
                                                fill="currentColor"
                                                viewBox="0 0 1792 1792"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                                            </svg>
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <div className="flex relative ">
                                    <input
                                        type={hide ? "password":"text"}
                                        id="newPassword2"
                                        name="newPassword2"
                                        value={userPassword.newPassword2}
                                        onChange={handlePasswordChange}
                                        className=" rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder=" Confirm Password"
                                    />

                                    <span className="rounded-r-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <button type="button" onClick={showPassword}>
                                            <svg
                                                width="15"
                                                height="15"
                                                fill="currentColor"
                                                viewBox="0 0 1792 1792"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                                            </svg>
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center mb-6 ">
                                <a
                                    href="#"
                                    target="_blank"
                                    className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
                                >
                                    <span 
                                    className={` ml-2 font-semibold  ${error ? "text-red-600" : "text-white" } `}
                                    >
                                        {error ? "Password Not Matching" : ""}
                                    </span>
                                </a>
                            </div>

                            <div className="flex w-full">
                                <button
                                    type="submit"
                                    className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    onClick={onSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default page;
