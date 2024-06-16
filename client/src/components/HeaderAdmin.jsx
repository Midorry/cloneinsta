import { useAuth } from "../context/AuthContext";

const HeaderAdmin = () => {
    const { adminData, logoutAdmin } = useAuth();
    console.log(adminData);

    return (
        <div>
            <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <a
                    href="index.html"
                    className="navbar-brand d-flex d-lg-none me-4"
                >
                    <h2 className="text-primary mb-0">
                        <i className="fa fa-hashtag"></i>
                    </h2>
                </a>
                <a href="#" className="sidebar1-toggler flex-shrink-0">
                    <i className="fa fa-bars"></i>
                </a>
                <div className="navbar-nav align-items-center ms-auto">
                    <div className="nav-item dropdown">
                        <a
                            href=""
                            className="nav-link dropdown-toggle"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <img
                                className="rounded-circle me-lg-2  w-10 h-10 object-cover"
                                src={`http://localhost:3002/assets/${adminData?.picturePath}`}
                                alt=""
                            />
                            <span className="d-none d-lg-inline-flex">
                                {adminData?.firstName} {adminData?.lastName}
                            </span>
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <button
                                onClick={logoutAdmin}
                                className="dropdown-item nav-link"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default HeaderAdmin;
