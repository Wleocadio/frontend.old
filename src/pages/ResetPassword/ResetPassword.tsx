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


    return (
        <div style={{ backgroundColor: "#f0f0f0", height: "100vh" }}>

            <Row justify="center" align="middle" style={{ height: "100%" }}>
                <Col span={5}>
                    <div className="form-container2">
                        <div style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}>
                            <Text style={{ color: 'black', fontSize: '22px' }}
                            >
                                Recuperação de Senha
                            </Text>
                        </div>
                        <div style={{ marginTop: "10px", marginBottom: "20px", textAlign: "center" }}>
                            <Text style={{ color: 'black', fontSize: '15px' }}
                            >
                                Para recuperar sua senha, informe seu enredeço de email cadastrado em nosso sistema,
                                enviaremos um link para a alteração da senha.
                            </Text>
                        </div>
                        <div style={{ marginTop: "10px", marginBottom: "20px", textAlign: "center" }}>

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
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" >
                                        Enviar
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Col>

            </Row>
        </div>
    );

}