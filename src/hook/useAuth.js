import { useContext } from "react";
import { AuthContext } from "../context/AuthorContext";

export function useAuth(){
    return useContext(AuthContext);
}