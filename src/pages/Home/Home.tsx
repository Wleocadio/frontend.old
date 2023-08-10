import React, { useState } from "react";
import { AutoComplete, Button, Card, Col, Form, Input, Layout, Row, Select, Steps, Tag } from "antd";
import "./Home.css"
import { Link, useHistory } from "react-router-dom";
import { ArrowRightOutlined, FieldTimeOutlined, LikeOutlined, ScheduleOutlined, SearchOutlined } from "@ant-design/icons";
import logo from '../../assets/logoColorida.png'
import comoFunciona from '../../assets/comoFunciona2.png'
import facil from '../../assets/facil1.jpg'
import ambiente from '../../assets/ambiente1.jpg'
import flex from '../../assets/flex6.jpg'
import profi from '../../assets/profi1.jpg'
import { Content, Footer } from "antd/es/layout/layout";
import nossosProfissionais from '../../assets/nossosProfissionais.jpg'
import vocacional from '../../assets/vocacional_home.png';
import psicanalista from '../../assets/psicoanalisis_home.png';
import psicologiaInfantil from '../../assets/psicologiaInfantil_home.png';
import terapiaCasal from '../../assets/terapiaPareja_home.png';
import terapiaDepressao from '../../assets/depresion_home.png';
import NumberButtonCarousel from "./NumberButtonCarousel";



interface SlideContent {
    title: string;
    text: string;
}

const preDefinedOptions = [
    'Abordagem psicológica', 'Agressividade', 'Alcoolismo', 'Angústia', 'Anorexia', 'Anorgasmia', 'Ansiedade', 'Assédio moral',
    'Assertividade', 'Atendimento de urgência', 'Autismo', 'Autoestima', 'Avaliação neuropsicológica', 'Bulimia', 'Bullying',
    'Burnout', 'Ciúmes', 'Coaching', 'Crise existencial', 'Dependência emocional', 'Depressão', 'Desenvolvimento pessoal',
    'Dificuldades de aprendizagem', 'Disfunção erétil', 'Dislexia', 'Drogas', 'Ejaculação precoce', 'Fobia', 'Fracasso escolar',
    'Gestalt terapia', 'Habilidades sociais', 'Hipersexualidade', 'Hipnose', 'Hipocondria', 'Histeria', 'Insônia', 'Liderança',
    'Ludopatia', 'Luto', 'Maus-tratos', 'Mindfulness', 'Motivação', 'Neurose', 'Orientação profissional', 'Orientação sexual',
    'Pânico', 'Perversão', 'Problemas psicológicos', 'Psicanálise', 'Psicologia clínica', 'Psicologia da educação',
    'Psicologia do esporte', 'Psicologia do trânsito', 'Psicologia forense', 'Psicologia humanista', 'Psicologia infantil',
    'Psicologia online', 'Psicologia perinatal', 'Psicologia social', 'Psicopedagogia', 'Psicose', 'Psicoterapias', 'Regressão',
    'Separação', 'Sonambulismo', 'Stress', 'Superdotados', 'Tabagismo', 'TDAH', 'Terapia cognitivo-comportamental', 'Terapia de casal',
    'Terapia de grupo', 'Terapia familiar', 'Terapia sexual', 'Teste de personalidade', 'Teste psicotécnico', 'Teste QI',
    'Teste vocacional', 'Testes psicológicos', 'Timidez', 'TOC', 'Transtorno bipolar', 'Transtornos alimentares', 'Transtornos da fala',
    'Transtornos personalidade', 'Traumas', 'Vaginismo', 'Violência de gênero', 'Violência psicológica', 'Violência sexual'
    // Adicione mais opções conforme necessário
];
const { Header } = Layout
const { Meta } = Card

const Home: React.FC = () => {
    const history = useHistory();
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | undefined>(undefined);

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const handleSelect = (value: string) => {
        setSearchValue(value);
        setSelectedSpecialty(value);
    };


    const filteredOptions = preDefinedOptions.filter(option =>
        option.toLowerCase().includes(searchValue?.toLowerCase() || '')
    );

    const options = filteredOptions.map(option => ({ value: option }));



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
                            <h2 style={{ color: '#ffffff' }}>PLATAWEB</h2>
                        </Col>
                        <Col span={8} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop: '5px' }}>
                            <Link to={""} style={{ color: '#ffffff', marginRight: '3%', fontSize: '15px', marginTop: '5px' }}>Para Especialistas</Link>
                            <Link to={""} style={{ color: '#ffffff', fontSize: '15px', marginTop: '5px' }}>Para Empresas</Link>
                        </Col>
                        <Col span={12} style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', marginTop: '5px' }}>
                            <Link to={""} style={{ color: '#ffffff', marginRight: '5%', fontSize: '15px', marginTop: '5px' }}> Agendar Consulta</Link>
                            <Button onClick={handleButtonClick} className="classHeaderButton"> Entrar</Button>
                        </Col>
                    </Row>
                </Form>
            </Header>

            <Layout>
                <Content style={{ backgroundColor: '#ffffff' }}>

                    <Row className="classContent" style={{ marginTop: '-6%', height: '550px' }}>
                        <Col span={24} style={{ flexDirection: 'column', textAlign: 'center', marginTop: '10%' }}>
                            <h1 style={{ fontFamily: 'Roboto', fontSize: '45px', color: '#ffffff', marginBottom: '0px' }}> Encontre seu Psicólogo</h1>
                            <p>
                                <span style={{ color: '#d4d4d4', fontSize: '16px', fontFamily: 'Roboto' }}><b>Descubra o poder da transformação pessoal através do apoio e orientação dos nossos profissionais!</b></span>
                            </p>
                        </Col>
                        <Col span={24} style={{ marginTop: '-90px', display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>

                            <Form.Item name="procurarPacient" style={{ height: '50px', maxWidth: '600px', marginRight: '3px' }}>
                                <AutoComplete
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    onSelect={handleSelect}
                                    options={options}
                                    style={{ width: 600, height: 50 }}
                                    dropdownMatchSelectWidth={false}
                                    className="custom-autocomplete"
                                >
                                    <Input
                                        placeholder="Escolha um psicólogo por especialidade"

                                        style={{ height: 50 }}
                                    />
                                </AutoComplete>
                            </Form.Item>
                            <Button className="classHomeButton"><SearchOutlined />Pesquisar</Button>
                        </Col>


                    </Row>
                    <Row style={{ marginTop: '-2%', display: 'flex', justifyContent: 'center', height: '160px', marginBottom: '7%' }}>
                        <Col span={20} style={{ display: 'flex', justifyContent: 'space-evenly', background: '#dadada', borderRadius: '15px' }}>
                            <Col span={5}>
                                <h2 style={{ fontSize: '20px' }}><SearchOutlined style={{ marginRight: '2%' }} />Encontre especialistas</h2>
                                <p>Busque por especialistas de saúde em sua região. Filtre por planos de saúde, tratamentos ou disponibilidade.</p>
                            </Col>
                            <Col span={5}>

                                <h2 style={{ fontSize: '20px' }}><ScheduleOutlined style={{ marginRight: '2%' }} />Marque consultas</h2>
                                <p>Escolha o profissional, dia e horário que desejar, agendando sua consulta em até dois minutos. Sem complicação.</p>

                            </Col>
                            <Col span={5}>

                                <h2 style={{ fontSize: '20px' }}><FieldTimeOutlined style={{ marginRight: '2%' }} />Receba lembretes</h2>
                                <p>Confirmamos tudo imediatamente pelo email informado e, antes da consulta, um lembrete será enviado via celular.</p>

                            </Col>
                            <Col span={5}>

                                <h2 style={{ fontSize: '20px' }}><LikeOutlined style={{ marginRight: '2%' }} />Avalie o serviço</h2>
                                <p>Após a consulta você poderá deixar sua opinião sobre o serviço. Tudo isso de forma gratuita, simples e rápida.</p>

                            </Col>
                        </Col>


                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'center', background: '#ffffff', marginBottom: '150px' }}>
                        <div style={{ height: '560px', width: '1351px' }}>
                            <Col span={24} style={{ textAlign: 'center', marginBottom: '5%' }}>
                                <h2 style={{ fontSize: '30px', color: '#243953' }}>Tratamentos Psicológicos</h2>
                                <p style={{ fontSize: '18px', fontFamily: 'Source Sans Pro, sans-serif', color: '#7093af' }}>Terapias psicológicas mais solicitadas pelos usuários.</p>
                            </Col>
                            <Row gutter={[0, 8]} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Col className="image-col-destaque" style={{ width: '552px' }}>


                                    <img className="hover-image" src={psicologiaInfantil}></img>
                                    <div className="overlay" style={{ marginLeft: '1%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                        <h4 style={{ marginTop: '0px', marginBottom: '-2%' }}>Psicólogos online</h4>
                                        <p>Psicólogos com vasta experiencia em atendimento online</p>
                                        <Button style={{ marginTop: '10%', width: '200px' }} className="classHomeButton">Encontre seu psicólogo</Button>
                                    </div>

                                </Col>
                                <Col span={10} style={{ display: 'flex', }}>
                                    <Row gutter={[0, 8]} style={{ display: 'flex', justifyContent: 'left' }}>
                                        <Col className="image-col">
                                            <Link to="/pagina-de-destino">
                                                <div className="image-container">
                                                    <img className="hover-image" src={psicologiaInfantil} alt="Imagem 1" />
                                                    <div className="overlay">
                                                        <p>Psicologia <br></br> Infantil</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Col>
                                        <Col className="image-col">
                                            <Link to="/pagina-de-destino">
                                                <div className="image-container">
                                                    <img className="hover-image" src={vocacional}></img>
                                                    <div className="overlay">
                                                        <p>Teste <br></br> Vocacional</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Col>
                                        <Col className="image-col">
                                            <Link to="/pagina-de-destino">
                                                <div className="image-container">
                                                    <img className="hover-image" src={psicologiaInfantil}></img>
                                                    <div className="overlay">
                                                        <p>Psicologia <br></br> Infantil</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Col>
                                        <Col className="image-col">
                                            <Link to="/pagina-de-destino">
                                                <div className="image-container">
                                                    <img className="hover-image" src={vocacional}></img>
                                                    <div className="overlay">
                                                        <p>Teste <br></br> Vocacional</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Col>
                                    </Row>

                                </Col>

                                <Col className="image-col">
                                    <Link to="/pagina-de-destino">
                                        <div className="image-container">
                                            <img className="hover-image" src={terapiaDepressao}></img>
                                            <div className="overlay">
                                                <p>Depressão</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col className="image-col">
                                    <Link to="/pagina-de-destino">
                                        <div className="image-container">
                                            <img className="hover-image" src={vocacional}></img>
                                            <div className="overlay">
                                                <p>Teste <br></br> Vocacional</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>

                                <Col className="image-col">
                                    <Link to="/pagina-de-destino">
                                        <div className="image-container">
                                            <img className="hover-image" src={terapiaCasal}></img>
                                            <div className="overlay">
                                                <p>Terapia de  <br></br>Casal</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col className="image-col">
                                    <Link to="/pagina-de-destino">
                                        <div className="image-container">
                                            <img className="hover-image" src={psicanalista}></img>
                                            <div className="overlay">
                                                <p>Pscicaalise</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col span={24} style={{ fontSize: '15px', marginTop: '30px', textAlign: 'center', color: '#15458d' }}>
                                    <Link style={{ color: '#15458d' }} to="/especialidades">Ver tudo</Link>
                                </Col>

                            </Row>
                        </div>

                    </Row>
                    <Row className="terapiaOnline">
                        <Col span={20} style={{ textAlign: 'center', fontSize: '20px', color: '#243953', marginBottom: '50px' }} >
                            <h2 className="borderBottomOnline">Atendimento psicológico online</h2>
                        </Col>
                        <Col span={10} style={{ fontSize: '20px', textAlign: 'left', marginBottom: '50px' }}>

                            <p style={{ fontFamily: 'Fira Sans', color: '#4E5657' }}>Atendimento Online, uma abordagem moderna que veio para ficar, combina a expertise de nossos profissionais com a comodidade da internet. Através de dispositivos como celulares, computadores e tablets, você terá acesso a sessões de terapia altamente profissionais, sem sair de casa.</p>
                            <p style={{ fontFamily: 'Fira Sans', color: '#4E5657' }}>Nossos especialistas, após compreenderem suas necessidades iniciais, criam um tratamento sob medida para você. Através de técnicas eficazes, nossa abordagem visa atingir seus objetivos de bem-estar emocional, permitindo que você evolua no seu próprio ritmo.</p>
                            <p style={{ fontFamily: 'Fira Sans', color: '#4E5657' }}>Desenvolva-se pessoalmente com a segurança e privacidade que merece. Agende sua sessão e descubra como a Terapia Psicológica Online pode melhorar sua qualidade de vida, de maneira prática e confidencial.</p>

                            <Link to={""} className="link-style">Agendar atendimento <ArrowRightOutlined className="arrow-icon" /></Link>
                        </Col>

                        <Col span={10} style={{ display: 'flex', justifyContent: 'center', marginTop: '0%', marginBottom: '5%' }}>
                            <img style={{ width: 'auto', height: 'auto', maxHeight: '400px', borderRadius: '30px' }} src={comoFunciona}></img>

                        </Col>


                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Col span={24} style={{ textAlign: 'center', fontSize: '20px', color: '#243953', marginTop: '55px', marginBottom: '50px' }} >
                            <h2 className="borderBottomOnline">Psicólogos Destaque</h2>
                        </Col>
                        <Col span={20} style={{ display: 'flex', justifyContent: 'space-evenly' }}>

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

                    <Row style={{ background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Col span={24} style={{ textAlign: 'center', fontSize: '20px', color: '#243953', marginBottom: '50px' }} >
                            <h2 className="borderBottomOnline">Agendar atendimento com um psicólogo online</h2>
                        </Col>
                        <Col span={10} style={{ display: 'flex', justifyContent: 'center', marginTop: '0%', marginBottom: '5%' }}>
                            <img style={{ width: 'auto', height: 'auto', maxHeight: '400px', borderRadius: '30px' }} src={comoFunciona}></img>

                        </Col>
                        <Col span={10} style={{ fontSize: '20px', textAlign: 'left', marginBottom: '50px' }}>

                            <p style={{ fontFamily: 'Fira Sans', color: '#4E5657' }}>Atendimento Online, uma abordagem moderna que veio para ficar, combina a expertise de nossos profissionais com a comodidade da internet. Através de dispositivos como celulares, computadores e tablets, você terá acesso a sessões de terapia altamente profissionais, sem sair de casa.</p>
                            <p style={{ fontFamily: 'Fira Sans', color: '#4E5657' }}>Nossos especialistas, após compreenderem suas necessidades iniciais, criam um tratamento sob medida para você. Através de técnicas eficazes, nossa abordagem visa atingir seus objetivos de bem-estar emocional, permitindo que você evolua no seu próprio ritmo.</p>
                            <p style={{ fontFamily: 'Fira Sans', color: '#4E5657' }}>Desenvolva-se pessoalmente com a segurança e privacidade que merece. Agende sua sessão e descubra como a Terapia Psicológica Online pode melhorar sua qualidade de vida, de maneira prática e confidencial.</p>

                            <Link to={""} className="link-style">Agendar atendimento <ArrowRightOutlined className="arrow-icon" /></Link>
                        </Col>





                    </Row>

                    <Row style={{ background: '#eeeeee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Col span={24} style={{ textAlign: 'center', fontSize: '20px', color: '#243953', marginTop: '55px', marginBottom: '50px' }} >
                            <h2 className="borderBottomOnline">Benefícios da terapia online</h2>
                        </Col>
                        <Col span={20} style={{ display: 'flex', justifyContent: 'space-evenly' }}>

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

                </Content>
            </Layout>
            <Footer className="footer" style={{ display: 'flex', justifyContent: 'center' }}>
                <Row gutter={[16, 16]}>
                    <Col style={{ textAlign: 'left' }} xs={24} sm={12} md={8}>
                        <h3>Serviço</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column' }}>
                            <Link to="" className="Link">Serviço</Link>
                            <Link to="" className="Link">Privacidade e cookies</Link>
                            <Link to="" className="Link">Sobre nós</Link>
                            <Link to="" className="Link">Contato</Link>
                            <Link to="" className="Link">Vagas ESTAMOS CONTRATANDO!</Link>
                            <Link to="" className="Link">Termos e Condições</Link>
                            <Link to="" className="Link">Imprensa</Link>
                        </ul>
                    </Col>
                    <Col style={{ textAlign: 'left' }} xs={24} sm={12} md={8}>
                        <h3>Pacientes</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column' }}>
                            <Link to="" className="Link">Serviço</Link>
                            <Link to="" className="Link">Privacidade e cookies</Link>
                            <Link to="" className="Link">Sobre nós</Link>
                            <Link to="" className="Link">Contato</Link>
                            <Link to="" className="Link">CONTRATANDO!</Link>
                            <Link to="" className="Link">Termos e Condições</Link>
                            <Link to="" className="Link">Imprensa</Link>
                        </ul>
                    </Col>
                    <Col style={{ textAlign: 'left' }} xs={24} sm={12} md={8}>
                        <h3>Para especialistas e clínicas</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column' }}>
                            <Link to="" className="Link">Serviço</Link>
                            <Link to="" className="Link">Privacidade e cookies</Link>
                            <Link to="" className="Link">Sobre nós</Link>
                            <Link to="" className="Link">Contato</Link>
                            <Link to="" className="Link">ESTAMOS</Link>
                            <Link to="" className="Link">Termos e Condições</Link>
                            <Link to="" className="Link">Imprensa</Link>
                        </ul>
                    </Col>
                </Row>
            </Footer>


        </Layout>
    )
}

export default Home 