import { Button, Col, Form, Input, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { useAuth } from "../../context/AuthProvider/useAuth";
import { getProfessionalId } from "../../context/AuthProvider/util";
import TabPane from "antd/es/tabs/TabPane";
import { Select } from 'antd';
import { DeleteTwoTone, DownCircleOutlined, DownOutlined, PlusSquareTwoTone, RightOutlined, UpCircleOutlined } from "@ant-design/icons";

interface Formation {
    formation: string;
    status: string;
    course: string;
    institution: string;
    startDate: string;
    endDate: string;
}

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
    specialties: string,
    experience: string,
    formation: Formation[],
    selfDescription: string,
    serviceValue: number,
}

const Profile: React.FC = () => {
    const auth = useAuth()
    const token = auth.token || '';
    const id = (auth.id || '').toString();
    const [professional, setProfessional] = useState<Professional | null>(null);
    const [isFormationExpanded, setIsFormationExpanded] = useState(false);
    const [form] = Form.useForm();
    const { Option } = Select

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
    }, []);

    const handleSave = () => {

    }
    console.log(professional?.formation)

    const toggleFormation = () => {
        setIsFormationExpanded((prevIsFormationExpanded) => !prevIsFormationExpanded)
    };



    // Defina o array com as especialidades disponíveis para seleção
    const availableSpecialties = [
        'Aconselhamento Psicológico',
        'Terapia Cognitivo-Comportamental',
        'Terapia Psicanalítica',
        'Terapia Gestalt',
        'Terapia de Família e Casal',
        'Terapia Comportamental',
        'Psicoterapia Breve',
        'Terapia de Grupo',
        'Terapia Existencial-Humanista',
        'Terapia de Aceitação e Compromisso (ACT)',
        'Terapia Focada nas Emoções',
        'Terapia Sistêmica',
        'Psicologia Clínica',
        'Psicologia Hospitalar',
        'Psicologia Escolar',
        'Psicologia Organizacional',
        'Psicologia do Esporte',
        'Orientação Profissional',
        'Psicologia Social',
        'Psicologia da Saúde',
        'Psicologia do Desenvolvimento',
        'Neuropsicologia',
        'Psicologia Forense',
        'Psicologia do Trânsito',
        'Psicologia Comunitária',
        // Adicione outras especialidades conforme necessário
    ];

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

                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="inputName">Nome</label>
                                    <Input style={{ width: 400, display: 'block' }} id="inputName" defaultValue={professional.name} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="especialidades">Experiência</label>
                                    <Input.TextArea style={{ width: 400, display: 'block' }} id="inputExperiencias" defaultValue={professional.experience} rows={5} />

                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="resumo">Especialidades</label>
                                    <Select
                                        style={{ width: 400, display: 'block' }}
                                        mode="tags" // Permite inserir novas especialidades e selecionar as existentes
                                        placeholder="Digite ou selecione as especialidades"
                                        defaultValue={professional.specialties} // Defina aqui um array com as especialidades já cadastradas para mostrar as selecionadas
                                    >
                                        {/* Mapeie as especialidades disponíveis e crie uma Option para cada uma */}
                                        {availableSpecialties.map((specialty) => (
                                            <Option key={specialty} value={specialty}>
                                                {specialty}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <div onClick={toggleFormation}>
                                <label style={{ fontSize: '20px' }}>Experiência Acadêmica</label>
                                {isFormationExpanded ? <UpCircleOutlined style={{ marginLeft: '15%' }} /> : <DownCircleOutlined style={{ marginLeft: '15%' }} />}
                            </div>
                            {isFormationExpanded && (
                                <div>
                                    {professional.formation.map((formationItem, index) => (
                                        <div key={index} style={{ display: 'flex', width: '800px' }}>
                                            <Form
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: '410px',

                                                    borderBottom: '1px solid gray', // Define uma borda superior branca
                                                    background: '#ff8f8',
                                                }}
                                            >
                                                <Row gutter={16}>
                                                    <Col span={8}>
                                                        <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                                                            <label htmlFor="formacao">Formação</label>
                                                            <Input id={`type-${index}`} value={formationItem.formation} placeholder="Formação" />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={16} >
                                                        <Form.Item style={{ marginTop: '2%' }}>
                                                            <label htmlFor="formacao">Curso</label>
                                                            <Input style={{ width: '260px', display: 'block' }} id={`type-${index}`} value={formationItem.course} placeholder="Curso" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={16}>
                                                        <Form.Item style={{ marginTop: '-5%' }}>
                                                            <label htmlFor="formacao">Instituição</label>
                                                            <Input style={{ width: '280px', display: 'block' }} id={`type-${index}`} value={formationItem.institution} placeholder="Instituição" />
                                                        </Form.Item>

                                                    </Col>
                                                    <Col span={8} >
                                                        <Form.Item style={{ marginTop: '-11%' }}>
                                                            <label htmlFor="formacao">Status</label>
                                                            <Input style={{ width: '87px', display: 'block' }} id={`type-${index}`} value={formationItem.status} placeholder="status" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Form.Item style={{ marginTop: '-13%' }}>
                                                            <label htmlFor="formacao">Inicio</label>
                                                            <Input id={`type-${index}`} value={formationItem.startDate} placeholder="Inicio" />
                                                        </Form.Item>

                                                    </Col>
                                                    <Col span={8} >
                                                        <Form.Item style={{ marginTop: '-13%' }}>
                                                            <label htmlFor="formacao">Termino</label>
                                                            <Input id={`type-${index}`} value={formationItem.endDate} placeholder="Termino" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Button style={{ marginTop: '1%' }} icon={<DeleteTwoTone />}>Excluir</Button>
                                                </Row>
                                            </Form>
                                        </div>

                                    ))}
                                    <Button icon={<  PlusSquareTwoTone />}>Adcionar Cursos</Button>
                                </div>
                            )}

                            <Col span={24}>
                                <Form.Item style={{ marginTop: '2%' }}>
                                    <label htmlFor="descricaoPessoal">Descrição Pessoal</label>
                                    <Input.TextArea style={{ width: 400, display: 'block' }} id="inputDescPessoal" defaultValue={professional.selfDescription} rows={5} />

                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <label htmlFor="valorSessao">Valor da Sessão</label>
                                    <Input style={{ width: 400, display: 'block' }} id="inputValorSessao" defaultValue={professional.serviceValue} />

                                </Form.Item>
                            </Col>

                        </TabPane>
                        <TabPane tab="Dados Pessoais" key="2">

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