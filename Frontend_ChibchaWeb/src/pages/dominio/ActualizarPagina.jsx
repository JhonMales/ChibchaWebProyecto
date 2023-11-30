import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { login } from "../../reducers/authSlice";

import "../auth/LoginSignup.css";
import { backend_url } from "../../constantes";

const ActualizarPagina = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const { id } = useParams(); 
  
  const [data, setData] = useState({
    nombreSitio: "",
    url: "",
  });

  async function handleRegister() {
    if (!Object.values(data).some(value => value !== null && value !== "")) {
        alert("No se proporcionaron datos para actualizar");
        return;
      }
    try {
      const response = await fetch(`${backend_url}/actualizarPagina/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (response.ok) {
        console.log("Pagina actualizada");
        navigate("/cliente");
      } else {
        console.error("Error al Actualizar pagina");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  return (
    <Card className="containerRegister">
      <Card.Title className="text">Actualizar página web</Card.Title>
      <Form className="inputs">
        <Form.Group className="input">
          {/*Metodos de pago*/}
            <Form.Control
                type="text"
                placeholder="Nombre del sitio"
                onChange={(e) =>
                setData({
                    ...data,
                    nombreSitio: e.target.value,
                })
                }
            />
        </Form.Group>
        <Form.Group className="input">
          {/*Metodos de pago*/}
            <Form.Control
                type="text"
                placeholder="URL"
                onChange={(e) =>
                setData({
                    ...data,
                    url: e.target.value,
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

export default ActualizarPagina;
