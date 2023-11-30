import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "../auth/LoginSignup.css";
import { backend_url } from "../../constantes";
import UpdateFormD from "../../components/form/UpdateFormD";


const EditarDistribuidor = () =>{

  const navigate = useNavigate()
  const {user, isAuthenticated, rol} = useSelector(state=>state.auth)
  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/signin")
    }
    if(rol!="Administrador"){
      navigate("/")
    }
  },[rol])

    const { id } = useParams(); 

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
      if (!Object.values(data).some(value => value !== null && value !== "")) {
        alert("No se proporcionaron datos para actualizar");
        return;
      }
      try {
        const response = await fetch(`${backend_url}/actualizarDistribuidorID/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
  
        if (response.ok) {
          // La actualización fue exitosa, puedes manejar la lógica que desees aquí
          console.log("Distribuidor registrado");
          navigate("/admin");
        } else {
          // Manejar errores en la respuesta
          console.error("Error al Actualizar distribuidor");
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
        title={"Actualizar distribuidor"}
        accion={"Actualizar"}
        />
    );
}
export default EditarDistribuidor;