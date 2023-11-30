import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import WebTables from "../../components/tables/WebTables";
import { backend_url } from "../../constantes";

import img_profile from "../../assets/profile.png";
import "./Cliente.css";


const Cliente = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, rol } = useSelector(state => state.auth);
  useEffect(()=>{
    if (!isAuthenticated | rol!='Cliente') {
      navigate("/");
    }
  },[])

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${backend_url}/obtenerPaginas`,{
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

  const columnsPaginas = [
    { field: "nombreSitio", headerName: "Nombre pagina web", width: 200 },
  ];

  const handleDelete = async (rowData) => {
    try {
      const response = await fetch(`${backend_url}/eliminarPagina/${rowData._id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (response.ok) {
        navigate("/distribuidor");
      } else {
        const errorBody = await response.json();
      }
    } catch (error) {

    }
  };
  const handleEdit= (rowData) => {
    console.log("Actualizar pagina:", rowData._id);
    navigate(`/actualizarPagina/${rowData._id}`);
  };
  async function handlePago() {
    try {
      const response = await fetch(`${backend_url}/obtenerMediosPago`, {
        method: "GET",
        credentials: "include",
      });
  
      if (response.ok) {
        console.log("Medios de pago disponibles");
        const data = await response.json();
        navigate("/pagos");
      } else {
        const errorBody = await response.json();
        console.error("Error al obtener medios de pago:", errorBody);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  if (user)
    return (
      <>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <br />
          <h1 className="text-white">Bienvenido {user.usuario}</h1>
          <div className="d-flex flex-row">
            <Card className="card-perfil">
              <Card.Img variant="top" src={img_profile} className="img" />
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title className="text-center">{user.usuario}</Card.Title>
                <Card.Text className="text-center">{user.rol}</Card.Text>
                <Link to="/actualizarDatos">
                    <Button variant="warning" className="mb-3">Actualizar mis datos</Button>
                  </Link>
                  <Link to="/actualizarUsuario">
                    <Button variant="warning" className="mb-3">Actualizar mi usuario</Button>
                  </Link>
              </Card.Body >
            </Card>
            <div className="d-flex flex-column align-items-center justify-content-center">
              {" "}
              {/* Nuevo contenedor */}
              <Card className="card-dominio">
                <Card.Body className="d-flex flex-column align-items-center">
                  <br />
                  <Card.Title className="text-center">Páginas web</Card.Title>
                    <br />
                    <Button variant="warning" onClick={handlePago}>Solicitar página web</Button>
                </Card.Body>
              </Card>
              <Card className="card-dominio">
                <Card.Body className="d-flex flex-column align-items-center">
                  <br />
                  <Card.Title className="text-center">
                    Reportar un problema
                  </Card.Title>
                  <Link to="/ticket">
                    <br />
                    <Button variant="warning">Generar un nuevo ticket</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="tablaWeb">
                  <WebTables rows={data} columns={columnsPaginas} handleDelete={handleDelete} handleEdit={handleEdit}/>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default Cliente;
