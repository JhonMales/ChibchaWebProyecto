import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link , useNavigate} from "react-router-dom";
import DomTables from "../../components/tables/DomTables";
import { backend_url } from "../../constantes";
import { useSelector } from "react-redux";

import "./Distribuidor.css";


const Distribuidor = () => {

  const navigate = useNavigate()
  const {user, isAuthenticated, rol} = useSelector(state=>state.auth)
  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/signin")
    }
    if(rol!="Distribuidor"){
      navigate("/")
    }
  },[rol])

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${backend_url}/obtenerDominiosAprobados`,{
      credentials:"include",
    })
      .then((response) => response.json())
      .then((data) => {
        const rowsWithId = data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setData(rowsWithId);
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  const columnsDominios = [
    { field: "nombreDominio", headerName: "Nombre del dominio", width: 200 },
  ];

  const handleDelete = async (rowData) => {
    console.log("Eliminar Dominio:", rowData._id);
  
    try {
      const response = await fetch(`${backend_url}/eliminarDominio/${rowData._id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (response.ok) {
        console.log("Dominio eliminado");
        navigate("/distribuidor");
      } else {
        // Manejar errores en la respuesta
        const errorBody = await response.json();
        console.error("Error al eliminar Dominio:", errorBody);
      }
    } catch (error) {
      // Manejar errores de la solicitud
      console.error("Error de red:", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="text-white"><br/>Bienvenido {rol} {user.usuario}</h1>
        <div className="d-flex flex-row">
          <Card className="card-perfil">
            <Card.Body className="card-tabla">
              <Card.Title className="text-center">
                Dominios Registrados
              </Card.Title>
              <DomTables rows={data} columns={columnsDominios} handleDelete={handleDelete} />
            </Card.Body>
          </Card>
          <div className="d-flex flex-column align-items-center justify-content-center">
            {" "}
            {/* Nuevo contenedor */}
            <Card className="card-dominio">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <br/>
                <Card.Title className="text-center">
                  Reportar un problema
                </Card.Title>
                <Link to="/ticket">
                  <br/>
                  <Button variant="warning">Generar un nuevo ticket</Button>
                </Link>
              </Card.Body>
            </Card>
            <Card className="card-dominio">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <br/>
                <Card.Title className="text-center">Comisiones</Card.Title>
                <Card.Text className="text-center"></Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="d-flex flex-column align-items-center justify-content-center">
            {" "}
            {/* Nuevo contenedor */}
            <Card className="card-dominio">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <br/>
                <Card.Title className="text-center"> Dominios Pendientes </Card.Title>
                <br/>
                <Link to="/aceptarDominios" className="text-center">
                  <Button variant="warning"> Ver solicitudes </Button>
                </Link>
                <Card.Text className="text-center"></Card.Text>
              </Card.Body>
            </Card>
            <Card className="card-dominio">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <br/>
                <Card.Title className="text-center">Mi información</Card.Title>
                <br/>
                <Link to="/actualizarDistribuidor">
                  <Button variant="warning">Actualizar mis datos</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Distribuidor;
