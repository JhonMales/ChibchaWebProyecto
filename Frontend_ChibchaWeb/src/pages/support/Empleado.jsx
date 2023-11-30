import React, { useState, useEffect } from "react";
import { Button, Form, Card} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Empleado.css";
import { backend_url } from "../../constantes";


const Empleado = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, rol } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
    if (rol !== "Empleado") {
      navigate("/");
    }
  }, [rol]);

  const [incidentes, setIncidentes] = useState([]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [data, setData] = useState({
    nivelServicio: "Solucionado",
    fechaSolucion: getCurrentDate(),
  });



  useEffect(() => {
    fetchIncidentes();
  }, []);

  const fetchIncidentes = async () => {
    try {
      const response = await fetch(`${backend_url}/obtenerTickets`, {
        credentials: "include",
      });
      const data = await response.json();
      // Filtrar tickets solucionados
      const incidentesPendientes = data.filter((incidente) => incidente.nivelServicio !== "Solucionado");
      setIncidentes(incidentesPendientes);
    } catch (error) {
      console.error("Error al obtener datos de incidentes:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`${backend_url}/eliminarTicket/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        console.log("Ticket eliminado");
        fetchIncidentes();
      } else {
        // Manejar errores en la respuesta
        const errorBody = await response.json();
        console.error("Error al eliminar Ticket:", errorBody);
      }
    } catch (error) {
      // Manejar errores de la solicitud
      console.error("Error de red:", error);
    }
  };

  const handleCheck = async (id) => {
    try {
      const response = await fetch(`${backend_url}/actualizarTicket/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ fechaSolucion: getCurrentDate(), nivelServicio: "Solucionado" }),
      });
  
      if (response.ok) {
        // Actualizar el estado local para reflejar el cambio
        setIncidentes((prevIncidentes) =>
          prevIncidentes.map((incidente) =>
            incidente.id === id
              ? { ...incidente, fechaSolucion: getCurrentDate(), nivelServicio: "Solucionado" }
              : incidente
          )
        );
        fetchIncidentes();
      } else {
        console.error("Error al marcar como solucionado:", response.statusText);
      }
    } catch (error) {
      console.error("Error al marcar como solucionado:", error);
    }
  };

  const handleChangeNivelServicio = async (id, nuevoNivelServicio) => {
    try {
      const response = await fetch(`${backend_url}/actualizarTicket/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ nivelServicio: nuevoNivelServicio }),
      });
  
      if (response.ok) {
        // Actualizar el estado local para reflejar el cambio
        setIncidentes((prevIncidentes) =>
          prevIncidentes.map((incidente) =>
            incidente.id === id
              ? { ...incidente, nivelServicio: nuevoNivelServicio }
              : incidente
          )
          
        );
        fetchIncidentes();
      } else {
        console.error("Error al actualizar el nivel de servicio:", response.statusText);
      }
    } catch (error) {
      console.error("Error al actualizar el nivel de servicio:", error);
    }
  };

  return (
    <>
      <h1 className="text-white text-center">
        Bienvenido Empleado {user.usuario}
      </h1>
      <div className="admin-container">
        {incidentes.map((incidente) => (
          <Card
            key={incidente.id}
            border={incidente.solucionado ? "secondary" : "warning"}
            className="text-white text-center bg-dark tickets"
          >
            <Card.Header>
            <Form.Select
              value={incidente.nivelServicio}
              onChange={(e) => handleChangeNivelServicio(incidente._id, e.target.value)}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Basico">Basico</option>
              <option value="Especializado">Especializado</option>
              <option value="Funcional">Funcional</option>
            </Form.Select>
            </Card.Header>
            <Card.Body>
              <Card.Title>{incidente.asunto}</Card.Title>
              <Card.Text>
                {incidente.descripcion}
                <br />
                Fecha de reporte:{" "}
                {new Date(incidente.fechaReporte).toLocaleDateString("es-ES")}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="outline-success"
                onClick={() => handleCheck(incidente._id)}
              >
                Solucionado
              </Button>{" "}
              <Button
                variant="outline-danger"
                onClick={() => handleDelete(incidente._id)}
              >
                Eliminar
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Empleado;