import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

// see https://www.robinwieruch.de/react-router-private-routes/
function ProtectedRoute({ redirectPath = '/login', children }) {
    const { currentUser } = useContext(UserContext)
    if (!currentUser.token) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
}


function ProtectedAdminRoute({ redirectPath = '/login', children }) {
    const { currentUser } = useContext(UserContext)
    if (!currentUser.token && !currentUser.admin) {
        return <Navigate to={redirectPath} replace />;
    }
    else if (!currentUser.admin) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
}

export { ProtectedRoute, ProtectedAdminRoute }