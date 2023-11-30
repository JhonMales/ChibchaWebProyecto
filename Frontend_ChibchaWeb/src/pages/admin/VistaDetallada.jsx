import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useParams } from "react-router-dom";
import { backend_url } from "../../constantes";

import img_profile from "../../assets/profile.png";
import "../cliente/Cliente.css";

const VistaDetallada = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, rol } = useSelector(state => state.auth);
  const [clienteData, setClienteData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
    if (rol !== "Administrador") {
      navigate("/");
    }
  }, [isAuthenticated, rol]);


    const handleView = async () => {
      try {
        const response = await fetch(`${backend_url}/obtenerEmpleadoID/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const clienteDetails = await response.json();
          setClienteData(clienteDetails);
          console.log(clienteDetails)
        } else {
          // Manejar errores en la respuesta
          console.error("Error al obtener detalles del cliente");
        }
      } catch (error) {
        // Manejar errores de la solicitud
        console.error("Error de red:", error);
      }
    };


  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Card className="vista-detallada">
        <Card.Img variant="top" src={img_profile} className="img" />
        <Card.Body className="align-items-center">
          <Card.Title >{clienteData?.nombres ||""} {" "}{clienteData?.apellidos||""}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush align-items-center">
          <ListGroup.Item>Correo: {clienteData?.correo||""}</ListGroup.Item>
          <ListGroup.Item>Doc. identificación: {clienteData?.documentoIdentificacion||""} {clienteData?.tipoDocumento}</ListGroup.Item>
          <ListGroup.Item>Teléfono/Celular: {clienteData?.telefono||""}</ListGroup.Item>
          <ListGroup.Item>País/Ciudad: {clienteData?.pais||""}/{clienteData?.ciudad||""}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
        </Card.Body>
        <Button onClick={handleView}></Button>
      </Card>
    </div>
  );
};

export default VistaDetallada;
