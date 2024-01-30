"use client";
import { sendEmail } from "@/helpers/mailer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [hide, setHide] = useState(true)
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    

    const router = useRouter();
    const onLogin = async () => {
        if (buttonDisabled) {
            toast.error('Fill the form')
            return;
        }
        try {
            setLoading(true);
            
            // console.log(`here in try`, user);
            const response = await axios.post("/api/users/login", user);
            toast.success(`Login successfull`);
            router.push("/profile");
        } catch (error: any) {

            toast.error(error.response.data.error);
            // console.log(`Error on login`, error)
        } finally {
            setLoading(false);
            setButtonDisabled(false)
        }
    };
    let handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        // console.log(e.target.name, e.target.value);
    };

    // --------------------< FORGOT PASSWORD >--------------
    let forgotPassword = async () => {
        if (user.email.length <= 0) {
            toast.error(`Fill the email field.`);
            return;
        }

        // console.log(user.email);
        try {
            let response = await axios.post("/api/users/searchemail", {
                email: user.email,
            });
            // console.log(
            //     `frontend ${response?.data?.userId || response?.data?.message} `
            // );
            let userId = response.data.userId || "";

            if (response.data.status === true) {
                toast.success(`Reset password email sent`);
            } else {
                toast.error(`Invalid email id for password reset `);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleHide = ()=>{
        setHide((prev)=>!prev)
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>
        <Toaster />
            <div className=" h-screen flex justify-center items-center mx-10 ">
                <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                    <div className="self-center text-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                        Login To Your Account
                    </div>
                    <div className="mt-8">
                        <form action="#" autoComplete="off">
                            <div className="flex flex-col mb-2">
                                <div className="flex relative ">
                                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <svg
                                            width="15"
                                            height="15"
                                            fill="currentColor"
                                            viewBox="0 0 1792 1792"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                                        </svg>
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
                                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <svg
                                            width="15"
                                            height="15"
                                            fill="currentColor"
                                            viewBox="0 0 1792 1792"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={handleHide}
                                        >
                                            <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                                        </svg>
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
                                        className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
                                        onClick={forgotPassword}
                                    >
                                        Forgot Your Password?
                                    </button>
                                </div>
                            </div>
                            <div className="flex w-full">
                                <button
                                    type="button"
                                    className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    onClick={onLogin}
                                >
                                    {
                                    buttonDisabled
                                        ? "Fill Details"
                                        : loading
                                        ? "Processing..."
                                        : "Login"
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <Link
                            href="/signup"
                            
                            className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
                        >
                            <span className="ml-2">

                                You don&#x27;t have an account?
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <div className="">
                <div className="text-center text-white text-2xl">
                    <h1 className="my-10">Login Page</h1>
                    <div className="flex flex-col  items-end w-9/12   ">
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
                            onClick={onLogin}
                        >
                            {buttonDisabled
                                ? "No Login"
                                : loading
                                ? "Processing..."
                                : "Login"}
                        </button>
                    </div>
                    <div className="my-2">
                        <button
                            type="button"
                            className="py-3 px-4   bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                            <Link href="/signup">Go to Signup</Link>
                        </button>
                    </div>
                    <div className="my-2">
                        <button
                            type="button"
                            className="py-3 px-4   bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                            onClick={forgotPassword}
                        >
                            Forgot Password
                        </button>
                    </div>
                </div>
            </div> */}
        </>
    );
}
