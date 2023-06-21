//import {Patient} from "../../Forms/PatientForm/Patient";
import { Api } from "../../services/api";
import { IUser } from "./types";


export function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem("u", JSON.stringify(user));
}

export function getUserLocalStorage() {
    const json = localStorage.getItem('u')

    if (!json) {
        return null;
    }

    const user = JSON.parse(json)

    return user ?? null;

}


export async function LoginRequest(mail: string, password: string) {
    //console.log(mail, password +' LoginRequest')
    try {
        //console.log(mail, password +' API')
        const request = await Api.post("/login", { mail, password});
        //console.log(request.data)
        return request.data;
        
    } catch (error) {
        return null;
    }
}

export const fetchPatients = async (token: string, id: string) =>{
   
    try {
        
        console.log(token)
        const response = await Api.get(`/professional/patients/${id}`, {
            headers:{
                Authorization:token
            }
        })
        
        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error('Erro ao buscar pacientes', error)
        throw error;
    }
}