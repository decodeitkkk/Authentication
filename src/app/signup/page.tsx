"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Eye, EyeOff, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [hide, setHide] = useState(true);
    const [user, setUser] = useState({ email: "", password: "", username: "" });

    const onSignup = async () => {
        if (buttonDisabled) {
            toast.error("Fill the form");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            // console.log(response.data.message)
            toast.success(response.data.message);

            router.push("/login");
        } catch (error: any) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };
    const handleHide = () => {
        setHide((prev) => !prev);
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
            <Toaster />

            <div className="dark:bg-indigo-900 h-[100vh] w-min-[350px] w-max-[639px] sm:w-[100vw] box-border ">
                <div className=" py-2 px-4 sm:py-4 sm:px-20 h-[15%] flex justify-end ">
                    <img
                        src="Group 47603.png"
                        className=" h-[50%] sm:h-[80%]"
                    />
                </div>
                <div className=" h-[73%] w-[100%] sm:w-[100%] flex items-center sm:justify-start   ">
                    <div className=" hidden sm:block sm:h-[100%]  sm:mx-auto ">
                        <img
                            src="singup_img.png"
                            className="object-contain  shadow-lg  h-[100%] "
                            alt=""
                        />
                    </div>
                    <div className="  mx-auto w-[80%] sm:w-[35%] sm:mx-28  box-border ">
                        <div className="  my-10 font-bold   ">
                            <div className="text-4xl dark:text-white">
                                Signup
                            </div>
                            <div className="font-light my-3 text-sm dark:text-white ">
                                Let’s get you all set up so you can access your
                                personal account.
                            </div>
                        </div>
                        <div className="form">
                            <form action="#" autoComplete="off">
                                <div className="flex flex-col mb-2">
                                    <div className="flex relative ">
                                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                            <UserRound />
                                        </span>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={user.username}
                                            onChange={handleChange}
                                            className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            placeholder="Your username"
                                        />
                                    </div>
                                </div>
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

                                <div className="flex w-full">
                                    <button
                                        type="button"
                                        className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                        onClick={onSignup}
                                    >
                                        {buttonDisabled
                                            ? "No Signup "
                                            : Loading
                                            ? "Processing..."
                                            : "Signup"}
                                    </button>
                                </div>
                                <div className=" mb-6 mt-2">
                                    <div className="flex ml-auto justify-center ">
                                        <Link
                                            href="/login"
                                            type="button"
                                            className="inline-flex text-xs font-light text-dark-700 sm:text-sm dark:text-white hover:text-gray-700 dark:hover:text-white"
                                        >
                                            Already have an account? &nbsp;
                                            <span className="text-red-700 dark:text-white dark:font-medium">
                                                Login
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center mt-2">
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
                </div>
            </div>

            {/* <div className="h-screen flex justify-center items-center ">
                <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                    <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                        Create Your Account
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
                                        id="username"
                                        name="username"
                                        value={user.username}
                                        onChange={handleChange}
                                        className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="Your username"
                                    />
                                </div>
                            </div>
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

                            <div className="flex w-full">
                                <button
                                    type="button"
                                    className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    onClick={onSignup}
                                >
                                    {buttonDisabled
                                        ? "No Signup "
                                        : Loading
                                        ? "Processing..."
                                        : "Signup"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <Link
                            href="/login"
                            className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
                        >
                            <span className="ml-2">
                                Have an account ? Log in now
                            </span>
                        </Link>
                    </div>
                </div>
            </div> */}
        </>
    );
}
