import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthLayout = () => {
    // const isAuthenticated = false;
    const { isAuthenticated } = useAuth();
    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/home" />
            ) : (
                <div className="lg:flex min-h-screen">
                    <div className="xl:w-1/2 lg:w-full md:w-full">
                        <Outlet />
                    </div>
                    <img
                        src="../../assets/side_bg.avif"
                        alt="logo"
                        className="hidden xl:block lg:hidden md:hidden h-auto w-1/2 bg-no-repeat object-cover"
                    />
                </div>
            )}
        </>
    );
};

export default AuthLayout;
