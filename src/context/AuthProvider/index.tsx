import { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from "./util";
import { useHistory } from "react-router-dom";


export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {

    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        const user = getUserLocalStorage();
        if (user) {
            setUser(user);
        }
    }, []);

    async function authenticate(mail: string, password: string) {
        const response = await LoginRequest(mail, password)

        const payload = { token: response.token, user: response.userName, image: response.image, mail, id: response.id }
        console.log(payload)
        setUser(payload);
        setUserLocalStorage(payload)
    }


    async function logout() {

        setUser(null)
        setUserLocalStorage(null)
        const history = useHistory();
        history.push('/login');
    }

    return (
        <AuthContext.Provider value={{ ...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )


}