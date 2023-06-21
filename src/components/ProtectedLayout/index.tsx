//import React from "react";

import { useAuth } from "../../context/AuthProvider/useAuth";
import { useHistory } from "react-router-dom";


export const ProtectedLayout = ({children}: {children: JSX.Element}) =>{
    const auth = useAuth();
    const history = useHistory();

    if (!auth.mail || !auth.token) {
        history.push('/login');
        window.location.reload();

    }


    return children;
}