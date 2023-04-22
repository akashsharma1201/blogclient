import { Navigate } from "react-router-dom"

const PublicRoute = ({ children }) => {
    console.log(localStorage.getItem("token"));
    if( !localStorage.getItem("token")){
        return children
    }else{
        return <Navigate to="/" />
    }
}

export { PublicRoute }