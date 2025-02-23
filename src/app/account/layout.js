'use client'
import {useEffect, useState} from "react";
import jwt_decode from 'jwt-decode'
import Loader from "@/components/loader/Loader";
import {useRouter} from "next/navigation";

export default function Layout({children}) {
    const [token, setToken] = useState();
    const {push} = useRouter();
    const [isCheckToken, setIsCheckToken] = useState(true);

    useEffect(() => {
        const jwt = sessionStorage.getItem('token-tt');
        if (!jwt) {
            push('/');
        }
        setToken(jwt)
    }, [push]);


    useEffect(() => {
        if (token) {
            let decodedToken = jwt_decode(token);
            console.log("Decoded Token", decodedToken);
            let currentDate = new Date();
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                setIsCheckToken('');
                push('/');
            }
            setIsCheckToken(false)
        }
    }, [push, token])

    return (
        <>
            {isCheckToken || !token ?
                <div className='h-full'><Loader/></div>
                : children}
        </>
    )
}
