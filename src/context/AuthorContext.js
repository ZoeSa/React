import { useState, createContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login= ()=>{
        setIsLoggedIn(false)
    };
    const logout= ()=>{
        setIsLoggedIn(false)
    };
    return (
        
       <AuthContext.Provider value={{ isLoggedIn, logout, login}}>
            {children}
        </AuthContext.Provider>
    );
}    