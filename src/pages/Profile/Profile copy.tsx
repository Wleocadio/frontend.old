
import { Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { useAuth } from "../../context/AuthProvider/useAuth";
import { getProfessionalId } from "../../context/AuthProvider/util";
import { Store } from "antd/es/form/interface";


interface Professional {
    _id: string;
    name: string;
    profession: string;
    professionRegister: number;
    cpf: number;
    cnpj: number;
    mail: string;
    password: string;
    phone: number;
    gender: string;
    birth: string;
    zipCode: string;
    state: string;
    city: string;
    street: string;
    number: number;
    district: string;
    image: Buffer,
}

const Profile: React.FC = () => {
    const auth = useAuth()
    const [form] = Form.useForm();
    const token = auth.token || '';
    const id = (auth.id || '').toString();
    const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

    useEffect(() => {

        const fetchaData = async () => {
            try {
                // Simulando uma chamada à função getProfessional para obter os dados
                const professionalData = await getProfessionalId(token, id);
                setSelectedProfessional(professionalData)

            } catch (error) {
                console.error('Erro ao tentar buscar pacientes:', error);

            }
        };
        fetchaData()

    }, []);

    console.log(selectedProfessional)



    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },

    };

    return (
        <>
        
        <Form

            {...formItemLayout}
          
            style={{ display: 'flex', justifyContent: 'center', marginTop: '7%' }}
            >
            

            <Row gutter={[16, 9]}>
                <Col span={24}>
                    <Form.Item

                        label="Nome"

                    >
                        <label>Name</label>
                        <Input style={{ width: 400 }} id="inputName" defaultValue={selectedProfessional?.name} />

                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item

                        label="Profissão" name="profession"
                    >
                        <Input style={{ width: 200 }} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item

                        label="Registro Profissional"
                    >
                        <Input style={{ width: 100 }} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item

                        label="CPF"
                    >
                        <Input style={{ width: 150 }} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item

                        label="CNPJ"
                    >
                        <Input style={{ width: 150 }} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item

                        label="Email"
                    >
                        <Input style={{ width: 200 }} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item

                        label="Telefone"
                    >
                        <Input style={{ width: 150 }} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item

                        label="Nascimento"
                    >
                        <Input style={{ width: 100 }} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item

                        label="CEP"
                    >
                        <Input style={{ width: 100 }} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item

                        label="Estado"
                    >
                        <Input style={{ width: 50 }} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item

                        label="Cidade"
                    >
                        <Input style={{ width: 200 }} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item

                        label="Bairro"
                    >
                        <Input style={{ width: 200 }} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item

                        label="Rua"
                    >
                        <Input style={{ width: 200 }} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item

                        label="Numero"
                    >
                        <Input style={{ width: 50 }} />
                    </Form.Item>
                </Col>

            </Row>
        </Form>
        </>
    )


}

export default Profile;
