import Carousel from "react-bootstrap/Carousel";

import "./Carousel.css";
import img3 from "../../assets/computer-4795762_1920.jpg";
import img2 from "../../assets/digital-marketing-1433427_1920.jpg";
import img1 from "../../assets/bulb-5258341_1920.jpg";

const CarouselImg = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img src={img1} />
        <Carousel.Caption>
          <h3>Innovación y Compromiso</h3>
          <p>
            Descubre nuestro compromiso con la excelencia tecnológica en cada
            píxel. Bienvenido al futuro del software, donde las posibilidades
            son ilimitadas.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img2} />
        <Carousel.Caption>
          <h3>Calidad de Servicio</h3>
          <p>
            Únete a una experiencia donde la atención meticulosa a los detalles
            redefine tus expectativas de servicio.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img3} />
        <Carousel.Caption>
          <h3>Simplicidad Transformadora</h3>
          <p>
            Descubre cómo hacemos que la tecnología sea accesible, intuitiva y
            amigable para todos.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselImg;
