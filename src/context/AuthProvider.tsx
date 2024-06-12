import { PropsWithChildren, createContext, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (newState: boolean) => void;
};

const initialValue: AuthContextType = {
    isAuthenticated: false,
    setIsAuthenticated: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState(initialValue.isAuthenticated);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;
