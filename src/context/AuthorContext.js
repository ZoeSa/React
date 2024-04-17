import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(()=> {
        const storedUser=localStorage.getItem("userData");
        if(storedUser){
            setUserData(JSON.parse(storedUser));
        }
        setIsLoggedIn(false);
    }, []);


   const handleLoading =({ name, email, password})=> {
        const userRole=email.includes("@admin")? "admin": "user";
        const userDataObj={name, email,password, role: userRole};
        setUserData(userDataObj);
        localStorage.setItem("userData", JSON.stringify(userDataObj))
   };

    const handleLogout= ()=>{
        setUserData(null);
        localStorage.removeItem("userData");

    };

    const AuthContextValue ={
        userData, 
        isLoggedIn,
        handleLoading,
        handleLogout
    };

    return (
        
       <AuthContext.Provider value={{ AuthContextValue}}>
            {children}
        </AuthContext.Provider>
    );
}    