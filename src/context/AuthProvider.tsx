import axios from "../api/axios";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type User = {
    id: number;
    user: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    login: (user: string, pwd: string) => Promise<void>;
    signup: (user: string, pwd: string) => Promise<void>;
    ping: () => Promise<void>;
};

const initialValue: AuthContextType = {
    isAuthenticated: false,
    user: null,
    login: async () => {},
    signup: async () => {},
    ping: async () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        console.error("useAuth must be within an AuthProvider block.");
    }
    return ctx;
};

const LOGIN_URL = "/login";
const SIGNUP_URL = "/signup";
const PING_AUTH_URL = "/protected/auth/check";

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        initialValue.isAuthenticated
    );
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        ping()
    },[])

    const login = async (user: string, pwd: string): Promise<void> => {
        const res = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
            headers: { "Content-Type": "application/json" },
        });
        setUser(res.data);
        setIsAuthenticated(true);
    };

    const signup = async (user: string, pwd: string): Promise<void> => {
        const res = await axios.post(SIGNUP_URL, JSON.stringify({ user, pwd }), {
            headers: { "Content-Type": "application/json" },
        });
        setUser(res.data);
        setIsAuthenticated(true);
    };

    const ping = async () => {
        try {
            await axios.get(PING_AUTH_URL)
            setIsAuthenticated(true)
        } catch (err: any) {
            setIsAuthenticated(false)
        }
    }

    const value = {
        isAuthenticated,
        user,
        login,
        signup,
        ping,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
