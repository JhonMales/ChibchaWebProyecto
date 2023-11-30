import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../auth/LoginSignup.css";
import { backend_url } from "../../constantes";
import EmpleadoForm from "../../components/form/EmpleadoForm";

const CrearEmpleado = () =>{

    const navigate = useNavigate();
  
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
      correo: ""
    });
  
    const handleRegisterEmpleado = async () => {
      for (const value of Object.values(data)) {
        if (value === "" || value === null || value === undefined) {
          alert("Por favor, completa todos los campos antes de continuar.");
          return;
        }
      }
      try {
        const response = await fetch(`${backend_url}/crearEmpleado`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
  
        if (response.ok) {
            // La actualización fue exitosa, puedes manejar la lógica que desees aquí
            console.log("Empleado registrado");
            navigate("/crearUsEmpleado");
          } else {
            // Manejar errores en la respuesta
            console.error("Error al registrar empledo");
          }
        } catch (error) {
          // Manejar errores de la solicitud
          console.error("Error de red:", error);
        }
    };

    return(
        <EmpleadoForm
        data={data}
        setData={setData}
        handleSubmit={handleRegisterEmpleado}
        title={"Registrar empleado"}
        accion={"Registrar"}
        />
    );
}
export default CrearEmpleado;