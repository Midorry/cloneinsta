import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
    const isAuthenticated = false;
    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <div className="flex">
                    <div className="w-1/2">
                        <Outlet />
                    </div>
                    <img
                        src="../../assets/side-bg.jpeg"
                        alt="logo"
                        className="hidden xl:block h-screen w-1/2 bg-no-repeat object-cover"
                    />
                </div>
            )}
        </>
    );
};

export default AuthLayout;
