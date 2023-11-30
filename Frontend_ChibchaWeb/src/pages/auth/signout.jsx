import { useEffect } from "react"
import { useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../reducers/authSlice"

import { backend_url } from "../../constantes";

const Signout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {
        const logoutUser = async () => {
            try
            {
                const response = await fetch(`${backend_url}/cerrarSesion`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if(response.ok)
                {
                    dispatch(logout())
                    navigate("/")
                }
                else
                {
                    console.error("Error al cerrar sesión en el backend");
                }
            }
            catch(error)
            {
                console.error("Error en la solicitud de cerrar sesión", error);
            };
        };
        
        logoutUser();
    }, [dispatch, navigate]);  
};

export default Signout;