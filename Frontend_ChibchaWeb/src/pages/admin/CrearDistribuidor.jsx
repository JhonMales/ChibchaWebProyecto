import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../auth/LoginSignup.css";
import { backend_url } from "../../constantes";
import UpdateFormD from "../../components/form/UpdateFormD";


const CrearDistribuidor = () =>{

    const navigate = useNavigate();
    const [data, setData] = useState({
      razonSocial: "",
      nit: "",
      pais: "",
      ciudad: "",
      direccion: "",
      codigoPostal: "",
      telefono: "",
      correo: "",
      categoria: "",
    });

    async function handleRegisterDistribuidor() {
      for (const value of Object.values(data)) {
        if (value === "" || value === null || value === undefined) {
          alert("Por favor, completa todos los campos antes de continuar.");
          return;
        }
      }
      try {
        const response = await fetch(`${backend_url}/crearDistribuidor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
        console.log(response);
  
        if (response.ok) {
          // La actualización fue exitosa, puedes manejar la lógica que desees aquí
          console.log("Distribuidor registrado");
          navigate("/crearUsDistribuidor");
        } else {
          // Manejar errores en la respuesta
          console.error("Error al registrar distribuidor");
        }
      } catch (error) {
        // Manejar errores de la solicitud
        console.error("Error de red:", error);
      }
  };

    return(
        <UpdateFormD
        data={data}
        setData={setData}
        handleSubmit={handleRegisterDistribuidor}
        title={"Registrar distribuidor"}
        accion={"Registrar"}
        />
    );
}
export default CrearDistribuidor;