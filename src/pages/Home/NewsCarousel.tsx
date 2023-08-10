import React, { useEffect, useRef, useState } from "react";
import "./NewsCarousel.css";
import { ArrowRightOutlined } from "@ant-design/icons";

interface CarouselProps {
  delay: number;
}

const NewsCarousel: React.FC<CarouselProps> = ({ delay }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [animationPlayState, setAnimationPlayState] = useState<"running" | "paused">("running");

  useEffect(() => {
    const sliderElement = sliderRef.current;
    const handleMouseEnter = () => setAnimationPlayState("paused");
    const handleMouseLeave = () => setAnimationPlayState("running");

    sliderElement?.addEventListener("mouseenter", handleMouseEnter);
    sliderElement?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      sliderElement?.removeEventListener("mouseenter", handleMouseEnter);
      sliderElement?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="slider-container">
      <div className="slider" style={{
        animation: `slide ${delay}s linear infinite`,
        animationPlayState,
      }} ref={sliderRef}>
        <div className="news">
          <img className="classImageNews" src="https://conteudo.imguol.com.br/c/home/layout/vueland/icons/brand/uol-logo-full.svg?v5"></img>
          <p className="classDesc">"Todo mundo precisa de terapia."<br></br> Será?.</p>
          <a style={{ color:'#ffffff'}}href="https://www.uol.com.br/vivabem/noticias/redacao/2021/05/07/como-saber-se-eu-preciso-ir-ao-psicologo.htm">Continue Lendo <ArrowRightOutlined className="arrow-icon" /></a>
        </div>

        <div className="news">
        <img className="classImageNews" src="https://conteudo.imguol.com.br/c/home/layout/vueland/icons/brand/uol-logo-full.svg?v5"></img>
          <p className="classDesc">TCC é terapia mais indicada para <br></br>ansiedade e pânico.</p>
          <a style={{marginTop:'-20px',color:'#ffffff'}}href="https://ipqhc.org.br/2023/06/19/tcc-e-terapia-mais-indicada-para-ansiedade-e-panico/#:~:text=Uma%20caracter%C3%ADstica%20importante%20da%20TCC,e%20de%20ansiedade%20pela%20OMS.">Continue Lendo <ArrowRightOutlined className="arrow-icon" /></a>
        </div>

        <div className="news">
          <img className="classImageNews" src="https://conteudo.imguol.com.br/c/home/layout/vueland/icons/brand/uol-logo-full.svg?v5"></img>
          <p className="classDesc">Benefícios da terapia para alto desempenho profissional</p>
          <a style={{color:'#ffffff'}}href="https://ipqhc.org.br/2023/06/19/tcc-e-terapia-mais-indicada-para-ansiedade-e-panico/#:~:text=Uma%20caracter%C3%ADstica%20importante%20da%20TCC,e%20de%20ansiedade%20pela%20OMS.">Continue Lendo <ArrowRightOutlined className="arrow-icon" /></a>
        </div>

        <div className="news">
          <img className="classImageNews" src="https://conteudo.imguol.com.br/c/home/layout/vueland/icons/brand/uol-logo-full.svg?v5"></img>
          <p className="classDesc">A terapia pode ser a saída para <br></br> viver melhor</p>
          <a style={{color:'#ffffff'}}href="https://portal.unit.br/blog/noticias/a-terapia-pode-ser-a-saida-para-viver-melhor/">Continue Lendo <ArrowRightOutlined className="arrow-icon" /></a>
        </div>

        <div className="news">
          <img className="classImageNews" src="https://conteudo.imguol.com.br/c/home/layout/vueland/icons/brand/uol-logo-full.svg?v5"></img>
          <p className="classDesc">Terapia não é tudo igual:  <br></br>Saiba como escolher a linha correta.</p>
          <a style={{color:'#ffffff'}}href="https://noticias.uol.com.br/ultimas-noticias/bbc/2023/02/21/terapia-nao-e-tudo-igual-saiba-como-escolher-linha-correta-e-como-encontrar-melhor-psicologo.htm">Continue Lendo <ArrowRightOutlined /></a>
        </div>
      </div>
    </div>
  );
};
export default NewsCarousel;

