import React from 'react';
import { Carousel } from 'antd';
import './SlideComponent.css';

import image1 from "../Images/Slide1.png";
import image2 from "../Images/Slide2.png";
import image3 from "../Images/Slide3.png";


const SlideComponent: React.FC = () => {
    return (
    <Carousel dots autoplay >
     <div className="slide-content">
          <img src={image1} alt="Imagem 1" />
        </div>
        <div className="slide-content">
          <img src={image2} alt="Imagem 2" />
        </div>
        <div className="slide-content">
          <img src={image3} alt="Imagem 3" />
        </div>
    </Carousel>
  );
};
export default SlideComponent;