import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const storedData = JSON.parse(localStorage.getItem("user_data"));

    useEffect(() => {
        if (storedData) {
            const { userToken, user } = storedData;
            setToken(userToken);
            setUserData(user);
            setIsAuthenticated(true);
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

    const logout = () => {
        localStorage.removeItem("user_data");
        setToken(null);
        setUserData(null);
        setIsAuthenticated(false);
    };

    const value = {
        token,
        isAuthenticated,
        login,
        logout,
        userData,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
