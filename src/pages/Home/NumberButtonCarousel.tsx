import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

interface NumberButtonCarouselProps {
  buttonTexts: string[];
  explanations: string[];
}

const NumberButtonCarousel: React.FC<NumberButtonCarouselProps> = ({ buttonTexts, explanations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % buttonTexts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [buttonTexts.length]);

  const handleButtonClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <div style={{ display: 'flex', marginLeft: '100px',marginTop:'-100px', flexDirection: 'column', width: '150px' }}>
    {buttonTexts.map((buttonText, index) => (
      <Button
        key={index}
        onClick={() => handleButtonClick(index)}
        type={currentIndex === index ? 'primary' : 'default'}
        shape="circle"
        style={{ marginTop: '-3%', marginBottom: '30px', width: '70px', height: '70px', fontSize: '30px', backgroundColor:'#15458d' }}
      >
        {buttonText}
      </Button>
    ))}
  </div>
  <div style={{ marginLeft: '40px', flexGrow: 1 }}>
    <p style={{marginTop:'-25%', fontSize: '17px',fontFamily:'sans-serif', whiteSpace: 'pre-line' }}>{explanations[currentIndex]}</p>
  </div>
</div>
    
  );
};

export default NumberButtonCarousel;