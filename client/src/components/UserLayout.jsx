import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserLayout = () => {
    const { userData } = useAuth();
    return (
        <div className="container mb-8">
            <div className="row">
                <div className="col-lg-2 col-md-4">
                    <div className="flex items-center pb-3 border-b border-solid border-[#efefef]">
                        <img
                            src={`http://localhost:3002/assets/${userData?.picturePath}`}
                            alt="avatar"
                            className="rounded-full w-14 h-14 object-cover mr-3"
                        ></img>
                        <span>
                            {userData?.firstName} {userData?.lastName}
                        </span>
                    </div>
                    <div>
                        <nav className="navbar bg-light">
                            <div className="navbar-nav w-100">
                                <NavLink
                                    to="/user-detail"
                                    className="nav-link ml-0 text-black"
                                >
                                    Thông tin cá nhân
                                </NavLink>
                                <NavLink
                                    to="/user-order"
                                    className="nav-link nav-item ml-0 text-black"
                                >
                                    Đơn hàng
                                </NavLink>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="col-lg-10 col-md-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
