import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {

            setIsLoggedIn(true);

        }

    }, []);

    const logout = () => {

        localStorage.removeItem("token");

        setIsLoggedIn(false);

    };

    return (

        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export default AuthProvider;