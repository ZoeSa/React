import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Login =() => {
    const { isLoggedIn, login, logout} =useAuth();
    const navigate= useNavigate();

    const handelLogin =() =>{
        login();
        navigate("/");

    };

    return(
        <div>
            <h1>Login Page</h1>
            {isLoggedIn ? (
                <button onClick={logout}>Logout</button>
            ): (
                <button onClick={handelLogin}>Login</button>
            )}
        </div>  
    )
}