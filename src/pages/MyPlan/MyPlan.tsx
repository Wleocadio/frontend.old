import { Button, Card, Checkbox, Col, Form, Input, Modal, Result, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import basic from '../../components/Images/basic.png'
import intermediario from '../../components/Images/intermediario.png'
import pro from '../../components/Images/pro.png'
import { useAuth } from "../../context/AuthProvider/useAuth";
import { getProfessionalId } from "../../context/AuthProvider/util";
import { BarcodeOutlined, CreditCardOutlined, DollarOutlined } from "@ant-design/icons";


interface Professional {
    _id: string;
    myPlan: string;

}

const { TabPane } = Tabs;

const MyPlan: React.FC = () => {

    const auth = useAuth()
    const token = auth.token || '';
    const id = (auth.id || '').toString();
    const { Meta } = Card;
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [defaultPlan, setDefaultPlan] = useState<string | null>(null);
    const [professional, setProfessional] = useState<Professional | null>(null);
    const [showPayments, setShowPayments] = useState(false);
    const [inputCvc, setInputCvc] = useState("");



    useEffect(() => {

        const fetDataProfessional = async () => {
            try {
                const professionalData = await getProfessionalId(token, id)
                setProfessional(professionalData.professionalId)

                if (professionalData.professionalId) {
                    setDefaultPlan(professionalData.professionalId.myplan);

                    if (selectedCard === null) {
                        setSelectedCard(professionalData.professionalId.myPlan);
                    }
                }




            } catch (error) {
                console.error("Erro ao buscar o Profissional", error)
            }
        }
        fetDataProfessional();

    }, []);

    console.log(professional)
    //console.log(selectedCard)



    const handleCardClick = (cardId: string) => {
        if (cardId === selectedCard) {
            console.log('Plano Selecionado')

        } else {
            setShowPayments(true)
        }
    };
    const closeSaveMessage = () => {
        setShowPayments(false)
        //history.push('/schedule');
        //window.location.reload()
    }






    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1> Nossos Planos e Ofertas</h1>
            </div>

            <Form style={{ display: 'flex', marginTop: '3%', justifyContent: 'center', alignItems: 'center', justifyItems: 'center' }}>

                <Col span={21} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', justifyItems: 'center' }}>

                    <Card
                        hoverable
                        style={{ width: 240, height: 330, border: (selectedCard === 'basicPlan' || defaultPlan === 'basicPlan') ? '2px solid blue' : 'none' }}
                        cover={<img src={basic} alt="Básico" />}
                        onClick={() => handleCardClick('basicPlan')}
                        className={(selectedCard === 'basicPlan' || defaultPlan === 'basicPlan') ? 'selected' : ''}
                    >

                    </Card>

                    <Card
                        hoverable
                        style={{ width: 240, height: 330, border: (selectedCard === 'intermediatePlan' || defaultPlan === 'intermediatePlan') ? '2px solid blue' : 'none' }}
                        cover={<img src={intermediario} alt="Intermediário" />}
                        onClick={() => handleCardClick('intermediatePlan')}
                        className={(selectedCard === 'intermediatePlan' || defaultPlan === 'intermediatePlan') ? 'selected' : ''}
                    >

                    </Card>

                    <Card
                        hoverable
                        style={{ width: 240, height: 330, border: (selectedCard === 'proPlan' || defaultPlan === 'proPlan') ? '2px solid blue' : 'none' }}
                        cover={<img src={pro} alt="Pró" />}
                        onClick={() => handleCardClick('proPlan')}
                        className={(selectedCard === 'proPlan' || defaultPlan === 'proPlan') ? 'selected' : ''}
                    >

                    </Card>



                </Col>
            </Form>

            <Modal
                open={showPayments}
                centered
                onCancel={closeSaveMessage}
                footer={[

                    <Button key="finalizar" type="primary" onClick={closeSaveMessage}>
                        Finalizar
                    </Button>,

                ]}

                maskClosable={false}
            >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Form style={{ display: 'flex', width: '500px', justifyContent: 'center', alignItems: 'center' }}>
                        <Row gutter={[16, 25]} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                                <h2>Formas de Pagamento</h2>
                            </Col>
                            <Col span={24} >
                                <Tabs style={{ display: 'flex', justifyContent: 'center' }} centered>
                                    <TabPane
                                        tab={
                                            <span>
                                                <CreditCardOutlined />
                                                <span>Cartão</span>
                                            </span>
                                        }
                                        key="cartao"
                                        style={{ height: '270px' }}
                                    >
                                        <Card
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                flexDirection: "column",

                                            }}
                                        >
                                            <Row gutter={16} >
                                                <Col span={24} style={{marginTop:'-4%'}}>
                                                    <label htmlFor="experiencias">Número do Cartão</label>
                                                    <Form.Item>
                                                        <Input style={{ height: '40px' }} placeholder="Número do Cartão"></Input>
                                                    </Form.Item>

                                                </Col>

                                                <Col span={12} style={{marginTop:'-3%'}}>
                                                    <label htmlFor="experiencias">Vencimento</label>
                                                    <Form.Item>
                                                        <Input style={{ height: '40px' }} placeholder="MM / yy"></Input>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12} style={{marginTop:'-3%'}}>
                                                    <label htmlFor="experiencias">CVC</label>
                                                    <Form.Item>
                                                        <Input style={{ height: '40px' }} placeholder="CVC"
                                                        ></Input>

                                                    </Form.Item>

                                                </Col>

                                                <Col span={24} style={{marginTop:'-3%'}}>
                                                    <label htmlFor="experiencias">Nome no cartão</label>
                                                    <Form.Item>
                                                        <Input style={{ height: '40px' }} placeholder="Nome no cartão"></Input>
                                                    </Form.Item>

                                                </Col>
                                                <Col span={24} style={{marginTop:'-3%', marginBottom:'-8%'}} >
                                                    <label htmlFor="experiencias">CPF</label>
                                                    <Form.Item>
                                                    <Input style={{ height: '40px' }} placeholder="CPF"></Input>
                                                    </Form.Item>
                                                    
                                                </Col>

                                            </Row>
                                        </Card>
                                    </TabPane>
                                    <TabPane
                                        tab={
                                            <span>
                                                <DollarOutlined />
                                                <span>Pix</span>
                                            </span>
                                        }
                                        key="pix"
                                        style={{ height: '270px' }}
                                    >
                                        <Card
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                flexDirection: "column",

                                            }}
                                        >
                                            <Row gutter={[16, 25]}>
                                                <Col span={24}>
                                                    <Input style={{ height: '60px' }} placeholder="Chave PIX"></Input>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </TabPane>
                                    <TabPane
                                        tab={
                                            <span>
                                                <BarcodeOutlined />
                                                <span>Boleto</span>
                                            </span>
                                        }
                                        key="boleto"
                                        style={{ height: '270px' }}
                                    >
                                        <Card
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Row gutter={[16, 25]}>
                                                <Col span={24}>
                                                    <Input style={{ height: '60px' }} placeholder="Número do Boleto"></Input>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>



        </div>
    )


}

export default MyPlan;
