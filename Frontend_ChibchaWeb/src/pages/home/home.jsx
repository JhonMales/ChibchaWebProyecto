import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";

import "./home.css";
import CardP from "../../components/card/Card";

import image1 from "../../assets/ChibchaPlata.png";
import image2 from "../../assets/ChibchaOro2.png";
import image3 from "../../assets/ChibchaPlatino.png";
import CarouselImg from "../../components/carousel/Carousel";
import Footer from "../../components/footer/Footer";

const card = [
  {
    id: 1,
    title: "Chibcha Plata",
    image: image1,
    text: "Descubre la asequible excelencia de 'Chibcha Plata': rendimiento fiable, servidores sólidos y características esenciales respaldadas por la inspiración colombiana. Ofrecemos opciones de facturación flexibles desde $12.400 mensuales, $36.000 trimestrales, $70.000 semestrales, $124.000 anuales. Incluye 10GB de espacio, acceso a 10 correos corporativos, 10 bases de datos y alojamiento para un sitio web, con certificación SSL y almacenamiento en estado sólido. Inicia tu viaje en línea con confianza y calidad a tu alcance.",
  },
  {
    id: 2,
    title: "Chibcha Oro",
    image: image2,
    text: "Explora el estándar de excelencia con nuestro paquete de hosting 'Chibcha Oro'. Este plan intermedio ofrece las siguientes opciones de facturación, $23.100 mensuales, $65.000 trimestrales, $125.000 semestrales y $231.000 al año, te ofrece 20GB de espacio, acceso a 20 correos corporativos, 10 bases de datos, alojamiento para 2 sitios web y certificado SSL. Inspirado en la riqueza cultural de Colombia, fusionamos servidores robustos, velocidad relámpago y características avanzadas. Con certificación ISO9001 y almacenamiento en estado sólido, 'Chibcha Oro' garantiza un rendimiento excepcional. ¡Bienvenido a una experiencia digital de oro donde la innovación y la tradición se encuentran para elevar tu presencia en línea a nuevas alturas!",
  },
  {
    id: 3,
    title: "Chibcha Platino",
    image: image3,
    text: "Alcanza la cima del rendimiento web con nuestro paquete de hosting 'Chibcha Platino'. Desde $66.700 mensuales, $195.700 trimestrales, $380.000 semestral y $667.000 al año, este plan premium ofrece 60GB de espacio, acceso a 150 correos corporativos, bases de datos ilimitadas, alojamiento para 10 sitios web y certificado SSL. Inspirado en la opulencia de Colombia, fusionamos servidores de élite, velocidad extraordinaria y funciones de vanguardia. Con certificación ISO9001 y almacenamiento en estado sólido, 'Chibcha Platino' te lleva a la cima de la excelencia digital, donde la tecnología y la riqueza cultural convergen para una presencia en línea exclusiva.",
  },
];

const Home = () => {
  return (
    <>
      <div>
        <Container text className="custom-container">
          <Header className="text-align-center text-center fonts-custom">
            Chibcha Web
          </Header>
        </Container>
        <CarouselImg />

        <Container text className="custom-container">
          <Header className="text-align-center text-center fonts-custom">
            ¿Quiénes somos?
          </Header>
          <p className="black-text smaller-font">
            Más que una empresa de desarrollo de software, somos un equipo
            comprometido con la innovación y la excelencia. Desde nuestros
            valores hasta nuestro enfoque en soluciones tecnológicas avanzadas,
            conoce la narrativa que impulsa nuestra misión de ofrecer soluciones
            de software de vanguardia. Únete a nosotros en el viaje de NexGen,
            donde el futuro se encuentra con el software.
          </p>
          <Header className="text-align-center text-center fonts-custom">
            Nuestro servicio
          </Header>
          <p className="black-text smaller-font">
            ¡Bienvenido a Chibcha Web, tu puerta de entrada a una experiencia
            digital excepcional! En Chibcha Web, fusionamos la riqueza cultural
            de Colombia con la excelencia tecnológica en nuestros servicios de
            hosting. Desde el asequible 'Chibcha Plata', que garantiza
            confiabilidad y eficiencia, hasta nuestro intermedio 'Chibcha Oro',
            donde la potencia tecnológica se encuentra con la inspiración
            colombiana, y finalmente, nuestro premium 'Chibcha Platino', una
            fusión de innovación y opulencia. En cada nivel, ofrecemos
            soluciones diseñadas para superar tus expectativas. Únete a nosotros
            en Chibcha Web y descubre cómo podemos elevar tu presencia en línea
            a nuevas alturas.
            <br/>
            <br/>
          </p>
        </Container>
      </div>
      <br/>
      <Container>
        <div className="container-max d-flex justify-content-center align-items-center vh-100">
          <div className="row">
            {card.map((card) => (
              <div className="col-md-4" key={card.id}>
                <CardP
                  title={card.title}
                  imageSource={card.image}
                  text={card.text}
                />
              </div>
            ))}
          </div>
        </div>
        <br/>
      </Container>
        <br/>
      <Footer />
    </>
  );
};

export default Home;
