import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";

import "../auth/LoginSignup.css";
import { backend_url } from "../../constantes";
import EmpleadoForm from "../../components/form/EmpleadoForm";

const CrearUsEmpleado = () =>{

    const navigate = useNavigate();
  
    const [data, setData] = useState({
        usuario: "",
        clave: "",
        rol:"Empleado"
    });
  
    const [error, setError] = useState("");

    async function handleRegisterEmpleado() {
        //console.log("Datos del formulario:", data);
        for (const value of Object.values(data)) {
            if (value === "" || value === null || value === undefined) {
              alert("Por favor, completa todos los campos antes de continuar.");
              return;
            }
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

            navigate("/admin");
        } 
        catch (error) 
        {
            alert("Error al registrarse");
        }
    }

    return(
        <Card className="containerRegister">
        <Card.Title className="text">Crear empleado</Card.Title>
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
        
        <Button type="submit" className="submit" onClick={handleRegisterEmpleado}>
            Guardar
        </Button>
        </Card>
    );
}
export default CrearUsEmpleado;