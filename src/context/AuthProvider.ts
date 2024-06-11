import { PropsWithChildren, createContext, useState } from "react";

type AuthContextType = {

}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {

};
