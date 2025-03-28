import { Button, Col, Form, Input, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { useAuth } from "../../context/AuthProvider/useAuth";
import { getProfessionalId, updateProfessional } from "../../context/AuthProvider/util";
import TabPane from "antd/es/tabs/TabPane";
import { Select } from 'antd';
import { DeleteTwoTone, DownCircleOutlined, PlusSquareTwoTone, UpCircleOutlined } from "@ant-design/icons";

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
    const [formationCount, setFormationCount] = useState<number>(0);
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


        if (!professional) return;

        const values = form.getFieldsValue();
        const {
            name,
            valorSessao,
            experiencias,
            descPessoal,
            cpf,
            email,
            telefone,
            nascimento,
            estado,
            cep,
            cidade,
            bairro,
            rua,
            numero,
            cnpj,
            registro,
            profissao,
            specialties,
        } = values;
        console.log(name)
        console.log(valorSessao)

        const professionalData = {
            name,
            profession: profissao,
            professionRegister: registro,
            cpf,
            cnpj,
            mail: email,
            phone: telefone,
            birth: nascimento,
            zipCode: cep,
            state: estado,
            city: cidade,
            street: rua,
            number: numero,
            district: bairro,
            // specialties: specialties.join(','), // Converter o array de especialidades para uma string separada por vírgulas
            experience: experiencias,
            selfDescription: descPessoal,
            serviceValue: valorSessao,
        };
        console.log(professionalData)


        if (professional) {
            updateProfessional(professionalData, token, id)
                .then(() => {
                    // Dados do profissional atualizados com sucesso
                })
                .catch((error) => {
                    console.error('Erro ao atualizar os dados do profissional:', error);
                });
        }





        form.resetFields();
        //setModalOpen(false);


    };
    console.log(professional?.formation)

    const toggleFormation = () => {
        if (formationCount < 5) {
            setProfessional((prevProfessional) => ({
                ...prevProfessional!,
                formation: [...prevProfessional!.formation, createEmptyFormation()],
            }));
            setFormationCount((prevFormationCount) => prevFormationCount + 1);
        }
        setIsFormationExpanded((prevIsFormationExpanded) => !prevIsFormationExpanded);
    };

    const handleAddFormation = () => {
        if (formationCount < 7) {
            setProfessional((prevProfessional) => {
                if (prevProfessional) {
                    return {
                        ...prevProfessional,
                        formation: [...prevProfessional.formation, createEmptyFormation()],
                    };
                }
                return null;
            });
            setFormationCount((prevFormationCount) => prevFormationCount + 1);
        }
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

    const createEmptyFormation = () => ({
        formation: "",
        status: "",
        course: "",
        institution: "",
        startDate: "",
        endDate: "",
    });



    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Button type="primary" style={{ background: '#5eb0f8' }} onClick={handleSave}>Salvar</Button>
            </div>
            {professional && (
                <Form
                    form={form}

                    onFinish={handleSave}

                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-15px' }}
                >

                    <Tabs >

                        <TabPane tab="Perfil" key="1" style={{ width: '400px' }}>

                            <Col span={24}>
                                <Form.Item name="name">
                                    <label htmlFor="inputName">Nome</label>
                                    <Input style={{ width: 400, display: 'block' }} id="inputName" value={professional.name} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="valorSessao">
                                    <label htmlFor="valorSessao">Valor da Sessão</label>
                                    <Input style={{ display: 'block' }} id="inputValorSessao" defaultValue={professional.serviceValue} />

                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="experiencias">
                                    <label htmlFor="experiencias">Experiência</label>
                                    <Input.TextArea style={{ width: 400, display: 'block' }} id="inputExperiencias" defaultValue={professional.experience} rows={5} />

                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="">
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
                                {isFormationExpanded ? <UpCircleOutlined style={{ marginLeft: '45%' }} /> : <DownCircleOutlined style={{ marginLeft: '45%' }} />}
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
                                                        <Form.Item name="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                                                            <label htmlFor="formacao">Formação</label>
                                                            <Input id={`type-${index}`} value={formationItem.formation} placeholder="Formação" />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={16} >
                                                        <Form.Item name="" style={{ marginTop: '2%' }}>
                                                            <label htmlFor="formacao">Curso</label>
                                                            <Input style={{ width: '260px', display: 'block' }} id={`type-${index}`} value={formationItem.course} placeholder="Curso" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={16}>
                                                        <Form.Item name="" style={{ marginTop: '-5%' }}>
                                                            <label htmlFor="formacao">Instituição</label>
                                                            <Input style={{ width: '280px', display: 'block' }} id={`type-${index}`} value={formationItem.institution} placeholder="Instituição" />
                                                        </Form.Item>

                                                    </Col>
                                                    <Col span={8} >
                                                        <Form.Item name="" style={{ marginTop: '-11%' }}>
                                                            <label htmlFor="formacao">Status</label>
                                                            <Input style={{ width: '87px', display: 'block' }} id={`type-${index}`} value={formationItem.status} placeholder="status" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Form.Item name="" style={{ marginTop: '-13%' }}>
                                                            <label htmlFor="formacao">Inicio</label>
                                                            <Input id={`type-${index}`} value={formationItem.startDate} placeholder="Inicio" />
                                                        </Form.Item>

                                                    </Col>
                                                    <Col span={8} >
                                                        <Form.Item name="" style={{ marginTop: '-13%' }}>
                                                            <label htmlFor="formacao">Termino</label>
                                                            <Input id={`type-${index}`} value={formationItem.endDate} placeholder="Termino" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Button style={{ marginTop: '1%' }} icon={<DeleteTwoTone />}>Excluir</Button>
                                                </Row>
                                            </Form>
                                        </div>

                                    ))}


                                    {formationCount < 5 && (
                                        <Button onClick={handleAddFormation} icon={<PlusSquareTwoTone />}>
                                            Adicionar Formação
                                        </Button>
                                    )}
                                </div>
                            )}

                            <Col span={24}>
                                <Form.Item name="descPessoal" style={{ marginTop: '2%' }}>
                                    <label htmlFor="descricaoPessoal">Descrição Pessoal</label>
                                    <Input.TextArea style={{ width: 400, display: 'block' }} id="inputDescPessoal" defaultValue={professional.selfDescription} rows={5} />

                                </Form.Item>
                            </Col>


                        </TabPane>
                        <TabPane tab="Dados Pessoais" key="2" style={{ width: '400px' }}>
                            <Form

                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="cpf">
                                            <label htmlFor="CPF">CPF</label>
                                            <Input style={{ display: 'block' }} id="inputCpf" defaultValue={professional.cpf} disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="email">
                                            <label htmlFor="Email">Email</label>
                                            <Input style={{ display: 'block' }} id="inputEmail" defaultValue={professional.mail} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="telefone">
                                            <label htmlFor="Telefone">Telefone</label>
                                            <Input style={{ display: 'block' }} id="inputTelefone" defaultValue={professional.phone} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="nascimento">
                                            <label htmlFor="Nascimento">Nascimento</label>
                                            <Input style={{ display: 'block' }} id="inputNascimento" defaultValue={professional.birth} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="estado">
                                            <label htmlFor="Estado">Estado</label>
                                            <Input style={{ display: 'block' }} id="inputEstado" defaultValue={professional.state} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="cep">
                                            <label htmlFor="CEP">Cep</label>
                                            <Input style={{ display: 'block' }} id="inputCep" defaultValue={professional.zipCode} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item name="cidade">
                                            <label htmlFor="Cidade">Cidade</label>
                                            <Input style={{ width: 200, display: 'block' }} id="inputCidade" defaultValue={professional.city} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="bairro">
                                            <label htmlFor="Bairro">Bairro</label>
                                            <Input style={{ width: 200, display: 'block' }} id="inputBairro" defaultValue={professional.district} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="rua">
                                            <label htmlFor="Rua">Rua</label>
                                            <Input style={{ display: 'block' }} id="inputRua" defaultValue={professional.street} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="numero">
                                            <label htmlFor="Numero">Numero</label>
                                            <Input style={{ display: 'block' }} id="inputNumero" defaultValue={professional.number} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>

                        </TabPane>
                        <TabPane tab="Dados Profissionais" key="3" style={{ width: '400px' }}>
                            <Form

                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="cnpj">
                                            <label htmlFor="CNPJ">CNPJ</label>
                                            <Input style={{ display: 'block' }} id="inputCnpj" defaultValue={professional.cnpj} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="registro">
                                            <label htmlFor="Registro Profissional">Registro Profissional</label>
                                            <Input style={{ width: 100, display: 'block' }} id="inputRegistro" defaultValue={professional.professionRegister} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item name="profissao">
                                            <label htmlFor="Profissao">Profissão</label>
                                            <Input style={{ display: 'block' }} id="inputProfissao" defaultValue={professional.profession} />
                                        </Form.Item>
                                    </Col>

                                </Row>
                            </Form>


                        </TabPane>

                    </Tabs>

                </Form>

            )}
        </div>
    );
}

export default Profile;