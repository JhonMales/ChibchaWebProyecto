import { useState } from "react";
import { useSelector } from "react-redux";
import UpdateForm from "../../components/form/UpdateForm";
import { useParams, useNavigate } from "react-router-dom";
import { backend_url } from "../../constantes";
import { useEffect } from "react";

const CambiarUsuario = () => {

  const navigate = useNavigate();
  const { user, isAuthenticated, rol, token } = useSelector(state => state.auth);
  useEffect(()=>{
    if (!isAuthenticated || rol!='Cliente') {
      navigate("/");
    }
  },[])

  const [data, setData] = useState({
    usuario: user.usuario || "",
    clave: user.clave || "",
    rol: "Cliente"
  });

  const handleUpdate = async () => {
    if (!Object.values(data).some(value => value !== null && value !== "")) {
      alert("No se proporcionaron datos para actualizar");
      return;
    }
    try {
      const response = await fetch(`${backend_url}/actualizarUsuario`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include"
      });
  
      if (response.ok) {
        console.log("Datos actualizados correctamente");
        navigate("/cliente")
      } else {
        console.error("Error al actualizar datos");
        console.log(userId)
      }
    } catch (error) {
      console.error("Error de red:", error);
      console.log(userId)
    }
  };

  return (
    <UpdateForm
      title={"Actualizar usuario"}
      data={data}
      setData={setData}
      handleSubmit={handleUpdate}
    />
  );
};

export default CambiarUsuario;
