import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../common/loaders/Loader";


const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    if (!isAuthenticated && !loading) {
        return <Navigate to="/login" replace />;
    }

    if (isAuthenticated) {
    
        return (
            <div>
                <Outlet />;
            </div>
        );
    }

    if (loading) {
        return <Loader />;
    }
};

export default ProtectedRoute;