import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../auth/LoginSignup.css";
import { backend_url } from "../../constantes";
import EmpleadoForm from "../../components/form/EmpleadoForm";

const EditarEmpleado = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    nombres: "",
    apellidos: "",
    documentoIdentificacion: "",
    tipoDocumento: "",
    telefono: "",
    pais: "",
    ciudad: "",
    direccion: "",
    codigoPostal: "",
    correo: "",
  });

  const handleUpdateEmpleado = async () => {
    console.log("Datos del formulario:", data);

    if (!Object.values(data).some(value => value !== null && value !== "")) {
      alert("No se proporcionaron datos para actualizar");
      return;
    }
    try {
      const response = await fetch(`${backend_url}/actualizarEmpleadoID/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        // La actualización fue exitosa, puedes manejar la lógica que desees aquí
        console.log("Empleado actualizado");
        navigate("/admin");
      } else {
        // Manejar errores en la respuesta
        console.error("Error al actualizar empleado");
      }
    } catch (error) {
      // Manejar errores de la solicitud
      console.error("Error de red:", error);
    }
  };

  return (
    <EmpleadoForm
      data={data}
      setData={setData}
      handleSubmit={handleUpdateEmpleado}
      title={"Actualizar empleado"}
      accion={"Actualizar"}
    />
  );
};

export default EditarEmpleado;
