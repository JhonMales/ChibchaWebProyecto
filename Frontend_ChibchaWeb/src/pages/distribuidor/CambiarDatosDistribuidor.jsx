import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdateFormD from "../../components/form/UpdateFormD";
import { useParams, useNavigate } from "react-router-dom";
import { backend_url } from "../../constantes";

const CambiarDatosDistribuidor = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {user, isAuthenticated, rol} = useSelector(state=>state.auth)
  const userId = user.distribuidor;
  console.log(user._$oid)
  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/signin")
    }
    if(rol!="Distribuidor"){
      navigate("/")
    }
  },[rol])

  const [data, setData] = useState({
    razonSocial: user.razonSocial,
    nit: user.nit,
    pais: user.pais,
    ciudad: user.ciudad,
    direccion: user.direccion,
    codigoPostal: user.codigoPostal,
    telefono: user.telefono,
    categoria: user.categoria,
    correo: user.correo,
  });

  const handleUpdate = async () => {
  // Validar que al menos un campo tenga datos
  if (!Object.values(data).some(value => value !== null && value !== "")) {
    alert("No se proporcionaron datos para actualizar");
    return;
  }

  try {
    const response = await fetch(`${backend_url}/actualizarDistribuidor`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include"
    });

    if (response.ok) {
      // La actualización fue exitosa, puedes manejar la lógica que desees aquí
      console.log("Datos actualizados correctamente");
      navigate("/distribuidor");
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
    <UpdateFormD
      title={"Actualizar datos"}
      data={data}
      setData={setData}
      handleSubmit={handleUpdate}
      accion={"Guardar"}
    />
  );
};

export default CambiarDatosDistribuidor;
