import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

// export function useAuth() {
//     return useContext(AuthContext);
// }

const AuthProvider = (props) => {
    const [authUser, setAuthUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
