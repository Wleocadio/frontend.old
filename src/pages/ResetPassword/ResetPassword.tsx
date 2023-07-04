import { Typography, Button, Col, Form, Input, Row, message } from "antd";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useHistory } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import './ResetPassword.css'
import LayoutComponent from "../Layout/LayoutSlide";
import { useState } from "react";


export const ResetPassword = () => {
    const auth = useAuth();
    const history = useHistory();
    const { Text } = Typography;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const [inputValueEmail, setInputValueEmail] = useState('');

    async function onFinish(values: { email: string, password: string }) {

        //console.log(values.email, values.password + ' onFinish')
        try {

            // await auth.authenticate(values.email, values.password)

            // history.push('/Dashboard');
            //window.location.reload();
        } catch (error) {

            message.error("Credenciais de login inválidas. Por favor, verifique seu email e senha.")
        }
    }

    const validateEmail = (_: any, value: string) => {
        if (!value) {
            return Promise.reject('Por favor, insira seu email!');
        }

        if (!emailRegex.test(value)) {
            return Promise.reject('Por favor, insira um email válido!');
        }

        return Promise.resolve();
    };
    function Login() {
        try {
            history.push('/login');
            window.location.reload();
        } catch (error) {
            message.error("Erro ao carregar a Página de login. Por favor, tente mais tarde.")
        }

    }

    const handleInputChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValueEmail(e.target.value);
    };


    return (
        <LayoutComponent>
            <Form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form >
                            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontSize: '22px' }}
                                >
                                    PLATAWEB
                                </Text>
                            </Form.Item>
                            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Text style={{ color: 'black', fontSize: '13px' }}
                                >
                                    Esqueceu a senha?
                                </Text>
                            </Form.Item>

                            <Form
                                name="normal_login"
                                initialValues={{
                                    remember: true,
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
                                        <Input
                                            id="inputEmail"
                                            prefix={<UserOutlined />}
                                            placeholder="Email"
                                            className="input-login"
                                            value={inputValueEmail}
                                            onChange={handleInputChangeEmail}
                                            style={{ borderRadius: "20px" }} />
                                    </Form.Item>

                                </div>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '250px', marginTop: "1px", borderRadius: "20px" }} >
                                        <Text style={{ color: 'white', fontSize: '12px' }}
                                        >
                                            Continuar
                                        </Text>
                                    </Button>
                                    <div style={{ marginTop: "13px", marginBottom: "20px", textAlign: "center" }}>
                                        <Text style={{ color: 'gray', fontSize: '12px' }}
                                        >
                                            Já tem uma conta? <a onClick={Login}>Entrar</a>
                                        </Text>
                                    </div>
                                </Form.Item>
                            </Form>

                        </Form>
                    </Col>

                </Row>
            </Form>
        </LayoutComponent>
    );

}