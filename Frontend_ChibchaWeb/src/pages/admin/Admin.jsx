import React, { useState, useEffect } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import DataTables from "../../components/tables/DataTables";

import "./Admin.css";
import { backend_url } from "../../constantes";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {
  const navigate = useNavigate();

  const {isAuthenticated, rol} = useSelector(state=>state.auth)
  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/signin")
    }
    if(rol!="Administrador"){
      navigate("/")
    }
  },[rol])

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${backend_url}/obtenerClientes`)
      .then((response) => response.json())
      .then((clientes) => {
        const rowsWithId = clientes.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setData(rowsWithId);
      })
      .catch((error) => console.error("Error al obtener clientes:", error));
  }, []);

  const [dataDistribuidores, setDataDistribuidores] = useState([]);
  useEffect(() => {
    fetch(`${backend_url}/obtenerDistribuidores`)
      .then((response) => response.json())
      .then((distribuidores) => {
        const rowsWithId = distribuidores.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setDataDistribuidores(rowsWithId);
      })
      .catch((error) => console.error("Error al obtener distribuidores:", error));
  }, []);

  const [dataEmpleados, setDataEmpleados] = useState([]);
  useEffect(() => {
    fetch(`${backend_url}/obtenerEmpleados`)
      .then((response) => response.json())
      .then((empleados) => {
        const rowsWithId = empleados.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setDataEmpleados(rowsWithId);
      })
      .catch((error) => console.error("Error al obtener empleados:", error));
  }, []);

  const columnsClientes = [
    { field: "nombres", headerName: "Nombres", width: 200 },
    { field: "apellidos", headerName: "Apellidos", width: 200 },
    { field: "documentoIdentificacion", headerName: "Documento de identificacion", width: 200 },
  ];

  const columnsDistribuidores = [
    { field: "razonSocial", headerName: "Razón social", width: 200 },
    { field: "nit", headerName: "NIT", width: 200 },
  ];

  const columnsEmpleados = [
    { field: "nombres", headerName: "Nombres", width: 200 },
    { field: "apellidos", headerName: "Apellidos", width: 200 },
    { field: "documentoIdentificacion", headerName: "Documento de identificacion", width: 200 },
  ];


  const handleEditCliente = (rowData) => {
    navigate(`/actualizarClienteID/${rowData._id}`);
  };

  const handleEditEmpleado = (rowData) => {
    navigate(`/actualizarEmpleadoID/${rowData._id}`);
  };

  const handleEditDistribuidor = (rowData) => {
    navigate(`/actualizarDistribuidorID/${rowData._id}`);
  };

  const handleDeleteCliente = async (rowData) => {
    try {
      const response = await fetch(`${backend_url}/eliminarUsuarioID/${rowData._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        navigate("/admin");
      } else {
        const errorBody = await response.json();
      }
    } catch (error) {
    }
  };

  const handleDeleteEmpleado = async (rowData) => {
    console.log("Eliminar Empleado:", rowData._id);

    try {
      const response = await fetch(`${backend_url}/eliminarUsuarioID/${rowData._id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (response.ok) {
        navigate("/admin");
      } else {
        const errorBody = await response.json();
      }
    } catch (error) {
    }
  };

const handleDeleteDistribuidor = async (rowData) => {
  console.log("Eliminar distribuidor:", rowData._id);

  try {
    const response = await fetch(`${backend_url}/eliminarUsuarioID/${rowData._id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      navigate("/admin");
    } else {
      const errorBody = await response.json();
    }
  } catch (error) {
  }
};

const handleViewCliente = (rowData) => {
  console.log("Ver cliente:", rowData._id);
  navigate(`/vistaDetalladaC/${rowData._id}`);
};

const handleViewEmpleado = (rowData) => {
  console.log("Ver empleado:", rowData._id);
  navigate(`/vistaDetalladaE/${rowData._id}`);
};

const handleViewDistribuidor = (rowData) => {
  console.log("Ver distribuidor:", rowData._id);
  navigate(`/vistaDetalladaD/${rowData._id}`);
};

  return (
    <div className="admin-container">
      <h1 className="text-white">Bienvenido Administrador</h1>
      <Tabs defaultActiveKey="clientes" id="admin-tabs">
        <Tab eventKey="clientes" title="Clientes">
          <div className="table-container">
            <DataTables rows={data} columns={columnsClientes} handleEdit={handleEditCliente} handleDelete={handleDeleteCliente} handleView={handleViewCliente}/>
          </div>
        </Tab>
        <Tab eventKey="empleados" title="Empleados">
          <div className="table-container">
            <DataTables rows={dataEmpleados} columns={columnsEmpleados} handleEdit={handleEditEmpleado} handleDelete={handleDeleteEmpleado} handleView={handleViewEmpleado}/>
          </div>
        </Tab>
        <Tab eventKey="distribuidores" title="Distribuidores">
          <div className="table-container">
            <DataTables rows={dataDistribuidores} columns={columnsDistribuidores} handleEdit={handleEditDistribuidor} handleDelete={handleDeleteDistribuidor} handleView={handleViewDistribuidor}/>
          </div>
        </Tab>
      </Tabs>
      <div className="text-white text-center">
        <Link to={"/crearEmpleado"}>
          <Button variant="light">Crear empleado</Button>
        </Link>{" "}
        <Link to={"/crearDistribuidor"}>
          <Button variant="success">Crear distribuidor</Button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
