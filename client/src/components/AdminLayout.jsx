import HeaderAdmin from "./HeaderAdmin";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const AdminLayout = () => {
    return (
        <div>
            <div className="container-xxl position-relative bg-white d-flex p-0">
                <SideBar />
                <div className="content">
                    <HeaderAdmin />
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
