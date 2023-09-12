import axios from "axios";
import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies();

    const login = async ({ email, password}) => {
        const res = await axios.post("http://localhost:3002/api/client/login",{
            email: email,
            password: password
        });

        // console.log('useAuth Response:', res)
        setCookies('token', res.data.token); // your token
        setCookies('name', res.data.name); // optional data
        navigate('/home');
    }
    const logout = () => {
        ['token', 'name'].forEach(obj => removeCookie(obj)); // remove data save in cookies
        navigate('/login');
    };
    const value = useMemo(
        () => ({
            cookies,
            login,
            logout
        }),[cookies]
    );
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(UserContext)
}; 