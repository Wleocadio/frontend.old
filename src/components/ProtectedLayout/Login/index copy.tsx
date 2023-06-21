import { Button, Col, Form, Input, Row, message } from "antd";
import { useAuth } from "../../../context/AuthProvider/useAuth";
import { useHistory } from "react-router-dom";


export const Login = () => {
    const auth = useAuth();
    const history = useHistory();

    async function onFinish(values: {email: string, password: string}) {
       
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
        <Row
            justify='center'
            align='middle'
            style={{
                height: '100vh'
            }}
        >
            <Col span={19}>
                <Form
                    name='basic'
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label='Email'
                        name='email'
                        
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label='Password'
                        name='password'
                        
                        
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 10, span:16}}>
                        <Button type="primary" htmlType="submit">
                            Sign In
                        </Button>
                    </Form.Item>


                </Form>

            </Col>
        </Row>
    )
}