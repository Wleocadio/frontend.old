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
        const request = await Api.post("/login", { mail, password });
        //console.log(request.data)
        return request.data;

    } catch (error) {
        return null;
    }
}

export const fetchPatients = async (token: string, id: string) => {

    try {

       const response = await Api.get(`/professional/patients/${id}`, {
            headers: {
                Authorization: token
            }
        })

        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error('Erro ao buscar pacientes', error)
        throw error;
    }
}
export const getPatients = async (token: string) => {

    try {

       const response = await Api.get('/professional/patients', {
            headers: {
                Authorization: token
            }
        })

        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error('Erro ao buscar pacientes', error)
        throw error;
    }
}

export const fetchSchedules = async (token: string, id:string) => {
    try {
        
        const response = await Api.get(`/schedules/MySchedule/${id}`, {
            headers: {
                Authorization: token
            }
        });
        return response.data;

    } catch (error) {
        console.error('Erro ao buscar agenda', error)
        throw error;
    }
}

export const fetchPatientName = async (token: string, id:string) => {
    try {
        
        const response = await Api.get(`/patient/${id}`, {
            headers: {
                Authorization: token
            }
        });
        return response.data;

    } catch (error) {
        console.error('Erro ao buscar Paciente', error)
        throw error;
    }
}

export const deleteSchedule = async (token: string, id:string) => {
    try {
        
        const response = await Api.delete(`/schedules/${id}`, {
            headers: {
                Authorization: token
            }
        });
        return response.data;

    } catch (error) {
        console.error('Erro ao excluir Agendamento', error)
        throw error;
    }
}

export const createSchedule = async (scheduleData: any, token: string) => {
    try {
       
        const response = await Api.post('/schedules', scheduleData, {
            headers: {
                Authorization: token
            },
        })
        const responseData = response.data
                
            if (response.status = 201){
                console.log("Agendamento cadastrado com sucesso")

            } else {
                console.log("Erro ao cadastrar agendamento")
            }

        return responseData

    } catch (error) {
        console.error('Erro ao criar Agendamento', error)
        throw error;
    }
}