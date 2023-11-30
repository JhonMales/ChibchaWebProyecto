import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";

import "./NavigationBar.css";
import img from "../../assets/Logo.png";

const NavigationBar = () => {
  const { isAuthenticated, user } = useSelector(state=>state.auth)
  const [expanded, setExpanded] = useState(false);
  const toggleNavbar = () => {
    setExpanded(!expanded);
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="dark-transparent-navbar">
      <Container className="nav">
        <Navbar.Brand as={Link} to="/" className="textbar">
          <Image
            src={img}
            alt="ChibchaWeb Logo"
            roundedCircle
            style={{ width: "40px", marginRight: "30px" }}
          />
          ChibchaWeb
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" as={Link} to="/">
          <Nav className="me-auto"></Nav>
          {isAuthenticated?(
            <Nav>
              {user.rol=="Cliente"?(
              <Nav.Link as={Link} to="/cliente">Mi perfil</Nav.Link>
              ):user.rol=="Administrador"?(
              <Nav.Link as={Link} to="/admin">Mi perfil</Nav.Link>
              ):user.rol=="Empleado"?(
                <Nav.Link as={Link} to="/empleado">Mi perfil</Nav.Link>
                ):user.rol=="Distribuidor"?(
                  <Nav.Link as={Link} to="/distribuidor">Mi perfil</Nav.Link>
                  ):null}
              <Nav.Link as={Link} to="/signout">Cerrar sesión</Nav.Link>
            </Nav>
          ):(
            <Nav>
            <Nav.Link as={Link} to="/signin" className="textbar">
              Iniciar sesión
            </Nav.Link>
            <Nav.Link as={Link} to="/signup" className="textbar">
              Registrarse
            </Nav.Link>
          </Nav>
          )}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
