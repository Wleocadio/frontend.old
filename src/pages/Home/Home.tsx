import React from "react";
import { Button, Col, Form, Layout, Row } from "antd";
import "./Home.css"
import { Link, useHistory } from "react-router-dom";
import { Login } from "../../components/ProtectedLayout/Login/Login";
import { ArrowRightOutlined } from "@ant-design/icons";
import logo from '../../assets/logoColorida.png'


const { Header } = Layout

const Home: React.FC = () => {
    const history = useHistory();

    const handleButtonClick = () => {
        // Navegar para a Tela Destino
        history.push('/login');
        //return <Login/>
        window.location.reload()
      };


    return (
        <div>
            <Header className="classHeaders">
               <Form>
                <Row gutter={16}>
                    <Col span={1} style={{display:'flex', justifyContent:'left', alignItems:'center'}}>
                    <img src={logo} style={{width:'60px' }}></img>
                    </Col>
                    <Col span={3} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <h2>PLATAWEB</h2>
                    </Col>
                    <Col span={8} style={{display:'flex', justifyContent:'left', alignItems:'center'}}>
                    <Link to={""} style={{color:'#2f4f4f', marginRight:'3%'}}>Para Especialistas</Link>
                    <Link to={""} style={{color:'#2f4f4f'}}>Para Empresas</Link>
                    </Col>
                    <Col span={12} style={{display:'flex', justifyContent:'right', alignItems:'center'}}>
                    <Link to={""} style={{color:'#23a6f0', marginRight:'5%'}}> Agendar Consulta</Link>
                    <Button onClick={handleButtonClick} style={{backgroundColor:'#23a6f0', color:'white'}}> Entrar <ArrowRightOutlined /></Button>
                    
                    </Col>
                    
                </Row>

               </Form>
              
                    
                     

            </Header>
        </div>

    )
}

export default Home 