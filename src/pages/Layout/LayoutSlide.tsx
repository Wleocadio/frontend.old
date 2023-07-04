import { Row, Col } from 'antd';
import SlideComponent from '../../components/Slide/SlideComponent';


interface LayoutProps {
  children: React.ReactNode;
}

const LayoutComponent: React.FC <LayoutProps> = ({ children }) => {
  return (
    <Row >
      <Col xs={24} lg={12} style={{height:'100vh',backgroundColor:'#ffffff'}}>
        {/* Conteúdo da metade esquerda */}
        {children}
      </Col>
      <Col xs={24} lg={12} style={{height:'100vh',backgroundColor:'#134885'}}>
        {/* Slide na metade direita */}
        <SlideComponent />
      </Col>
    </Row>
  );
};

export default LayoutComponent;