"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = ({logout=()=>{}}) => {
    const [btn, setBtn] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    let handleMenu = () => {
        setBtn((prev) => !prev);
    };

    useEffect(() => {
        setShowLogout(window.location.href.includes("profile"));
    }, []);

    return (
        <>
            <nav className="container px-6 py-4 mx-auto md:px-12">
                <div className="items-center justify-between md:flex">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-white">
                            <svg
                                className="w-8 mr-2 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                data-name="Capa 1"
                                viewBox="0 0 16.16 12.57"
                            >
                                <defs></defs>
                                <path d="M14.02 4.77v7.8H9.33V8.8h-2.5v3.77H2.14v-7.8h11.88z"></path>
                                <path d="M16.16 5.82H0L8.08 0l8.08 5.82z"></path>
                            </svg>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="text-white focus:outline-none"
                                onClick={handleMenu}
                            >
                                <svg
                                    className="w-12 h-12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 6H20M4 12H20M4 18H20"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div
                        className={`items-center ${
                            btn ? "block" : "hidden"
                        } bg-indigo-700 flex flex-col gap-y-4 rounded-xl py-4  md:flex md:flex-row md:px-10 md:gap-x-5 `}
                    >
                        {showLogout ? (
                            ""
                        ) : (
                            <>
                                <Link
                                    href="/signup"
                                    className="mx-3 text-lg text-white uppercase cursor-pointer hover:text-gray-300"
                                >
                                    Signup
                                </Link>
                                <Link
                                    href="/login"
                                    className="mx-3 text-lg text-white uppercase cursor-pointer hover:text-gray-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/profile"
                                    className="mx-3 text-lg text-white uppercase cursor-pointer hover:text-gray-300"
                                    
                                >
                                    Profile
                                </Link>
                            </>
                        )}

                        <Link
                            href="/contact"
                            className="mx-3 text-lg text-white uppercase cursor-pointer hover:text-gray-300"
                        >
                            Contact us
                        </Link>
                        {showLogout ? (
                            <Link
                                href="/"
                                className="mx-3 text-lg text-white uppercase cursor-pointer hover:text-gray-300"
                                onClick={logout}
                            >
                                logout
                            </Link>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
