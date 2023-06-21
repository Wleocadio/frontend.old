import { Button, Col, Form, Input, Row, message } from "antd";
import { useAuth } from "../../../context/AuthProvider/useAuth";
import { Link, useHistory } from "react-router-dom";



export const Login = () => {
    const auth = useAuth();
    const history = useHistory();

    async function onFinish(values: { email: string, password: string }) {

        console.log(values.email, values.password + ' onFinish')
        try {

            await auth.authenticate(values.email, values.password)

            history.push('/profile');
            window.location.reload();
        } catch (error) {

            message.error("Email ou Senha inválido")
        }
    }


    return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
        
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <Col span={8}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Por favor, insira seu email!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Senha"
                        name="password"
                        rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Entrar
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="link" htmlType="button">
                            <Link to="/recover-password">Recuperar senha</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>

    

        <footer style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
            <p>Links úteis:</p>
            <ul>
                <li>
                    <a href="https://www.example1.com">Exemplo 1</a>
                </li>
                <li>
                    <a href="https://www.example2.com">Exemplo 2</a>
                </li>
                <li>
                    <a href="https://www.example3.com">Exemplo 3</a>
                </li>
            </ul>
        </footer>
    </div>
    );

}