import { Button, Col, Form, Input, Row, Tabs, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { useAuth } from "../../context/AuthProvider/useAuth";
import { getProfessionalId } from "../../context/AuthProvider/util";
import TabPane from "antd/es/tabs/TabPane";
import { UploadOutlined } from '@ant-design/icons';

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
    const token = auth.token || '';
    const id = (auth.id || '').toString();
    const [professional, setProfessional] = useState<Professional | null>(null);
    const [fileList, setFileList] = useState([]);
    const [currentPhoto, setCurrentPhoto] = useState<string | null>(null)
    const photo = auth.image || '';
    const base64String = Buffer.from(photo).toString('base64');
    const imageUrl = `data:image/jpeg;base64,${base64String}`;
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchProfessionalData = async () => {
            try {
                const professionalData = await getProfessionalId(token, id);
                setProfessional(professionalData.professionalId);


            } catch (error) {
                console.error('Erro ao buscar dados do profissional:', error);
            }
        };
        fetchProfessionalData();
        setCurrentPhoto(imageUrl)
    }, []);

    const handleChange = (info: any) => {
        if (info.file.status == 'done' && info.file.response) {
            // O upload foi concluído, você pode tratar a resposta do servidor aqui, se necessário
            setCurrentPhoto(info.file.response.url); // Armazena a URL da foto atual
        }
        setFileList(info.fileList)
    }

    const handleSave = () => {

    }


    console.log(professional)


    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 2 },
        },

    };


    return (
        <div>
            {professional && (
                <Form
                    form={form}

                    onFinish={handleSave}

                    style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}
                >
                    <Tabs style={{ width: '100%' }}>
                        <TabPane tab="Perfil" key="1" style={{ width: '100%' }}>
                            <Col span={24} style={{ marginBottom: '-4%' }}>
                                <div style={{ display: 'flex' }}>
                                    <Form.Item>
                                        <label htmlFor="inputName">Nome</label>
                                        <Input style={{ width: 400, display: 'block' }} id="inputName" defaultValue={professional.name} disabled />
                                    </Form.Item>
                                    <Form.Item style={{ marginLeft: '15%' }}>
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            showUploadList={false}
                                            className="custom-upload"
                                            action="/api/upload"
                                            fileList={fileList}
                                            onChange={handleChange}
                                            beforeUpload={(file) => { // Antes do upload, define o estado imageUrl
                                                const reader = new FileReader();
                                                reader.readAsDataURL(file);
                                                reader.onload = () => {
                                                    setCurrentPhoto(reader.result as string);
                                                };
                                                return false; // Evita o upload automático do componente Upload
                                            }}
                                        >
                                            {currentPhoto ? (
                                                <img
                                                    src={currentPhoto}
                                                    alt="Foto de perfil"
                                                    style={{ width: '100%', height: '100%', borderRadius: '10%' }}
                                                />
                                            ) : (
                                                <div>
                                                    <UploadOutlined /> Carregar Foto
                                                </div>
                                            )}
                                        </Upload>
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="especialidades">Experiência e Especialidades</label>
                                    <Input style={{ width: 400, display: 'block' }} id="inputEspecialidades" defaultValue={professional.name} />

                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="resumo">Resumo</label>
                                    <Input style={{ width: 400, display: 'block' }} id="inputResumo" defaultValue={professional.name} />

                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="formacao">Formação</label>
                                    <Input style={{ width: 400, display: 'block' }} id="inputFormacao" defaultValue={professional.name} />

                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="descricaoPessoal">Descrição Pessoal</label>
                                    <Input style={{ width: 400, display: 'block' }} id="inputDescPessoal" defaultValue={professional.name} />

                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="valorSessao">Valor da Sessão</label>
                                    <Input style={{ width: 400, display: 'block' }} id="inputValorSessao" defaultValue={professional.name} />

                                </Form.Item>
                            </Col>

                        </TabPane>
                        <TabPane tab="Dados Pessoais" key="2">

                            <Col span={24}>

                                <Form.Item>
                                    <label htmlFor="namePessoais">Nome</label>
                                    <Input style={{ width: 400, display: 'block' }} id="inputNamePessoais" defaultValue={professional.name} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="CPF">CPF</label>
                                    <Input style={{ width: 150, display: 'block' }} id="inputCpf" defaultValue={professional.cpf} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="Email">Email</label>
                                    <Input style={{ width: 200, display: 'block' }} id="inputEmail" defaultValue={professional.mail} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="Telefone">Telefone</label>
                                    <Input style={{ width: 150, display: 'block' }} id="inputTelefone" defaultValue={professional.phone} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="Nascimento">Nascimento</label>
                                    <Input style={{ width: 100, display: 'block' }} id="inputNascimento" defaultValue={professional.birth} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="CEP">Cep</label>
                                    <Input style={{ width: 100, display: 'block' }} id="inputCep" defaultValue={professional.zipCode} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="Estado">Estado</label>
                                    <Input style={{ width: 50, display: 'block' }} id="inputEstado" defaultValue={professional.state} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="Cidade">Cidade</label>
                                    <Input style={{ width: 200, display: 'block' }} id="inputCidade" defaultValue={professional.city} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="Bairro">Bairro</label>
                                    <Input style={{ width: 200, display: 'block' }} id="inputBairro" defaultValue={professional.district} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="Rua">Rua</label>
                                    <Input style={{ width: 200, display: 'block' }} id="inputRua" defaultValue={professional.street} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="Numero">Numero</label>
                                    <Input style={{ width: 70, display: 'block' }} id="inputNumero" defaultValue={professional.number} />
                                </Form.Item>
                            </Col>


                        </TabPane>
                        <TabPane tab="Dados Profissionais" key="3">
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="CNPJ">CNPJ</label>
                                    <Input style={{ width: 150, display: 'block' }} id="inputCnpj" defaultValue={professional.cnpj} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="Profissao">Profissão</label>
                                    <Input style={{ width: 200, display: 'block' }} id="inputProfissao" defaultValue={professional.profession} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="Registro Profissional">Registro Profissional</label>
                                    <Input style={{ width: 100, display: 'block' }} id="inputRegistro" defaultValue={professional.professionRegister} />
                                </Form.Item>
                            </Col>

                        </TabPane>

                    </Tabs>
                    <Button type="primary" style={{ background: '#5eb0f8', marginRight: '3%' }}>Atualizar</Button>
                </Form>

            )}
        </div>
    );
}

export default Profile;