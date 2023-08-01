import { Button, Col, Form, Input, Modal, Result, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { useAuth } from "../../context/AuthProvider/useAuth";
import { getProfessionalId, updateProfessional } from "../../context/AuthProvider/util";
import TabPane from "antd/es/tabs/TabPane";
import { Select } from 'antd';
import { DeleteTwoTone, DownCircleOutlined, PlusSquareTwoTone, UpCircleOutlined } from "@ant-design/icons";
import './Profile.css'

interface Formation {
    _id: string;
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
    const [showSaved, setShowSaved] = useState(false);
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
        const formationData = getFormationData() || [];
        const inputName = form.getFieldValue('name');
        const inputValorSessao = form.getFieldValue('valorSessao');
        const inputExperiencias = form.getFieldValue('experiencias');
        const inputDescPessoal = form.getFieldValue('descPessoal');
        const inputCpf = form.getFieldValue('cpf');
        const inputEmail = form.getFieldValue('email');
        const inputTelefone = form.getFieldValue('telefone');
        const inputNascimento = form.getFieldValue('nascimento');
        const inputEstado = form.getFieldValue('estado');
        const inputCep = form.getFieldValue('cep');
        const inputCidade = form.getFieldValue('cidade');
        const inputBairro = form.getFieldValue('bairro');
        const inputRua = form.getFieldValue('rua');
        const inputNumero = form.getFieldValue('numero');
        const inputCnpj = form.getFieldValue('cnpj');
        const inputRegistro = form.getFieldValue('registro');
        const inputProfissao = form.getFieldValue('profissao');
        const inputSpecialties = form.getFieldValue('specialties');

        console.log(formationData)
        console.log(inputName)
        console.log(inputValorSessao)


        const professionalData = {
            name: inputName,
            profession: inputProfissao,
            professionRegister: inputRegistro,
            cpf: inputCpf,
            cnpj: inputCnpj,
            mail: inputEmail,
            phone: inputTelefone,
            //gender: string;
            birth: inputNascimento,
            zipCode: inputEstado,
            state: inputCep,
            city: inputCidade,
            street: inputRua,
            number: inputNumero,
            district: inputBairro,
            specialties: inputSpecialties,
            experience: inputExperiencias,
            formation: formationData,
            selfDescription: inputDescPessoal,
            serviceValue: inputValorSessao,


        };
        // console.log(professionalData)
        if (professional) {
            updateProfessional(professionalData, token, id)
                .then(() => {
                    setShowSaved(true)
                })
        }

        form.resetFields();
        //setModalOpen(false);


    };
    //console.log(professional?.formation)

    const toggleFormation = () => {
        /*   if (formationCount < 5) {
               setProfessional((prevProfessional) => ({
                   ...prevProfessional!,
                   formation: [...prevProfessional!.formation, createEmptyFormation()],
               }));
               setFormationCount((prevFormationCount) => prevFormationCount + 1);
           }*/
        setIsFormationExpanded((prevIsFormationExpanded) => !prevIsFormationExpanded);
    };

    const handleAddFormation = () => {
        if (formationCount < 5) {
            setProfessional((prevProfessional) => {
                if (prevProfessional) {
                    const newFormation = createEmptyFormation();
                    return {
                        ...prevProfessional,
                        formation: [...prevProfessional.formation, newFormation],
                    };
                }
                return null;
            });
            setFormationCount((prevFormationCount) => prevFormationCount + 1);
        }
    };

    const handleFormationDelete = (formationIdToDelete: string) => {
        if (!professional) return;
        const updatedFormation = professional.formation.filter((formationItem) => formationItem._id !== formationIdToDelete);
        setProfessional((prevProfessional) => ({
            ...prevProfessional!,
            formation: updatedFormation,
        }));
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
        _id:"",
        formation: "",
        status: "",
        course: "",
        institution: "",
        startDate: "",
        endDate: "",
    });


    const initialValues = {
        name: professional?.name || '', // Nome do profissional
        valorSessao: professional?.serviceValue || '', // Valor da sessão do profissional
        experiencias: professional?.experience || '', // Experiências do profissional
        descPessoal: professional?.selfDescription || '', // Descrição pessoal do profissional
        cpf: professional?.cpf || '', // CPF do profissional
        email: professional?.mail || '', // E-mail do profissional
        telefone: professional?.phone || '', // Telefone do profissional
        nascimento: professional?.birth || '', // Data de nascimento do profissional
        estado: professional?.state || '', // Estado do profissional
        cep: professional?.zipCode || '', // CEP do profissional
        cidade: professional?.city || '', // Cidade do profissional
        bairro: professional?.district || '', // Bairro do profissional
        rua: professional?.street || '', // Rua do profissional
        numero: professional?.number || '', // Número do endereço do profissional
        cnpj: professional?.cnpj || '', // CNPJ do profissional
        registro: professional?.professionRegister || '', // Registro profissional do profissional
        profissao: professional?.profession || '', // Profissão do profissional
        specialties: professional?.specialties || [], // Especialidades do profissional como um array
        formation: professional?.formation || [], // Formações acadêmicas do profissional como um array
    };

    const getFormationData = () => {
        const formationData = initialValues.formation.map((formationItem) => {
            const formation = form.getFieldValue(`formacao-${formationItem._id}`) || formationItem.formation;
            const course = form.getFieldValue(`course-${formationItem._id}`) || formationItem.course;
            const institution = form.getFieldValue(`institution-${formationItem._id}`) || formationItem.institution;
            const status = form.getFieldValue(`status-${formationItem._id}`) || formationItem.status;
            const startDate = form.getFieldValue(`startDate-${formationItem._id}`) || formationItem.startDate;
            const endDate = form.getFieldValue(`endDate-${formationItem._id}`) || formationItem.endDate;

            return {
                formation,
                course,
                institution,
                status,
                startDate,
                endDate,
            };
        });

        //console.log(formationData); // Aqui, você pode visualizar os dados capturados
        // Faça o que for necessário com os dados capturados
        return formationData
    };

    const closeSaveMessage = () => {
        setShowSaved(false)
        //history.push('/schedule');
        window.location.reload()
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Button type="primary" style={{ background: '#5eb0f8' }} onClick={handleSave}>Salvar</Button>
            </div>
            {professional && (
                <Form
                    form={form}
                    onFinish={handleSave}
                    initialValues={initialValues}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-15px' }}
                >

                    <Tabs >

                        <TabPane tab="Perfil" key="1" style={{ width: '400px' }}>

                            <Col span={24}>
                                <label htmlFor="inputName">Nome</label>
                                <Form.Item name="name">
                                    <Input id="inputName" disabled />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <label htmlFor="valorSessao">Valor da Sessão</label>
                                <Form.Item name="valorSessao">

                                    <Input style={{ display: 'block' }} id="inputValorSessao" />

                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <label htmlFor="experiencias">Experiência</label>
                                <Form.Item name="experiencias">

                                    <Input.TextArea style={{ width: 400, display: 'block' }} id="inputExperiencias" rows={5} />

                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <label htmlFor="resumo">Especialidades</label>
                                <Form.Item name="specialties">

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
                                    {initialValues.formation.map((formationItem) => (
                                        <div key={formationItem._id} style={{ display: 'flex', width: '800px' }}>
                                            <div
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
                                                        <label htmlFor={`formacao-${formationItem._id}`}>Formação</label>
                                                        <Form.Item name={`formacao-${formationItem._id}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                                                            <Input id={`formacao-${formationItem._id}`} defaultValue={formationItem.course} placeholder="Formação" />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={16} >
                                                        <label htmlFor={`course-${formationItem._id}`}>Curso</label>
                                                        <Form.Item name={`course-${formationItem._id}`} style={{ marginTop: '2%' }}>
                                                            <Input style={{ width: '260px', display: 'block' }} id={`type-${formationItem._id}`} defaultValue={formationItem.course} placeholder="Curso" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={16}>
                                                        <label htmlFor={`institution-${formationItem._id}`}>Instituição</label>
                                                        <Form.Item name={`institution-${formationItem._id}`} >
                                                            <Input style={{ width: '280px', display: 'block' }} id={`type-${formationItem._id}`} defaultValue={formationItem.institution} placeholder="Instituição" />
                                                        </Form.Item>

                                                    </Col>
                                                    <Col span={8} >
                                                        <label htmlFor={`status-${formationItem._id}`}>Status</label>
                                                        <Form.Item name={`status-${formationItem._id}`}>
                                                            <Input style={{ width: '87px', display: 'block' }} id={`type-${formationItem._id}`} defaultValue={formationItem.status} placeholder="status" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={8}>
                                                        <label htmlFor={`startDate-${formationItem._id}`}>Inicio</label>
                                                        <Form.Item name={`startDate-${formationItem._id}`} >
                                                            <Input id={`type-${formationItem._id}`} defaultValue={formationItem.startDate} placeholder="Inicio" />
                                                        </Form.Item>

                                                    </Col>
                                                    <Col span={8} >
                                                        <label htmlFor={`endDate-${formationItem._id}`}>Termino</label>
                                                        <Form.Item name={`endDate-${formationItem._id}`} >
                                                            <Input id={`type-${formationItem._id}`} defaultValue={formationItem.endDate} placeholder="Termino" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Button
                                                        style={{ marginTop: '5%' }}
                                                        icon={<DeleteTwoTone />}
                                                        onClick={() => handleFormationDelete(formationItem._id)}
                                                    >
                                                        Excluir
                                                    </Button>
                                                </Row>
                                            </div>
                                        </div>

                                    ))}



                                </div>
                            )}
                            {formationCount < 5 && (
                                <Button onClick={handleAddFormation} icon={<PlusSquareTwoTone />}>
                                    Adicionar Formação
                                </Button>
                            )}

                            <Col span={24}>
                                <label htmlFor="descricaoPessoal">Descrição Pessoal</label>
                                <Form.Item name="descPessoal" style={{ marginTop: '2%' }}>
                                    <Input.TextArea style={{ width: 400, display: 'block' }} id="inputDescPessoal" rows={5} />

                                </Form.Item>
                            </Col>


                        </TabPane>
                        <TabPane tab="Dados Pessoais" key="2" style={{ width: '400px' }}>
                            <div>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <label htmlFor="CPF">CPF</label>
                                        <Form.Item name="cpf">

                                            <Input style={{ display: 'block' }} id="inputCpf" disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <label htmlFor="Email">Email</label>
                                        <Form.Item name="email">

                                            <Input style={{ display: 'block' }} id="inputEmail" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <label htmlFor="Telefone">Telefone</label>
                                        <Form.Item name="telefone">

                                            <Input style={{ display: 'block' }} id="inputTelefone" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <label htmlFor="Nascimento">Nascimento</label>
                                        <Form.Item name="nascimento">

                                            <Input style={{ display: 'block' }} id="inputNascimento" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <label htmlFor="Estado">Estado</label>
                                        <Form.Item name="estado">

                                            <Input style={{ display: 'block' }} id="inputEstado" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <label htmlFor="CEP">Cep</label>
                                        <Form.Item name="cep">

                                            <Input style={{ display: 'block' }} id="inputCep" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <label htmlFor="Cidade">Cidade</label>
                                        <Form.Item name="cidade">

                                            <Input style={{ width: 200, display: 'block' }} id="inputCidade" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <label htmlFor="Bairro">Bairro</label>
                                        <Form.Item name="bairro">

                                            <Input style={{ width: 200, display: 'block' }} id="inputBairro" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <label htmlFor="Rua">Rua</label>
                                        <Form.Item name="rua">

                                            <Input style={{ display: 'block' }} id="inputRua" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <label htmlFor="Numero">Numero</label>
                                        <Form.Item name="numero">

                                            <Input style={{ display: 'block' }} id="inputNumero" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>

                        </TabPane>
                        <TabPane tab="Dados Profissionais" key="3" style={{ width: '400px' }}>
                            <div>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <label htmlFor="CNPJ">CNPJ</label>
                                        <Form.Item name="cnpj">

                                            <Input style={{ display: 'block' }} id="inputCnpj" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <label htmlFor="Registro Profissional">Registro Profissional</label>
                                        <Form.Item name="registro">

                                            <Input style={{ width: 100, display: 'block' }} id="inputRegistro" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <label htmlFor="Profissao">Profissão</label>
                                        <Form.Item name="profissao">
                                            <Input style={{ display: 'block' }} id="inputProfissao" />
                                        </Form.Item>
                                    </Col>

                                </Row>
                            </div>


                        </TabPane>

                    </Tabs>

                </Form>

            )}

            <Modal
                open={showSaved}
                centered
                footer={null}
                className="slide-in-modal" // Aplicando a classe de animação ao Modal
                onCancel={closeSaveMessage}
            >
                <Result
                    status="success"
                    title="Cadastro atualizado com Sucesso!"
                    extra={[
                        <Button id='btnOkMessageSuccess' type="primary" key="ok" onClick={closeSaveMessage}>
                            OK
                        </Button>
                    ]}
                ></Result>
            </Modal>
        </div>
    );
}

export default Profile;