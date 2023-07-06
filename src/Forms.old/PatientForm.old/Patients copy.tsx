import React, { useEffect, useState } from 'react';

import { useAuth } from '../../context/AuthProvider/useAuth';
import { Api } from '../../services/api';
import { Avatar, List } from 'antd';
import VirtualList from 'rc-virtual-list';

interface UserItem {
    _id: string;
    name: string;
    cpf: string;
    mail: string;
    phone: number;
    emergencyContact: number;
    nameEmergencyContact: string;
    gender: string;
    dateBirth: string;
    zipCode: string;
    state: string;
    city: string;
    district: string;
    street: string;
    number: number;
    reasonOfConsultation: string;
    observation: string;
    image: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
const Patients: React.FC = () => {
    const auth = useAuth()
    const [patients, setPatients] = useState<UserItem[]>([]);
    const ContainerHeight = 500;
    useEffect(() => {
        const fetchPatients = async () => {
            console.log('teste')
            try {
                const token = auth.token // Substitua pelo token de autorização correto
                const id = auth.id;
                console.log(token)
                console.log(id)
                const response = await Api.get(`/professional/patients/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                console.log(response.data)
                setPatients(response.data);
            } catch (error) {
                console.error('Erro ao buscar pacientes:', error);
                
            }
        };

        fetchPatients();
    }, []);
   

    return (
        <div className="container">
          <List>
            <VirtualList
              height={ContainerHeight}
              className="content"
              data={patients}
              itemHeight={47}
              itemKey="_id"
            >
              {(response: UserItem) => (
                <List.Item key={response._id}>
                  <List.Item.Meta
                    avatar={<Avatar src={response.image} />}
                    title={<a href="https://ant.design">{response.name}</a>}
                    description={response.mail}
                  />
                  <div>Content</div>
                </List.Item>
              )}
            </VirtualList>
          </List>
        </div>
      );
};

export default Patients;