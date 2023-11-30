import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
//import { useSelector, useDispatch } from "react-redux";
//import { login } from "../../reducers/authSlice";

import "./LoginSignup.css";
import { backend_url } from "../../constantes";

const SignUpUsuario = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        usuario: "",
        clave: "",
        confirmarClave: "",
        rol:"Cliente",
    });

    const [error, setError] = useState("");

    async function handleRegister() {
        if (!Object.values(data).some(value => value !== null && value !== "")) {
            alert("No se proporcionaron datos para actualizar");
            return;
          }
        
        if (data.clave !== data.confirmarClave) {
            setError("Error al registrarse");
            alert("Los campos de la contraseña no coinciden");
            return;
        }

        try 
        {
            const response = await fetch(`${backend_url}/registrarUsuario`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.status !== 200 && response.status !== 201) {
                throw new Error("Error al registrarse");
            }

            navigate("/signin");
        } 
        catch (error) 
        {
            alert("Error al registrarse");
        }
    }

    return (
        <Card className="containerRegister">
        <Card.Title className="text">Crear Usuario</Card.Title>
        <Form className="inputs">
            <Form.Group className="input">
                <Form.Control
                    type="text"
                    placeholder="Nombre de Usuario"
                    onChange={(e) =>
                    setData({
                        ...data,
                        usuario: e.target.value,
                    })
                    }
                />
            </Form.Group>
            <Form.Group className="input">
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
            <Form.Group className="input">
                <Form.Control
                    type="password"
                    placeholder="Confirmar Contraseña"
                    onChange={(e) =>
                    setData({
                        ...data,
                        confirmarClave: e.target.value,
                    })
                    }
                />
            </Form.Group>
        </Form>
        
        <Button type="submit" className="submit" onClick={handleRegister}>
            Guardar
        </Button>
        </Card>
    );
};

export default SignUpUsuario;
