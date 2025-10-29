import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./common/loaders/Loader";
import { loadUser } from "./redux/actions/authActions/loadUser";
import { availableCars,} from "./redux/actions/carActions/carActios";
import { getAllReviews } from "./redux/actions/userActions/userAction";


const App = () => {
     const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(availableCars())
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
            dispatch(loadUser());
            dispatch(getAllReviews())
        }
    }, [dispatch]);

    if (loading) {
        return (
            <Loader
                bottomMessage="Finding the best cars and deals for your next ride"
                fullPage={true}
                size={10}
                color="#EC4899"
                message="Welcome to Easy Drive!"
            />
        );
    } else {
        return (
            <div>
                <>
                
                    <RouterProvider router={router} />
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        pauseOnHover
                        theme="light"
                    />
                </>
            </div>
        );
    }
};
export default App;