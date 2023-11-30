import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../reducers/authSlice";

import "../auth/LoginSignup.css";
import { backend_url } from "../../constantes";

const Ticket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isAuthenticated, rol} = useSelector(state=>state.auth)

  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/signin")
    }
    if(rol!="Distribuidor" && rol!="Cliente"){
      navigate("/")
    }
  },[rol])

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };



  const [data, setData] = useState({
    descripcion: "",
    asunto: "",
    fechaReporte: getCurrentDate(),
    rol: rol,
    nivelServicio:"Pendiente"
  });

  async function handleReport() {
    for (const value of Object.values(data)) {
      if (value === "" || value === null || value === undefined) {
        alert("Por favor, completa todos los campos antes de continuar.");
        return;
      }
    }
    try {
      const response = await fetch(`${backend_url}/crearTicket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include"
      });
  
      if (response.ok) {
        console.log("Ticket enviado correctamente");
        if (rol === "Cliente") {
          navigate("/cliente");
        } else if (rol === "Distribuidor") {
          navigate("/distribuidor");
        } else {
          console.error("Rol no reconocido");
        }

      } else {
        console.error("Error al enviar ticket");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  return (
    <Card className="containerRegister">
      <Card.Title className="text">Reportar novedad</Card.Title>
      <Form className="inputs">
        <Form.Group className="input">
          {/*ASUNTO*/}
          <Form.Control
            type="text"
            placeholder="Asunto"
            onChange={(e) =>
              setData({
                  ...data,
                  asunto: e.target.value,
                })
            }
          />
        </Form.Group>

        <Form.Group className="input">
          {/*DESCRIPCION*/}
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Descripción  del problema"
            onChange={(e) =>
              setData({
                ...data,
                descripcion: e.target.value,
              })
            }
          />
        </Form.Group>
        {/*<Form.Group className="input">
          *FECHA REPORTE*

          <Form.Select
            value={data.nivelServicio}
            onChange={(e) =>
              setData({
                ...data,
                nivelServicio: e.target.value,
              })
            }
          >
            <option value="">Elige el nivel de servicio</option>
            <option value="Basico">Basico</option>
            <option value="Especializado">Especializado</option>
            <option value="Funcional">Funcional</option>
          </Form.Select>
        </Form.Group>*/}
      </Form>
      <Button type="submit" className="submit" onClick={handleReport}>
        Enviar reporte
      </Button>
    </Card>
  );
};

export default Ticket;
