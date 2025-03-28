//import React from "react";

import { useAuth } from "../../context/AuthProvider/useAuth";


export const ProtectedLayout = ({children}: {children: JSX.Element}) =>{
    const auth = useAuth();
    

    if (!auth.mail || !auth.token) {
        
        return <h1> Você não tem acesso</h1>;
        
    }


    return children;
}