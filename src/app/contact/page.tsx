"use client";
import React, { useState } from "react";
import { Menu, X, MapPin } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar/page";
import Image from "next/image";


function Contact() {
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState(true);
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        projectName: "NextJsAuthentication",
    });

    let notify = () => {
        toast("Here is your toast.");
    };
    let handleChange = (e: any) => {
        e.preventDefault();
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    let handleSubmit = async (e: any) => {
        e.preventDefault();
        // console.log(data);
        if (!data.email.includes("@") && !data.email.includes(".")) {
            toast.error(`Enter valid email address`);
            return;
        }
        if (data.phone.length < 10) {
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}";

            toast.error(`Enter valid phone no.`);
            return;
        }
        try {
            setLoading(true);
            let res = await axios.post("/api/users/feedback", data);
            console.log(res.data.message);
            data.name = "";
            data.email = "";
            data.message = "";
            data.phone = "";
            toast.success("Message Sent");
        } catch (error: any) {
            console.log(error);
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Toaster />
            <div className="mx-auto max-w-7xl px-4 dark:text-white h-[95vh]  ">
                <header className="">
                    <Navbar />
                </header>
                <div className="mx-auto max-w-7xl py-12 md:pt-20">
                    <div className="grid items-center justify-items-center gap-x-4 gap-y-5 lg:grid-cols-2">
                        {/* contact from */}
                        <div className="flex items-center justify-center">
                            <div className="px-2 md:px-12">
                                <p className="text-2xl font-bold dark:dark:text-gray-200 md:text-4xl">
                                    Get in touch
                                </p>
                                <p className="mt-4 text-lg dark:dark:text-gray-200">
                                    Our friendly team would love to hear from
                                    you.
                                </p>
                                <form action="" className="mt-8 space-y-4">
                                    <div className="grid w-full gap-y-4 md:gap-x-4 ">
                                        <div className="grid w-full  items-center gap-1.5">
                                            <label
                                                className="text-sm font-medium leading-none dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="first_name"
                                            >
                                                First Name*
                                            </label>
                                            <input
                                                className={`flex h-10 w-full rounded-md border dark:border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:dark:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:dark:border-gray-700 dark:dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900`}
                                                required={true}
                                                type="text"
                                                id="name"
                                                placeholder="First Name"
                                                name="name"
                                                value={data.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="email"
                                        >
                                            Email*
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border dark:border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:dark:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:dark:border-gray-700 dark:dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            required
                                            type="email"
                                            id="email"
                                            placeholder="Email"
                                            name="email"
                                            value={data.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="phone_number"
                                        >
                                            Phone number
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border dark:border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:dark:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:dark:border-gray-700 dark:dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            required={true}
                                            type="tel"
                                            id="phone_number"
                                            placeholder="Phone number (Optional) "
                                            name="phone"
                                            value={data.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="message"
                                        >
                                            Message*
                                        </label>
                                        <textarea
                                            className="flex w-full rounded-md border dark:border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:dark:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:dark:border-gray-700 dark:dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            id="message"
                                            placeholder="Leave us a message"
                                            name="message"
                                            value={data.message}
                                            onChange={handleChange}
                                            cols={6}
                                            rows={4}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="w-full rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        onClick={handleSubmit}
                                        disabled={disable}
                                    >
                                        {loading
                                            ? "Message Sending..."
                                            : "Send Message"}
                                    </button>
                                </form>
                            </div>
                        </div>
                        <Image
                            height={100}
                            width={1000}
                            alt="Contact us"
                            className="hidden max-h-full w-full rounded-lg object-cover lg:block"
                            src="/home4.jpg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
