import { Typography, Button, Col, Form, Input, Row, message } from "antd";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useHistory } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import './ResetPassword.css'


export const ResetPassword = () => {
    const auth = useAuth();
    const history = useHistory();
    const { Text } = Typography;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

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


    return (
        <div style={{ backgroundColor: "#f0f0f0", height: "100vh" }}>

            <Row justify="center" align="middle" style={{ height: "100%" }}>
                <Col span={5}>
                    <div className="form-reset">
                        <div style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}>
                            <Text style={{ color: 'black', fontSize: '22px' }}
                            >
                                Esqueceu sua senha?
                            </Text>
                        </div>
                        <div style={{ marginTop: "10px", marginBottom: "25px", textAlign: "center" }}>
                            <Text style={{ color: 'black', fontSize: '13px' }}
                            >
                                Enviaremos um link para a alteração da senha.
                            </Text>
                        </div>
                        <div style={{ marginTop: "10px", marginBottom: "10px", textAlign: "center" }}>

                            <Form
                                name="normal_login"
                                initialValues={{
                                    remember: true,
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
                                    <Input id="inputEmail" prefix={<UserOutlined/>} placeholder="Email" style={{ width: '250px' }}/>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ width: '250px', marginTop: "1px"}} >
                                    <Text style={{ color: 'white', fontSize: '12px' }}
                                        >
                                        Enviar email para recuperar senha
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
                        </div>
                    </div>
                </Col>

            </Row>
        </div>
    );

}