import { Typography, Button, Checkbox, Col, Form, Input, Row, message } from "antd";
import { useAuth } from "../../../context/AuthProvider/useAuth";
import { useHistory } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import './login.css'
import { useState } from "react";
import LayoutComponent from "../../../pages/Layout/LayoutSlide";
import Dashboard from "../../../pages/Dashboard/Dashboard";
import LayoutPrincipal from "../../../pages/Layout/Layout";


export const Login = () => {
    const auth = useAuth(); // Obtém o objeto de autenticação do contexto
    const history = useHistory();// Obtém o objeto de histórico de navegação do React Router
    const { Text } = Typography; // Desestrutura a propriedade Typography do objeto importado
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    //const [rememberMe] = useState(false)
    const [inputValueEmail, setInputValueEmail] = useState('');// Estado para armazenar o valor do campo de email
    const [inputValuePassword, setInputValuePassword] = useState(''); // Estado para armazenar o valor do campo de senha
    const savedUser = localStorage.getItem("ue"); // Obtém o valor armazenado no localStorage com a chave "ue"
    const savedPass = localStorage.getItem("up");// Obtém o valor armazenado no localStorage com a chave "up"
    const [isChecked, setIsChecked] = useState(true); // Estado para armazenar o valor do checkbox "Lembrar-me"
    const [loggedIn, setLoggedIn] = useState(false);

    async function onFinish(values: { email: string, password: string, remember: boolean }) {
        const { email, password} = values
        console.log(email, password, isChecked)
        if (isChecked) {
            localStorage.setItem("ue", email); // Armazena o email no localStorage com a chave "ue"
            localStorage.setItem("up", password); // Armazena a senha no localStorage com a chave "up"
        }

        //console.log(values.email, values.password + ' onFinish')
        try {

            await auth.authenticate(values.email, values.password) // Chama a função de autenticação fornecida pelo objeto auth

           // history.push('/Dashboard'); // Redireciona o usuário para a página "/Dashboard"
            setLoggedIn(true);
           // window.location.reload(); // Recarrega a página
        } catch (error) {
            message.error("Credenciais de login inválidas. Por favor, verifique seu email e senha."); // Exibe uma mensagem de erro
        }
    }

    if (loggedIn) {
        history.push('/dashboard');
        return <LayoutPrincipal content={<Dashboard/>}/>
    }

    const validateEmail = (_: any, value: string) => {
        console.log(value)
        if (!value) {
            return Promise.reject('Por favor, insira seu endereço de email.');
        }

        if (!emailRegex.test(value)) {
            return Promise.reject('Por favor, insira um email válido.');
        }

        return Promise.resolve();
    };

    function resetPassword() {
        try {
            history.push('/ResetPassword'); // Redireciona o usuário para a página de redefinição de senha
            window.location.reload(); // Recarrega a página
        } catch (error) {
            message.error("Erro ao carregar a Página. Por favor, tente mais tarde."); // Exibe uma mensagem de erro
        }
    }

    const handleInputChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValueEmail(e.target.value);// Atualiza o estado com o valor digitado no campo de email
    };
    const handleInputChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValuePassword(e.target.value); // Atualiza o estado com o valor digitado no campo de senha
    };

    return (
        <LayoutComponent>
            <Row gutter={[16, 16]} className="form-container-login">
                <Col span={10}>
                    <Form.Item style={{ marginBottom: "10px" }}>

                        <Text style={{ color: 'black', fontSize: '25px' }}
                        >
                            PLATAWEB
                        </Text>

                    </Form.Item>

                    <Form.Item style={{ marginBottom: "10px" }}>
                        <Text style={{ color: 'gray', fontSize: '11px' }}
                        >
                            Acesse sua conta para continuar
                        </Text>

                    </Form.Item>

                    <Form

                        name="normal_login"
                        initialValues={{
                            email: savedUser,
                            password: savedPass
                        }}
                        onFinish={onFinish}
                    >

                        <div className="input-container">
                            <label className={`input-label ${inputValueEmail && 'input-label-up'}`}>
                                Email:
                            </label>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        validator: validateEmail,
                                    },
                                ]}
                            >
                                <Input id="inputEmail"
                                    className="input-login"
                                    prefix={<UserOutlined />} placeholder="Email"
                                    value={inputValueEmail}
                                    onChange={handleInputChangeEmail}
                                    style={{ borderRadius: "20px" }}
                                />
                            </Form.Item>
                        </div>

                        <div className="input-container">
                            <label className={`input-label ${inputValuePassword && 'input-label-up'}`}>
                                Senha:
                            </label>
                            <Form.Item

                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Por favor, insira sua senha!",
                                    },
                                ]}
                            >
                                <Input.Password
                                    id="inputPassword"
                                    prefix={<LockOutlined />}
                                    className="input-login"
                                    type="password"
                                    placeholder="Senha"
                                    value={inputValuePassword}
                                    onChange={handleInputChangePassword}
                                    style={{ borderRadius: "20px" }}

                                />

                            </Form.Item>

                            <Row style={{ marginTop: '-5%', marginBottom: '5%' }}>
                                <Col span={12} style={{ display: 'flex' }}>
                                    <Checkbox
                                        id="checkboxLembrar-me"
                                        style={{ marginLeft: '3%', color: '#5eb0f8' }}
                                        checked={isChecked}
                                        onChange={(e) => setIsChecked(e.target.checked)}
                                    >
                                        Lembrar-me</Checkbox>
                                </Col>

                                <Col span={12}>
                                    <a href="" onClick={resetPassword} style={{ fontSize: '12px', color: '#5eb0f8' }}>
                                        Esqueci minha senha?
                                    </a>
                                </Col>

                            </Row>

                        </div>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginBottom: "10px", borderRadius: "20px" }} >
                                Conituar
                            </Button>
                        </Form.Item>
                    </Form>

                </Col>

            </Row>
        </LayoutComponent>
    );

}