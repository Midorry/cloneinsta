import HeaderAdmin from "./HeaderAdmin";
import { NavLink, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
    const { isAuthenticatedAdmin } = useAuth();
    return (
        <div>
            {isAuthenticatedAdmin ? (
                <div>
                    <SideBar />
                    <div className="content">
                        <HeaderAdmin />
                        <Outlet />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="container-fluid">
                        <div className="row h-100 align-items-center justify-content-center min-h-svh">
                            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 text-center">
                                <h2>You are not Admin</h2>
                                <NavLink to="/login-admin">
                                    Login with admin
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div></div>
        </div>
    );
};

export default AdminLayout;
