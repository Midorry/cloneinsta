import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tokenAdmin, setTokenAdmin] = useState(null);
    const [adminData, setAdminData] = useState(null);
    const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
    const storedData = JSON.parse(localStorage.getItem("user_data"));
    const storedDataAdmin = JSON.parse(localStorage.getItem("admin_data"));

    useEffect(() => {
        if (storedData) {
            const { userToken, user } = storedData;
            setToken(userToken);
            setUserData(user);
            setIsAuthenticated(true);
        }
        if (storedDataAdmin) {
            const { userToken, user } = storedDataAdmin;
            setTokenAdmin(userToken);
            setAdminData(user);
            setIsAuthenticatedAdmin(true);
        }
    }, []);

    const login = (newToken, newData) => {
        localStorage.setItem(
            "user_data",
            JSON.stringify({ userToken: newToken, user: newData })
        );

        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
    };

    const loginAdmin = (newToken, newData) => {
        localStorage.setItem(
            "admin_data",
            JSON.stringify({ userToken: newToken, user: newData })
        );

        setToken(newToken);
        setUserData(newData);
        setIsAuthenticatedAdmin(true);
    };

    const logout = () => {
        localStorage.removeItem("user_data");

        setToken(null);
        setUserData(null);
        setIsAuthenticated(false);
    };

    const logoutAdmin = () => {
        localStorage.removeItem("admin_data");
        setTokenAdmin(null);
        setAdminData(null);
        setIsAuthenticatedAdmin(false);
    };

    const value = {
        token,
        isAuthenticated,
        tokenAdmin,
        adminData,
        isAuthenticatedAdmin,
        login,
        loginAdmin,
        logout,
        logoutAdmin,
        userData,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
