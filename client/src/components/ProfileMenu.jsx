import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProfileMenu = () => {
    const { isAuthenticated, logout } = useAuth();
    const { clearCart } = useCart();
    const navigate = useNavigate();
    return (
        <div className="header__top__right__menu">
            <ul>
                {isAuthenticated && (
                    <>
                        <li>
                            <NavLink to="/user">Tài khoản của tôi</NavLink>
                        </li>
                        <li>
                            <NavLink to="/user">Đơn mua</NavLink>
                        </li>
                    </>
                )}
                <li>
                    {isAuthenticated ? (
                        <button
                            onClick={() => {
                                clearCart();
                                logout();
                                navigate("/home");
                            }}
                        >
                            Logout
                        </button>
                    ) : (
                        <NavLink to="/">Login</NavLink>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default ProfileMenu;
