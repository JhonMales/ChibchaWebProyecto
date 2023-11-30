import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../../components/form/UserForm";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../reducers/authSlice";

import "./LoginSignup.css";
import { backend_url } from "../../constantes";

const SignUp = () => {
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
    fechaNacimiento: "",
    correo: ""
  });

  async function handleRegister() {
    if (!Object.values(data).some(value => value !== null && value !== "")) {
      alert("No se proporcionaron datos para actualizar");
      return;
    }
    try {
      const response = await fetch(`${backend_url}/crearCliente`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Error al registrarse");
      }
      navigate("/signupUsuario");
    } catch (error) {
      alert("Error al registrarse");
    }
  }
  return <UserForm title={"Registrarse"} data={data} setData={setData} handleSubmit={handleRegister}/>
};

export default SignUp;