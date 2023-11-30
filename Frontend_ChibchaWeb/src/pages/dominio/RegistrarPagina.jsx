import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../reducers/authSlice";

import "../auth/LoginSignup.css";
import { backend_url } from "../../constantes";

const RegistrarPagina = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  const [data, setData] = useState({
    nombreSitio: "",
    url: "",
  });

  async function handleRegister() {
    for (const value of Object.values(data)) {
      if (value === "" || value === null || value === undefined) {
        alert("Por favor, completa todos los campos antes de continuar.");
        return;
      }
    }
    try {
      const response = await fetch(`${backend_url}/crearPagina`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
  
      if (response.ok) {
        console.log("Pagina creada");
        navigate("/cliente");
      } else {
        const errorBody = await response.json();
        console.error("Error al crear pagina:", errorBody);
      }
      } catch (error) {
       console.error("Error de red:", error);
    }
  }

  return (
    <Card className="containerRegister">
      <Card.Title className="text">Registrar página web</Card.Title>
      <Form className="inputs">
        <Form.Group className="input">
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

export default RegistrarPagina;
