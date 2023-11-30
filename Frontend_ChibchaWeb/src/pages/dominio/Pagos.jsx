import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../reducers/authSlice";

import "../auth/LoginSignup.css";
import { backend_url } from "../../constantes";

const Pagos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  const [data, setData] = useState({
    numeroTarjeta: "",
    tipoTarjeta: "",
    fechaVencimiento: "",
    codigoSeguridad: "",
    planHosting: "",
    planPago: "",
    activo:"true",
  });

  async function handleVerify() {
    // Verificar que todos los campos estén llenos
    for (const value of Object.values(data)) {
      if (value === "" || value === null || value === undefined) {
        alert("Por favor, completa todos los campos antes de continuar.");
        return;
      }
    }
  
    try {
      const response = await fetch(`${backend_url}/obtenerMediosPago`, {
        method: "GET",
        credentials: "include",
      });
  
      if (response.ok) {
        const mediosPago = await response.json();
        const tarjetaRegistrada = mediosPago.some(
          (medio) => medio.numeroTarjeta === data.numeroTarjeta
        );
  
        if (tarjetaRegistrada) {
          alert(
            "La tarjeta ya está registrada. Por favor, utiliza otra tarjeta."
          );
        } else {
          handleRegister();
        }
      } else {
        const errorBody = await response.json();
        console.error("Error al obtener medios de pago:", errorBody);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }


  async function handleRegister() {
    try {
      const response = await fetch(`${backend_url}/crearMedioPago`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (response.ok) {
        console.log("Medio de pago creado");
        navigate("/dominio");
      } else {
        const errorBody = await response.json();
        console.error("Error al crear medio de pago:", errorBody);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  return (

    <Card className="containerRegister">
      <Card.Title className="text">Método de pago</Card.Title>
      <Form className="inputs">
        <Form.Group className="input">
          {/*Metodos de pago*/}
            <Form.Control
                type="number"
                placeholder="Numero de tarjeta"
                onChange={(e) =>
                setData({
                    ...data,
                    numeroTarjeta: e.target.value,
                })
                }
            />
            <Form.Control
                type="date"
                placeholder="Fecha de vencimiento"
                onChange={(e) => {
                    const fecha = new Date(e.target.value);
                    const fechaFormateada = fecha.toISOString().substring(0, 10); 
                    setData({
                        ...data,
                        fechaVencimiento: fechaFormateada,
                    });
                }}
            />
            <Form.Control
                type="number"
                placeholder="Codigo de seguridad"
                onChange={(e) =>
                setData({
                    ...data,
                    codigoSeguridad: e.target.value,
                })
                }
                maxLength="3"
            />
            <Form.Select
                value={data.tipoDocumento}
                placeholder="Tipo de tarjeta"
                onChange={(e) =>
                setData({
                    ...data,
                    tipoTarjeta: e.target.value,
                })
                }
            >
                <option value="">Elige el tipo de tarjeta</option>
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="Diners">Diners</option>
            </Form.Select>
         </Form.Group>

         <Form.Group className="input">
            <Form.Select
                value={data.planHosting}
                placeholder="Plan de hosting"
                onChange={(e) =>
                setData({
                    ...data,
                    planHosting: e.target.value,
                })
                }
            >
                <option value="">Elige el plan de hosting</option>
                <option value="ChibchaPlatino">ChibchaPlatino</option>
                <option value="ChibchaPlata">ChibchaPlata</option>
                <option value="ChibchaOro">ChibchaOro</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="input">
            <Form.Select
                value={data.planPago}
                placeholder="Plan de pago"
                onChange={(e) =>
                setData({
                    ...data,
                    planPago: e.target.value,
                })
                }
            >
                <option value="">Elige el Plan de pago</option>
                <option value="Mensual">Mensual</option>
                <option value="Trimestral">Trimestral</option>
                <option value="Semestral">Semestral</option>
                <option value="Anual">Anual</option>
            </Form.Select>
         </Form.Group>
      </Form>
      <Button type="submit" className="submit" onClick={handleVerify}>
        Pagar
      </Button>
    </Card>

  );
};

export default Pagos;
