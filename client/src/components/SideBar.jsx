import { NavLink } from "react-router-dom";

const SideBar = () => {
    return (
        <div>
            <div className="sidebar1 pe-4 pb-3">
                <nav className="navbar bg-light navbar-light">
                    <a href="index.html" className="navbar-brand mx-4 mb-3">
                        <h3 className="text-primary">
                            <i className="fa fa-hashtag me-2"></i>DASHMIN
                        </h3>
                    </a>
                    <div className="d-flex align-items-center ms-4 mb-4">
                        <div className="position-relative">
                            {/* <img
                                className="rounded-circle"
                                // src="img/user.jpg"
                                alt=""
                                style="width: 40px; height: 40px;"
                            /> */}
                            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                        </div>
                        <div className="ms-3">
                            <h6 className="mb-0">Jhon Doe</h6>
                            <span>Admin</span>
                        </div>
                    </div>
                    <div className="navbar-nav w-100">
                        <NavLink to="/admin" className="nav-link">
                            <i className="fa fa-tachometer me-2"></i>
                            Dashboard
                        </NavLink>
                        <div className="dropdown">
                            <button
                                className="btn  dropdown-toggle text-left nav-link"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fa fa-th me-2"></i> Product
                            </button>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                            >
                                <NavLink
                                    to="/list-product"
                                    className="nav-link"
                                >
                                    <i className="fa fa-laptop me-2"></i>List
                                    Product
                                </NavLink>
                                <NavLink to="/add-product" className="nav-link">
                                    <i className="fa fa-laptop me-2"></i>Add
                                    Product
                                </NavLink>
                                {/* <NavLink
                                    to="/update-product"
                                    className="nav-link"
                                >
                                    <i className="fa fa-laptop me-2"></i>Update
                                </NavLink> */}
                                <NavLink to="/category" className="nav-link">
                                    <i className="fa fa-laptop me-2"></i>
                                    Category
                                </NavLink>
                            </div>
                        </div>
                        <div className="dropdown">
                            <button
                                className="btn  dropdown-toggle text-left nav-link"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fa fa-th me-2"></i> User
                            </button>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                            >
                                <NavLink to="/list-user" className="nav-link">
                                    <i className="fa fa-laptop me-2"></i>List
                                    User
                                </NavLink>
                                <NavLink to="/add-user" className="nav-link">
                                    <i className="fa fa-laptop me-2"></i>Add
                                    User
                                </NavLink>
                            </div>
                        </div>
                        <NavLink to="/add-news" className="nav-item nav-link">
                            <i className="fa fa-th me-2"></i>Add News
                        </NavLink>
                        <NavLink to="/order" className="nav-item nav-link">
                            <i className="fa fa-keyboard me-2"></i>Order
                        </NavLink>
                        <NavLink to="table.html" className="nav-item nav-link">
                            <i className="fa fa-table me-2"></i>Tables
                        </NavLink>
                        <NavLink to="chart.html" className="nav-item nav-link">
                            <i className="fa fa-chart-bar me-2"></i>Charts
                        </NavLink>
                        <NavLink to="/" className="nav-link">
                            <i className="far fa-file-alt me-2"></i>Pages
                        </NavLink>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default SideBar;
