import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserForm from "../../components/form/UserForm";
import { useParams, useNavigate } from "react-router-dom";
import { backend_url } from "../../constantes";

const CambiarDatos = () => {

  const navigate = useNavigate();
  const { user, isAuthenticated, rol, token } = useSelector(state => state.auth);

  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/signin")
    }
    if(rol!="Cliente"){
      navigate("/")
    }
  },[rol])

  const [data, setData] = useState({
    nombres: user.nombres || "",
    apellidos: user.apellidos || "",
    documentoIdentificacion: user.documentoIdentificacion || "",
    tipoDocumento: user.tipoDocumento || "",
    telefono: user.telefono || "",
    pais: user.pais || "",
    ciudad: user.ciudad || "",
    direccion: user.direccion || "",
    codigoPostal: user.codigoPostal || "",
    fechaNacimiento: user.fechaNacimiento || "",
    correo: user.correo || "",
  });

  const handleUpdate = async () => {
    if (!Object.values(data).some(value => value !== null && value !== "")) {
      alert("No se proporcionaron datos para actualizar");
      return;
    }
    try {
      const response = await fetch(`${backend_url}/actualizarCliente`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
        credentials: "include"
      });
  
      if (response.ok) {
        // La actualización fue exitosa, puedes manejar la lógica que desees aquí
        console.log("Datos actualizados correctamente");
        navigate("/cliente");
      } else {
        // Manejar errores en la respuesta
        console.error("Error al actualizar datos");
      }
      
    } catch (error) {
      // Manejar errores de la solicitud
      console.error("Error de red:", error);
    }
  };

  return (
    <UserForm
      title={"Actualizar datos"}
      data={data}
      setData={setData}
      handleSubmit={handleUpdate}
    />
  );
};

export default CambiarDatos;
