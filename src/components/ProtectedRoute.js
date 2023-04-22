import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
        return children
    } else {
        return <Navigate to="/login" />
    }
}

export { ProtectedRoute }