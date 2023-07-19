import { Card, Checkbox, Col, Form, Row } from "antd";
import React, { useState } from "react";
import basic from '../../components/Images/basic.png'
import intermediario from '../../components/Images/intermediario.png'
import pro from '../../components/Images/pro.png'
import { Header } from "antd/es/layout/layout";



const MyPlan: React.FC = () => {

    const { Meta } = Card;
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    const handleCardClick = (cardId: string) => {
        if (selectedCard === cardId) {
            setSelectedCard(null);
        } else {
            setSelectedCard(cardId);
        }
    };

    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1> Nossos Planos e Ofertas</h1>
            </div>

            <Form style={{ display: 'flex', marginTop: '3%', justifyContent: 'center', alignItems: 'center', justifyItems: 'center' }}>

                <Col span={21} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', justifyItems: 'center' }}>

                    <Card
                        hoverable
                        style={{ width: 240, height: 330, border: selectedCard === 'basic' ? '2px solid blue' : 'none' }}
                        cover={<img src={basic} alt="Básico" />}
                        onClick={() => handleCardClick('basic')}
                        className={selectedCard === 'basic' ? 'selected' : ''}
                    >

                    </Card>

                    <Card
                        hoverable
                        style={{ width: 240,height: 330, border: selectedCard === 'intermediario' ? '2px solid blue' : 'none' }}
                        cover={<img src={intermediario} alt="Intermediário" />}
                        onClick={() => handleCardClick('intermediario')}
                        className={selectedCard === 'intermediario' ? 'selected' : ''}
                    >

                    </Card>

                    <Card
                        hoverable
                        style={{ width: 240, height: 330, border: selectedCard === 'pro' ? '2px solid blue' : 'none' }}
                        cover={<img src={pro} alt="Professional" />}
                        onClick={() => handleCardClick('pro')}
                        className={selectedCard === 'pro' ? 'selected' : ''}
                    >

                    </Card>



                </Col>
            </Form>




        </div>
    )


}

export default MyPlan;
