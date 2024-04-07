import { Navigate } from "react-router-dom";
import {useAuth} from "../hook/useAuth";
function ProtectedRoute({children}) {
    const {isAuthenticated}= useAuth();
    return isAuthenticated? children : <Navigate to={("/registro")}/>;
}
export default ProtectedRoute;