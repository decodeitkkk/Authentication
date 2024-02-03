"use client";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const [btn, setBtn] = useState(false);
    // const router = useRouter()
    // useEffect(()=>{
    //   router.push('/login')
    // },[])

    let handleMenu = () => {
        setBtn((prev) => !prev);
    };
    let button = document.querySelector("#menu-button");
    // let menu = document.querySelector("#menu");
    // button?.addEventListener("click", () => {
    //     menu?.classList.toggle("hidden");
    // });

    return (
        <div className="relative h-screen overflow-hidden bg-gray-600">
            <img
                src="home4.jpg"
                className="absolute object-cover bg-right w-full h-full"
            />
            <div className="absolute inset-0 "></div>
            <header className="absolute top-0 left-0 right-0 z-20">
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
                                href="/contact"
                                className="mx-3 text-lg text-white uppercase cursor-pointer hover:text-gray-300"
                            >
                                Contact us
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container relative z-10 flex items-end  h-[100%] px-6 py-32 mx-auto md:px-12 xl:py-40">
                <div className="relative z-10 flex flex-col items-start   lg:w-3/5 xl:w-2/5">
                    <span className="font-bold text-yellow-400 uppercase">
                        Authentication App
                    </span>
                    <h1 className="mt-4  text-4xl font-bold leading-tight text-white sm:text-7xl">
                        My Destiny Is
                        <br />
                        Mine
                        <br />
                        To Weave
                    </h1>
                    <Link
                        href="/signup"
                        className="block px-4 py-3 mt-10 text-lg font-bold text-gray-800 uppercase bg-white rounded-lg hover:bg-gray-100"
                    >
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    );
}
