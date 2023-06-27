//import React from "react";

import {  Col, Form, Row, Typography} from "antd";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";



export const ProtectedLayout = ({children}: {children: JSX.Element}) =>{
    const auth = useAuth();
    const {Text} = Typography;
    const history = useHistory()
    const tempoTotal = 5

    useEffect(() => {
        atualizarContador(tempoTotal);
      }, []);

   function redirecionarPagina(){
    history.push('/login');
            window.location.reload();
   }

   function atualizarContador(segundos: number){
    const contatorElemento = document.getElementById("contador");
   

    if(contatorElemento){
            contatorElemento.textContent = `Redirecionando em ${segundos} segundos...`;

    if (segundos > 0 ) {
        setTimeout(()=>{
            atualizarContador(segundos - 1)
        },1000);
    }else {
        redirecionarPagina()
    }
    }
   }
   
   //atualizarContador(tempoTotal)

    if (!auth.mail || !auth.token) {
        
        return (
            <div style={{ justifyContent:'center', backgroundColor: "#f0f0f0", height: "100vh" }}>
    
                <Row justify="center" align="middle" style={{ height: "100%" }}>
                    <Col span={5}>
                        <div className="form-Protected">
                            <div style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}>
                                <Text style={{ color: 'black', fontSize: '22px' }}
                                >
                                    Por favor Aguarde!
                                </Text>
                            </div>
                            <div style={{ marginTop: "30px", textAlign: "center" }}>
                                
                                    <div id="contador"></div>
                                
                            </div>
                            <div style={{ marginTop: "10px", marginBottom: "20px", textAlign: "center" }}>
    
                                <Form
                                    name="normal_login"
                                    initialValues={{
                                        remember: true,
                                    }}
                                 
                                >      
                                  
                                </Form>
                            </div>
                        </div>
                    </Col>
    
                </Row>
            </div>
        )
        
    }


    return children;
}