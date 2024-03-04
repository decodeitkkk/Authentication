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
import Navbar from "@/components/Navbar/page";

export default function Home() {
    return (
        <div className="relative h-screen overflow-hidden bg-gray-600">
            <Image
                width={1000}
                height={1000}
                alt="Picture of the author"
                src="/home4.jpg"
                className="absolute object-cover bg-right w-full h-full"
            />
            <div className="absolute inset-0 "></div>
            <header className="absolute top-0 left-0 right-0 z-20">
                <Navbar />
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
