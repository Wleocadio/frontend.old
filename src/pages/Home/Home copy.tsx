import React, { useState } from "react";
import { Button, Card, Carousel, Col, Form, Layout, Row, Space, Steps } from "antd";
import "./Home.css"
import { Link, useHistory } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import logo from '../../assets/logoColorida.png'
import imageHome from '../../assets/imageHome3.jpg'
import comoFunciona from '../../assets/comoFunciona2.png'
import facil from '../../assets/facil1.jpg'
import ambiente from '../../assets/ambiente1.jpg'
import flex from '../../assets/flex6.jpg'
import profi from '../../assets/profi1.jpg'
import { Content, Footer } from "antd/es/layout/layout";
import NewsCarousel from "./NewsCarousel";
import nossosProfissionais from '../../assets/nossosProfissionais.jpg'
import NumberButtonCarousel from "./NumberButtonCarousel";

interface SlideContent {
    title: string;
    text: string;
}

const slides: SlideContent[] = [
    { title: "Título 1", text: "Texto do slide 1" },
    { title: "Título 2", text: "Texto do slide 2" },
    { title: "Título 3", text: "Texto do slide 3" },
];

const { Header } = Layout
const { Meta } = Card
const { Step } = Steps;

const Home: React.FC = () => {
    const history = useHistory();
    const [current, setCurrent] = useState<number>(0); // Defina o tipo como 'number'
    const stepTexts = [
        'Texto para o Passo 1',
        'Texto para o Passo 2',
        'Texto para o Passo 3',
    ];

    const buttonTexts = ['1', '2', '3'];
    const explanations = [
        'Explore nossa equipe de psicólogos qualificados e encontre o profissional que melhor atenda às suas necessidades. Navegue pelos perfis e escolha aquele com quem você se identifica.',
        'Após selecionar seu psicólogo, agende facilmente uma data e horário que sejam convenientes para você. Nosso sistema de agendamento online simplifica o processo, permitindo que você reserve sua consulta de forma rápida e eficaz',
        'No dia da sua consulta, conecte-se com o seu psicólogo. Durante a sessão, você terá a oportunidade de discutir seus desafios, compartilhar seus sentimentos e receber orientação profissional para enfrentar suas questões de maneira construtiva.',
    ];

    const onChange = (currentStep: number) => { // Defina o tipo como 'number'
        setCurrent(currentStep);
    };

    const handleButtonClick = () => {
        // Navegar para a Tela Destino
        history.push('/login');
        //return <Login/>
        window.location.reload()
    };




    return (
        <Layout>
            <Header className="classHeaders">
                <Form >
                    <Row gutter={16}>
                        <Col span={1} style={{ display: 'flex', marginLeft: '-2%', justifyContent: 'left', alignItems: 'center' }}>
                            <img src={logo} style={{ width: '60px' }}></img>
                        </Col>
                        <Col span={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
                            <h2 style={{ color: '#15458d' }}>PLATAWEB</h2>
                        </Col>
                        <Col span={8} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop: '5px' }}>
                            <Link to={""} style={{ color: '#2f4f4f', marginRight: '3%', fontSize: '15px', marginTop: '5px' }}>Para Especialistas</Link>
                            <Link to={""} style={{ color: '#2f4f4f', fontSize: '15px', marginTop: '5px' }}>Para Empresas</Link>
                        </Col>
                        <Col span={12} style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', marginTop: '5px' }}>
                            <Link to={""} style={{ color: '#15458d', marginRight: '5%', fontSize: '15px', marginTop: '5px' }}> Agendar Consulta</Link>
                            <Button onClick={handleButtonClick} className="classHeaderButton"> Entrar</Button>
                        </Col>
                    </Row>
                </Form>
            </Header>

            <Layout>
                <Content style={{ backgroundColor: '#fafafa' }}>

                    <Row style={{ marginTop: '4%', marginBottom: '10%' }}>
                        <Col span={2}>

                        </Col>
                        <Col span={11} style={{ display: 'flex', justifyContent: 'left', textAlign: 'center', marginTop: '-5%' }}>
                            <Space>
                                <Row>
                                    <Col style={{ marginLeft: '9px', textAlign: 'left' }}>
                                        <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: '40px', color: '#15458d' }}> Encontre os melhores psicólogos para cuidar</h1>
                                        <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: '40px', marginTop: '-5%' }}>do seu bem-estar.</h1>
                                        <p style={{ marginBottom: '5%', marginTop: '3%' }}>
                                            <span style={{ color: '#555555', fontSize: '19px', fontFamily: 'Sora, sans-serif' }}> Descubra o poder da transformação pessoal através do apoio e orientação dos nossos psicólogos.  <br></br><b>Sua jornada de crescimento começa aqui!</b></span>
                                        </p>

                                        <Form.Item>
                                            <Button className="classHomeButton">Agende uma conversa com a gente</Button>
                                        </Form.Item>

                                    </Col>
                                </Row>
                            </Space>

                        </Col>

                        <Col span={11} className="image-container">
                            <img className="image" src={imageHome} alt="Imagem da Home" ></img>
                        </Col>
                    </Row>
                    <Row style={{ height: '100px', background: '#15458d' }}>
                        <Col span={25} >

                            <NewsCarousel delay={30} />
                        </Col>
                    </Row>
                    <Row style={{ height: '100vh', marginBottom: '10%', background: '#eeeeee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <Col span={2}>
                        </Col>
                        <Col span={11} style={{ display: 'flex', justifyContent: 'center', marginTop: '3%', marginBottom: '5%' }}>
                            <img style={{ width: 'auto', height: 'auto', maxHeight: '350px', borderRadius: '30px' }} src={nossosProfissionais}></img>
                            <label> </label>
                        </Col>

                        <Col span={10} style={{ fontSize: '20px', textAlign: 'left',marginTop: '2%', marginBottom: '5%' }}>
                            <h2> Conheça nossos profissionais</h2>
                            <p style={{ fontFamily: 'Fira Sans', color: '#4E5657' }}>Nossos profissionais são psicólogos<b> altamente qualificados, detentores de graduação e pós-graduação</b>, devidamente registrados no <b>Conselho Regional de Psicologia</b>, o que garante a legalidade e excelência em sua prática profissional.<br></br>
                            </p>
                            <p style={{ fontFamily: 'Fira Sans', color: '#4E5657' }}>
                                Cada especialista em nossa equipe passou por um <b>processo rigoroso de seleção e verificação para assegurar seu credenciamento.</b><br></br> Somos comprometidos em manter os mais elevados padrões de ética e sigilo, garantindo que cada paciente receba um atendimento confidencial e respeitoso.</p>
                            <Button style={{ marginLeft: '25%' }} className="classHomeButton">Procurar Profissional</Button>
                        </Col>



                    </Row>
                    <Row style={{ marginTop: '10%', marginBottom: '10%', background: '#fafafa' }}>

                        <Col span={2}>
                        </Col>
                        <Col span={10} style={{ fontSize: '20px', textAlign: 'left', marginBottom: '5%' }}>
                            <h2> Atendimento online na PLATAWEB</h2>
                            <p style={{ fontFamily: 'Fira Sans', color: '#4E5657' }}>Proporcionamos um ambiente completamente seguro e reservado para suas sessões.
                                <b> Somente você e seu psicólogo terão acesso às informações,</b> garantindo total confidencialidade nas sessões.</p>
                            <p style={{ fontFamily: 'Fira Sans', color: '#4E5657' }}>Através da terapia online,
                                <b> você tem a comodidade de conversar com seu psicólogo de qualquer lugar</b>. Nossa principal prioridade é garantir a
                                sua privacidade e bem-estar ao longo de todo o processo terapêutico.<br></br></p>

                            <Link to={""} className="link-style">Agendar atendimento <ArrowRightOutlined className="arrow-icon" /></Link>
                        </Col>

                        <Col span={11} style={{ display: 'flex', justifyContent: 'center', marginTop: '4%', marginBottom: '5%' }}>
                            <img style={{ width: 'auto', height: 'auto', maxHeight: '400px', borderRadius: '30px' }} src={comoFunciona}></img>

                        </Col>


                    </Row>
                    <Row style={{ height: '100vh', background: '#eeeeee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <Col span={24} style={{ textAlign: 'center', marginBottom:'2%' }}>
                            <h1>Como funciona a terapia na PlataWeb</h1>
                        </Col>

                        <Col span={2}>
                        </Col>
                        <Col span={11} style={{ display: 'flex', alignItems:'center', justifyContent:'center'}}>
                        <NumberButtonCarousel buttonTexts={buttonTexts} explanations={explanations} />
                        </Col>

                        <Col span={11} style={{ display: 'flex', justifyContent: 'center', marginBottom: '5%' }}>
                            <img style={{ width: 'auto', height: 'auto', maxHeight: '350px', borderRadius: '30px' }} src={nossosProfissionais}></img>
                            <label> </label>
                        </Col>



                    </Row>


                    <Row style={{ background: '#3a1c76', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Col style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h2 style={{ color: 'white', fontSize: '35px' }}>Vantagens da Terapia Online</h2>
                        </Col>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'space-evenly' }}>

                            <Card
                                hoverable
                                style={{ marginTop: 150, height: 300, width: 250, background: 'none', border: 'none' }}
                                cover={<img style={{ borderRadius: '20px' }} src={facil}></img>}
                            >

                                <Meta title={<span className="titulo-card">Facil Acesso</span>} description={<span className="descricao-card">Permite que você participe das sessões com qualquer dispositivo e de qualquer lugar.</span>}></Meta>

                            </Card>
                            <Card
                                hoverable
                                style={{ height: 340, width: 250, background: 'none', border: 'none' }}
                                cover={<img style={{ borderRadius: '20px' }} src={flex}></img>}
                            >

                                <Meta title={<span className="titulo-card">Flexibilidade de Horário</span>} description={<span className="descricao-card">As sessões geralmente oferecem maior flexibilidade de horário, incluindo noites e fins de semana.</span>}></Meta>

                            </Card>
                            <Card
                                hoverable
                                style={{ height: 300, width: 250, background: 'none', border: 'none' }}
                                cover={<img style={{ borderRadius: '20px' }} src={profi}></img>}
                            >

                                <Meta title={<span className="titulo-card">Variedades de Psicólogos</span>} description={<span className="descricao-card">Você tem acesso a diversos psicólogos de diferentes abordagens.</span>}></Meta>

                            </Card>
                            <Card
                                hoverable
                                style={{ marginTop: 150, marginBottom: '5%', height: 300, width: 250, background: 'none', border: 'none' }}
                                cover={<img style={{ borderRadius: '20px' }} src={ambiente}></img>}
                            >

                                <Meta title={<span className="titulo-card">Ambiente Familiar</span>} description={<span className="descricao-card">Um ambiente familiar ajudar a se sentir mais a vontade e abertos durante as sessões</span>}></Meta>

                            </Card>
                        </Col>

                    </Row>
                    <Row style={{ height: '100vh', background: '#eeeeee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    </Row>



                </Content>
            </Layout>
            <Footer style={{ display: 'flex', justifyContent: 'center' }}>
                <h1> Rodapé</h1>
            </Footer>


        </Layout>
    )
}

export default Home 