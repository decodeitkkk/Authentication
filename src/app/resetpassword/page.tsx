"use client";
import axios from "axios";
import React, { useState } from "react";

const page = () => {
    const [DisplayPassword, setDisplayPassword] = useState(false);
    const [userPassword, setUserPassword] = useState({
        newPassword1:"",
        newPassword2:""
    })

    let handlePasswordChange =(e:any)=>{
        setUserPassword((prev)=> ({...prev, [e.target.name]:e.target.value}))
    }

    let onSubmit = async(e:any) =>{
        e.preventDefault()
        if(userPassword.newPassword1 !== userPassword.newPassword2){
            console.log(`password not matched`)
            return
        }
        let token = window.location.search.split("=")[1]
        
        console.log(userPassword.newPassword1,token)

        try {
            let response = await axios.post("/api/users/resetpassword",{password:userPassword.newPassword1,token})
            console.log(response)
        } catch (error) {
            console.log(error)
            
        }
    }

    let showPassword = (e:any) => {
        e.preventDefault();
        console.log(e.target);

        // let inputPassword = document.querySelectorAll("input")
        // inputPassword[0].type = "text";
        // console.log(inputPassword[0].type)
    };

    return (
        <>
            <div className="h-screen flex justify-center items-center ">
                <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                    <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                        Reset Your Password
                    </div>
                    <div className="mt-8">
                        <form action="#" autoComplete="off">
                            <div className="flex flex-col mb-6">
                                <div className="flex relative ">
                                    <input
                                        type="text"
                                        id="newPassword1"
                                        name="newPassword1"
                                        value={userPassword.newPassword1}
                                        onChange={handlePasswordChange}
                                        className=" rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="Your password"
                                    />

                                    <span className="rounded-r-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <button onClick={showPassword}>
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
                                        type="text"
                                        id="newPassword2"
                                        name="newPassword2"
                                        value={userPassword.newPassword2}
                                        onChange={handlePasswordChange}
                                        className=" rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="Your password"
                                    />

                                    <span className="rounded-r-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <button onClick={showPassword}>
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
                    <div className="flex items-center justify-center mt-6">
                        <a
                            href="#"
                            target="_blank"
                            className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
                        >
                            <span className="ml-2">
                                You don&#x27;t have an account?
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;