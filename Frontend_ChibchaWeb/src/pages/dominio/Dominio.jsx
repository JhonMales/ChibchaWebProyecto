import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../reducers/authSlice";

import "../auth/LoginSignup.css";
import { backend_url } from "../../constantes";

const Dominio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [data, setData] = useState({
    nombreDominio: "",
    fechaSolicitud: getCurrentDate(),
    estado: "Pendiente",
  });


  async function handleRegister() {
    if (!Object.values(data).some(value => value !== null && value !== "")) {
      alert("No se proporcionaron datos para actualizar");
      return;
    }
  try {
      const response = await fetch(`${backend_url}/registrarDominio`, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
  
      if (response.ok) {
        console.log("Dominio registrado");
        navigate("/registrarPagina");
      } else {
        const errorBody = await response.json();
        console.error("Error al registrar Dominio:", errorBody);
      }
      } catch (error) {
        console.error("Error de red:", error);
    }
  }

  return (
    <Card className="containerRegister">
      <Card.Title className="text">Registrar Nuevo Dominio</Card.Title>
      <Form className="inputs">
        <Form.Group className="input">
          {/*NOMBRE DEL SITIO WEB*/}

          <Form.Control
            type="text"
            placeholder="Nombre del Dominio"
            onChange={(e) =>
              setData({
                ...data,
                nombreDominio: e.target.value,
              })
            }
          />
        </Form.Group>
      </Form>
          <Button type="submit" className="submit" onClick={handleRegister}>
              Registrar 
          </Button>
    </Card>
  );
};

export default Dominio;
