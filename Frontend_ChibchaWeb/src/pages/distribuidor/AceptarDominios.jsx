import React, { useState, useEffect } from "react";
import { Button, Form, Card} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../support/Empleado.css";
import { backend_url } from "../../constantes";


const AceptarDominios = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, rol } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
    if (rol !== "Distribuidor") {
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
      const response = await fetch(`${backend_url}/obtenerDominiosPendientes`, {
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
    try {
        const response = await fetch(`${backend_url}/actualizarDominio/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ estado: "Rechazado"}),
        });
        if (response.ok) {
          // Actualizar el estado local para reflejar el cambio
          setIncidentes((prevIncidentes) =>
            prevIncidentes.map((incidente) =>
              incidente.id === id
                ? { ...incidente, estado: "Rechazado" }
                : incidente
            )
          );
          fetchIncidentes();
        } else {
          console.error("Error al marcar como Rechazado:", response.statusText);
        }
      } catch (error) {
        console.error("Error al marcar como Rechazado:", error);
      }
  };

  const handleCheck = async (id) => {
    try {
      const response = await fetch(`${backend_url}/actualizarDominio/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ fechaAceptacion: getCurrentDate(), estado: "Aprobado"}),
      });
      if (response.ok) {
        // Actualizar el estado local para reflejar el cambio
        setIncidentes((prevIncidentes) =>
          prevIncidentes.map((incidente) =>
            incidente.id === id
              ? { ...incidente, estado: "Aprobado" }
              : incidente
          )
        );
        fetchIncidentes();
      } else {
        console.error("Error al marcar como Aprobado:", response.statusText);
      }
    } catch (error) {
      console.error("Error al marcar como Aprobado:", error);
    }
  };

  return (
    <>
      <h1 className="text-white text-center">
        Bienvenido Distribuidor {user.usuario}
      </h1>
      <div className="admin-container">
        {incidentes.map((incidente) => (
          <Card
            key={incidente.id}
            border={incidente.solucionado ? "secondary" : "warning"}
            className="text-white text-center bg-dark tickets"
          >
            <Card.Header> Solicitud de dominio</Card.Header>
            <Card.Body>
              <Card.Title>{incidente.nombreDominio}</Card.Title>
              <Card.Text>
                {incidente.descripcion}
                <br />
                Fecha de solicitud:{" "}
                {new Date(incidente.fechaSolicitud).toLocaleDateString("es-ES")}
                <br/>
                Estado: {incidente.estado}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="outline-success"
                onClick={() => handleCheck(incidente._id)}
              >
                Aceptar
              </Button>{" "}
              <Button
                variant="outline-danger"
                onClick={() => handleDelete(incidente._id)}
              >
                Rechazar
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AceptarDominios;