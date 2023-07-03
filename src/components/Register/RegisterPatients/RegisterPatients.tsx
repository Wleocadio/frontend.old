import React, { useEffect, useState } from "react"
import { Button, Col, DatePicker, Form, Input, Modal, Result, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import dayjs from 'dayjs';
import './RegisterPatientes.css'
import { useAuth } from "../../../context/AuthProvider/useAuth";
import { createPatients } from "../../../context/AuthProvider/util";
import { useHistory } from "react-router-dom";


interface Props {
    closeModal: () => void;
}

interface UserItem {
    
    professionalId: string;
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
    initialDemand: string;
    purposeTreatment: string;
    patientEvolution: string;
    generalNotes: string;
    image: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    _id: string;
}






const RegisterPatients: React.FC<Props> = ({ closeModal }) => {
    const auth = useAuth();
    const token = auth.token || '';
    const professionailId = auth.id || '';
    const [form] = Form.useForm();
    const [showCreateResult, setShowCreateResult] = useState(false);
    const history = useHistory()

    /** Manually entering any of the following formats will perform date parsing */
    const dateFormatList = ['DD/MM/YYYY'];
    const handlerFormSubmit = () => {
        const pacienteNomeCompleto = form.getFieldValue('nomeCompleto');
        const pacienteCpf = form.getFieldValue('cpf');
        const pacienteEmail = form.getFieldValue('email');
        const pacienteTelefone = form.getFieldValue('telefone');
        const pacienteNascimento = form.getFieldValue('nascimento');
        const pacienteSexo = form.getFieldValue('sexo');
        const pacienteEstadoCivil = form.getFieldValue('estadoCivil');
        const pacienteProfissao = form.getFieldValue('profissao');
        const pacienteNomeEmergencia = form.getFieldValue('nomeContatoEmergencia');
        const pacienteTelefoneEmergencia = form.getFieldValue('telefoneEmergencia');
        const pacienteCep = form.getFieldValue('cep');
        const pacienteEstado = form.getFieldValue('estado');
        const pacienteCidade = form.getFieldValue('cidade');
        const pacienteBairro = form.getFieldValue('bairro');
        const pacienteRua = form.getFieldValue('rua');
        const pacienteNumero = form.getFieldValue('numero');
        const pacienteMotivoConsulta = form.getFieldValue('motivoConsulta');

        if (professionailId) {
            const formattedDate = pacienteNascimento ? pacienteNascimento.format('YYYY-MM-DD') : ''
            const formatetedTime = '00:00:00'
            const dateBirth = `${formattedDate}T${formatetedTime}Z`;
            //userId
            const patientData = {
                name: pacienteNomeCompleto,
                cpf: pacienteCpf,
                mail: pacienteEmail,
                phone: pacienteTelefone,
                emergencyContact: pacienteTelefoneEmergencia,
                nameEmergencyContact: pacienteNomeEmergencia,
                gender: pacienteSexo,
                dateBirth: dateBirth,
                maritalStatus: pacienteEstadoCivil,
                zipCode: pacienteCep,
                state: pacienteEstado,
                city: pacienteCidade,
                district: pacienteBairro,
                street: pacienteRua,
                number: pacienteNumero,
                initialDemand: pacienteMotivoConsulta,
                image: 'teste',
                active: true

            }
            console.log(patientData, token)

            createPatients(patientData, token)
                .then(() => {
                    setShowCreateResult(true)
                })
        }
        form.resetFields()
        closeModal();
    };

    const closeCreateMessage = () => {
        setShowCreateResult(false)
        history.push('/schedule');
        window.location.reload()
    }

    return (
        <>
            <Modal
                visible={true}
                onCancel={closeModal}
                footer={[
                    <Button id='btnSave' key="salvar" type="primary" onClick={handlerFormSubmit}>
                        Salvar
                    </Button>,
                    <Button id='btnClose' key="cancel" onClick={closeModal}>
                        Cancelar
                    </Button>,
                ]}
                maskClosable={false}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}

            >
                <Title style={{ textAlign: 'center', fontSize: '25px' }}>Cadastrar Paciente</Title>
                <Form style={{ display: 'flex', justifyContent: 'center' }}
                    form={form}
                    onFinish={handlerFormSubmit}>
                    <Row gutter={16}>
                        <Col span={17}>
                            <label>Nome</label>
                            <Form.Item name="nomeCompleto"
                                rules={[{ required: true, message: 'Por favor, insira o Nome Completo' }]}
                            >
                                <Input id="inputNameCompleto" ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <label>CPF</label>
                            <Form.Item name="cpf"
                                rules={[{ required: true, message: 'Por favor, insira o CPF' }]}
                            >

                                <Input id="inputCPF" ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={8} className="marginTop">
                            <label>Email</label>
                            <Form.Item name="email"
                                rules={[{ required: true, message: 'Por favor, insira o Email!' }]}
                            >

                                <Input id="inputEmail" ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={5} className="marginTop">
                            <label>Telefone</label>
                            <Form.Item name="telefone"
                                rules={[{ required: true, message: 'Por favor, insira o Telefone' }]}
                            >

                                <Input
                                    id="inputTelefone"
                                    placeholder="(99) 9 9999-9999"
                                ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={5} className="marginTop">
                            <label>Nascimento</label>
                            <Form.Item name="nascimento"
                                rules={[{ required: true, message: 'Por favor, insira o Nascimento' }]}
                            >

                                <DatePicker defaultValue={dayjs('10/10/1900',dateFormatList[0])} format={dateFormatList} />
                            </Form.Item>
                        </Col>
                        <Col span={4} className="marginTop">
                            <label>Sexo</label>
                            <Form.Item name="sexo"
                                rules={[{ required: true, message: 'Por favor, insira o Sexo' }]}
                            >

                                <Select
                                    id="inputSexo"
                                    defaultValue=""
                                    style={{ width: 133 }}
                                    //onChange={handleChange}
                                    options={[
                                        { value: 'Mulher Cis', label: 'Mulher Cis' },
                                        { value: 'Homen Cis', label: 'Homen Cis' },
                                        { value: 'Não binário', label: 'Não binário' },
                                        { value: 'Homem trans', label: 'Homem trans' },
                                        { value: 'Mulher trans', label: 'Mulher trans' },
                                        { value: 'Gay', label: 'Gay' },
                                        { value: 'Fluído', label: 'Fluído' },
                                        { value: 'Bissexual', label: 'Bissexual' },
                                        { value: 'Agênero', label: 'Agênero' },
                                        { value: 'Bigênero', label: 'Bigênero' },
                                        { value: 'Pangênero', label: 'Pangênero' },
                                        { value: 'Poligênero', label: 'Poligênero' },
                                        { value: 'Neutrois', label: 'Neutrois' },
                                        { value: 'Genderqueer', label: 'Genderqueer' },
                                        { value: 'Não Informar', label: 'Não Informar' },
                                        { value: 'Outro', label: 'Outro' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4} className="marginTop">
                            <label>Estado Civil</label>
                            <Form.Item name="estadoCivil"
                                rules={[{ required: true, message: 'Por favor, insira o Estado Civil!' }]}
                            >

                                <Select
                                    id="inputEstadoCivil"
                                    defaultValue=""
                                    //style={{ width: 109 }}
                                    //onChange={handleChange}
                                    options={[
                                        { value: 'Solteiro(a)', label: 'Solteiro(a)' },
                                        { value: 'Casado(a)', label: 'Casado(a)' },
                                        { value: 'Divorciado(a)', label: 'Divorciado(a)' },
                                        { value: 'Viúvo(a)', label: 'Viúvo(a)' },
                                        { value: 'União estável', label: 'União estável' },
                                        { value: 'Separado(a)', label: 'Separado(a)' },
                                        { value: 'Outro', label: 'Outro' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={7} className="marginTop">
                            <label>Profissão</label>
                            <Form.Item name="profissao"
                                rules={[{ required: true, message: 'Por favor, insira o Profissão!' }]}
                            >

                                <Input id="inputProfissao" ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={6} className="marginTop">
                            <label>Contato de Emergencia</label>
                            <Form.Item name="nomeContatoEmergencia"
                                rules={[{ required: true, message: 'Por favor, insira o Contato de Emergencia!' }]}
                            >

                                <Input id="inputContatoEmergencia" ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={6} className="marginTop">
                            <label>Telefone de Emergencia</label>
                            <Form.Item name="telefoneEmergencia"
                                rules={[{ required: true, message: 'Por favor, insira o Telefone de Emergencia' }]}
                            >

                                <Input
                                    id="inputTelefoneEmergencia"
                                    placeholder="(99) 9 9999-9999"
                                ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={4} className="marginTop">
                            <label>CEP</label>
                            <Form.Item name="cep"
                                rules={[{ required: true, message: 'Por favor, insira o CEP' }]}
                            >

                                <Input id="inputCEP" ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={6} className="marginTop">
                            <label>Estado</label>
                            <Form.Item name="estado"
                                rules={[{ required: true, message: 'Por favor, insira o Estado' }]}
                            >

                                <Select
                                    id="inputEstado"
                                    defaultValue=""
                                    style={{ width: 170 }}
                                    //onChange={handleChange}
                                    options={[
                                        { value: 'AC', label: 'Acre' },
                                        { value: 'AL', label: 'Alagoas' },
                                        { value: 'AP', label: 'Amapá' },
                                        { value: 'AM', label: 'Amazonas' },
                                        { value: 'BA', label: 'Bahia' },
                                        { value: 'CE', label: 'Ceará' },
                                        { value: 'DF', label: 'Distrito Federal' },
                                        { value: 'ES', label: 'Espírito Santo' },
                                        { value: 'GO', label: 'Goiás' },
                                        { value: 'MA', label: 'Maranhão' },
                                        { value: 'MT', label: 'Mato Grosso' },
                                        { value: 'MS', label: 'Mato Grosso do Sul' },
                                        { value: 'MG', label: 'Minas Gerais' },
                                        { value: 'PA', label: 'Pará' },
                                        { value: 'PB', label: 'Paraíba' },
                                        { value: 'PR', label: 'Paraná' },
                                        { value: 'PE', label: 'Pernambuco' },
                                        { value: 'PI', label: 'Piauí' },
                                        { value: 'RJ', label: 'Rio de Janeiro' },
                                        { value: 'RN', label: 'Rio Grande do Norte' },
                                        { value: 'RS', label: 'Rio Grande do Sul' },
                                        { value: 'RO', label: 'Rondônia' },
                                        { value: 'RR', label: 'Roraima' },
                                        { value: 'SC', label: 'Santa Catarina' },
                                        { value: 'SP', label: 'São Paulo' },
                                        { value: 'SE', label: 'Sergipe' },
                                        { value: 'TO', label: 'Tocantins' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6} className="marginTop">
                            <label>Cidade</label>
                            <Form.Item name="cidade"
                                rules={[{ required: true, message: 'Por favor, insira o Cidade' }]}
                            >

                                <Input id="inputCidade" ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={5} className="marginTop">
                            <label>Bairro</label>
                            <Form.Item name="bairro"
                                rules={[{ required: true, message: 'Por favor, insira o Bairro!' }]}
                            >

                                <Input id="inputBairro" ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={8} className="marginTop">
                            <label>Rua</label>
                            <Form.Item name="rua"
                                rules={[{ required: true, message: 'Por favor, insira o Rua!' }]}
                            >

                                <Input id="inputRua" ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={3} className="marginTop">
                            <label>Numero</label>
                            <Form.Item name="numero"
                                rules={[{ required: true, message: 'Por favor, insira o Numero!' }]}
                            >

                                <Input id="inputNumero" ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={6} className="marginTop">
                            <label>Motivo da Consulta</label>
                            <Form.Item name="motivoConsulta"
                                rules={[{ required: true, message: 'Por favor, insira o Motivo da Consulta!' }]}
                            >

                                <Select
                                    id="inputMotivoConsulta"
                                    defaultValue=""
                                    style={{ width: 200 }}
                                    //onChange={handleChange}
                                    options={[
                                        { value: 'Ansiedade', label: 'Ansiedade' },
                                        { value: 'Depressão', label: 'Depressão' },
                                        { value: 'Estresse', label: 'Estresse' },
                                        { value: 'Relacionamentos', label: 'Relacionamentos' },
                                        { value: 'Autoestima', label: 'Autoestima' },
                                        { value: 'Transtornos alimentares', label: 'Transtornos alimentares' },
                                        { value: 'Luto', label: 'Luto' },
                                        { value: 'Fobias', label: 'Fobias' },
                                        { value: 'Traumas', label: 'Traumas' },
                                        { value: 'Dependência química', label: 'Dependência química' },
                                        { value: 'Problemas familiares', label: 'Problemas familiares' },
                                        { value: 'Estresse no trabalho', label: 'Estresse no trabalho' },
                                        { value: 'Desenvolvimento pessoal', label: 'Desenvolvimento pessoal' },
                                        { value: 'Outros', label: 'Outros' },// criar outro campo para ser habilitado
                                    ]}
                                />
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>


            </Modal>
            <Modal
                visible={showCreateResult}
                centered
                footer={null}
            >
                <Result
                    status="success"
                    title="Agendamento realizado com Sucesso!"
                    extra={[
                        <Button id='btnOkDeleteMessage' type="primary" key="ok" onClick={closeCreateMessage}>
                            OK
                        </Button>
                    ]}
                ></Result>
            </Modal>

        </>
    )


}
export default RegisterPatients