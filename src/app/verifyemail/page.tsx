"use client";

import axios from "axios";
import Link from "next/link";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";

export default function verifyEmailPage() {
    const [token, setToken] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);

    let verifyUserEmail = async () => {
        try {
            let res = await axios.post(`/api/users/verifyemail`, { token });
            setIsVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        let searchQuery = window.location.search.split("=")[1];
        setToken(searchQuery || "");
        console.log(searchQuery[1]);
    }, []);

    useEffect(() => {
        if(token.length > 0 ){
            verifyUserEmail()
        }
    }, [token]);

    return (
        <>
            <h1>Email Verification Page</h1>
            <div>
                {" "}
                User is {isVerified === false
                    ? "not Verified"
                    : "Verified"}.{" "}
            </div>
            <div> {token ? `${token}` : "no token here"} </div>
        </>
    );
}
