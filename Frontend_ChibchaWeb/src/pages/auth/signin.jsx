import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Form, Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../reducers/authSlice";

import { backend_url } from "../../constantes";

import "./LoginSignup.css";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /*const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);*/

  const [data, setData] = useState({
    usuario: "",
    clave: "",
  });

  async function handleLogin(e) {
    e.preventDefault();
    if (!Object.values(data).some(value => value !== null && value !== "")) {
      alert("No se proporcionaron datos para actualizar");
      return;
    }
    try {
      const response = await fetch(`${backend_url}/iniciarSesion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      // Verifica si la solicitud se realizó correctamente.
      if (response.status !== 200 && response.status !== 201) {
        // Rechaza la promesa con un error.
        throw new Error("Error al iniciar sesion");
      }
      // Resuelve la promesa con los datos del usuario recién creado.
      const user = await response.json();
      const payload = {
        user: user,
      };
      dispatch(login(payload));
      if (user.rol === "Administrador") {
        navigate("/admin");
      } else if (user.rol === "Cliente") {
        navigate("/cliente");
      }else if (user.rol === "Empleado") {
        navigate("/empleado");
      }else if (user.rol === "Distribuidor") {
        navigate("/distribuidor");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  }

  return (
    <Card className="containerRegister">
      <Card.Title className="text">Iniciar sesión</Card.Title>
      <Form className="inputs" onSubmit={handleLogin}>
        <Form.Group className="input d-flex align-items-center">
          {/*Usuario*/}
          <Form.Control
            type="text"
            placeholder="Nombre de usuario"
            onChange={(e) =>
              setData({
                ...data,
                usuario: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="input">
          {/*Contraseña*/}
          <Form.Control
            type="password"
            placeholder="Contraseña"
            onChange={(e) =>
              setData({
                ...data,
                clave: e.target.value,
              })
            }
          />
        </Form.Group>
        <Button type="submit" className="submit">
          Iniciar sesión
        </Button>
      </Form>
    </Card>
  );
};

export default SignIn;
