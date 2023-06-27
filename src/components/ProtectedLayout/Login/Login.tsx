import { Typography, Button, Checkbox, Col, Form, Input, Row, message } from "antd";
import { useAuth } from "../../../context/AuthProvider/useAuth";
import { useHistory, Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import './login.css'
import { useState } from "react";

export const Login = () => {
    const auth = useAuth();
    const history = useHistory();
    const { Text } = Typography;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    //const [rememberMe] = useState(false)

    const savedUser = localStorage.getItem("ue");
    const savedPass = localStorage.getItem("up");
    const [rememberMe] = useState(!!(savedUser && savedPass));

    async function onFinish(values: { email: string, password: string, remember: boolean }) {
        const {email, password, remember} = values

        if (remember) {
            localStorage.setItem("ue", email)
            localStorage.setItem("up", password)
        }

        //console.log(values.email, values.password + ' onFinish')
        try {

            await auth.authenticate(values.email, values.password)

            history.push('/Dashboard');
            window.location.reload();
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

      function resetPassword() {
        try {
            history.push('/ResetPassword');
            window.location.reload();
        } catch (error) {
            message.error("Erro ao carregar a Página. Por favor, tente mais tarde.")
        }
        
      }


    return (
        <div style={{ backgroundColor: "#f0f0f0", height: "100vh" }}>

            <Row justify="center" align="middle" style={{ height: "100%" }}>
                <Col span={4}>
                <div className="form-container-login">
                    <div style={{ marginTop: "15px", marginBottom: "40px", textAlign: "center" }}>
                        <Text style={{ color: 'black', fontSize: '19px' }}
                        >
                            Faça login em sua conta
                        </Text>
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: rememberMe,
                            email: savedUser,
                            password: savedPass
                        }}
                        onFinish={onFinish}
                    >

                        <Form.Item


                            name="email"
                            rules={[
                                {
                                    validator: validateEmail,
                                },
                            ]}
                        >
                            <Input id="imputEmail" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
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
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"

                            />

                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox id="checkboxLembrar-me" >Lembrar-me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="" onClick={resetPassword}>
                                Esqueci minha senha
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{marginBottom:"10px"}} >
                                Entrar
                            </Button>
                            Ou <a href=""  >Registre-se agora!</a>
                        </Form.Item>
                    </Form>
                    </div>
                </Col>
                
            </Row>
        </div>
    );

}