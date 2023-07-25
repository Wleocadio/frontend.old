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

       // console.log(response.data)
        return response.data;

    } catch (error) {
        console.error('Erro ao buscar pacientes', error)
        throw error;
    }
}
export const getProfessionalId = async (token: string, id: string) =>{
    try {
        const response = await Api.get(`/professional/${id}`, {
            headers:{
                Authorization: token
            }
        })
        return response.data 
    } catch (error) {
        console.error('Erro ao buscar profissional', error)
        throw error;
        
    }
}

export const getProfessionalPhoto = async (token: string, id: string) =>{
    try {
        const response = await Api.get(`/professional/photo/${id}`, {
            headers:{
                Authorization: token
            }
        })
        return response.data 
    } catch (error) {
        console.error('Erro ao buscar a foto profissional', error)
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

        //console.log(response.data)
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

export const fetchPatientSchedules = async (token: string, id:string) => {
    try {
        
        const response = await Api.get(`/schedules/patientSchedule/${id}`, {
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

export const updateSchedule = async (scheduleData: any, token: string, id:string) => {
    try {
       console.log(scheduleData)
        const response = await Api.put(`/schedules/${id}`, scheduleData, {
            headers: {
                Authorization: token
            },
        })
        const responseData = response.data
                
            if (response.status = 201){
                console.log("Consulta atualizada com sucesso")

            } else {
                console.log("Erro ao atualizar consulta")
            }

        return responseData

    } catch (error) {
        console.error('Ocorreu algum erro na atualização da consulta', error)
        throw error;
    }
}
export const updatePhoto = async (photoData: any, token: string, id:string) => {
    try {
      // Supondo que você tenha uma instância do axios chamada "Api" configurada corretamente
        const response = await Api.put(`/professional/photo/${id}`, photoData, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data', // Adicione o tipo de conteúdo apropriado para enviar arquivos
            },
        })
        const responseData = response.data
                
            if (response.status = 201){
                console.log("Foto do perfil foi atualizada com sucesso")

            } else {
                console.log("Erro ao atualizar foto")
            }

        return responseData

    } catch (error) {
        console.error('Ocorreu um erro na atualização da foto', error)
        throw error;
    }
}

export const createPatients = async (patientData: any, token: string) => {
    try {
      
        const response = await Api.post('/patient/create', patientData, {
            headers: {
                Authorization: token
            },
        })
       // console.log(response.data)
        const responseData = response.data
                
            if (response.status = 201){
                console.log("Paciente cadastrado com sucesso")

            } else {
                console.log("Erro ao cadastrar paciente")
            }

        return responseData

    } catch (error) {

        console.error('Erro ao criar Paciente', error)
        throw error;
    }
}


