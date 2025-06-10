import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLs = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken);
    };

    let isLoggedIn = !!token;
    console.log("isLoggedIN", isLoggedIn);

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    const userAuthentication = async () => {
        if (!token) return; // Exit if no token is present
        
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
                setIsLoading(false);
            } else {
                console.error("Error fetching user data");
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getServices =  async () =>{
        try {
            const response  = await fetch("http://localhost:5000/api/data/service", {
                method: "GET",
            });
            
            if(response.ok){
                const data = await response.json(); 
                console.log(data.msg);
                setServices(data.msg);            }

        } catch (error) {
            console.log(`Services frontend error: ${error}`);
        }
    }

    useEffect(() => {
        getServices();
        userAuthentication();
    }, [token]); // Re-run when the token changes

    return (
        <AuthContext.Provider value={{ storeTokenInLs, LogoutUser, isLoggedIn, user, services, authorizationToken, isLoading, }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the provider");
    }
    return authContextValue;
};
