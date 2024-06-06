import {Navigate} from "react-router-dom";

type ProtectedRouteTypes = {
    isAuthenticated: boolean
    children: React.ReactNode
}

const ProtectedRoute = ({isAuthenticated, children}: ProtectedRouteTypes) => {
    if(!isAuthenticated) {
        return <Navigate to='/login' replace />
    }
    return <>{children}</>
}

export default ProtectedRoute