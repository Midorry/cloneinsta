import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProfileMenu = () => {
    const { isAuthenticated, logout } = useAuth();
    const { clearCart } = useCart();
    return (
        <div className="header__top__right__menu">
            <ul>
                <li>
                    {isAuthenticated ? (
                        <button
                            onClick={() => {
                                clearCart();
                                logout();
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
