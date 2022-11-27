import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import { auth } from "../firebase/firebase-config";

const AuthContext = createContext()

export function AuthProvider(props) {
    const [userInfo, setUserInfo] = useState({})
    const value = {userInfo,setUserInfo}

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
           setUserInfo(user)
        })
    },[])

    return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>
}

export function useAuth(){

    const context = useContext(AuthContext)

    if(typeof context === "undefined") throw new Error("useAuth must be used within Provider")
    return context
}
