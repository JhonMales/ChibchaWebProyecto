import { Button, Card, Form } from "react-bootstrap";

const UpdateFormD = ({data, setData, handleSubmit, title, accion}) => {
return (
    <Card className="containerRegister">
    <Card.Title className="text">{title}</Card.Title>
    <Form className="inputs">
        <Form.Group className="input">
            <Form.Control
                type="text"
                placeholder="Razón  social"
                onChange={(e) =>
                setData({
                    ...data,
                    razonSocial: e.target.value,
                })
                }
            />
            <Form.Control
                type="number"
                placeholder="nit"
                onChange={(e) =>
                setData({
                    ...data,
                    nit: e.target.value,
                })
                }
            />
        </Form.Group>
        <Form.Group className="input">
            <Form.Control
                type="text"
                placeholder="País"
                onChange={(e) =>
                setData({
                    ...data,
                    pais: e.target.value,
                })
                }
            />
            <Form.Control
                type="text"
                placeholder="Ciudad"
                onChange={(e) =>
                setData({
                    ...data,
                    ciudad: e.target.value,
                })
                }
            />
            <Form.Control
                type="text"
                placeholder="Dirección "
                onChange={(e) =>
                setData({
                    ...data,
                    direccion: e.target.value,
                })
                }
            />
        </Form.Group>
        <Form.Group className="input">
            <Form.Control
                type="number"
                placeholder="Código postal"
                onChange={(e) =>
                setData({
                    ...data,
                    codigoPostal: e.target.value,
                })
                }
            />
            <Form.Control
                type="number"
                placeholder="Teléfono"
                onChange={(e) =>
                setData({
                    ...data,
                    telefono: e.target.value,
                })
                }
            />
            <Form.Control
                type="email"
                placeholder="Correo"
                onChange={(e) =>
                setData({
                    ...data,
                    correo: e.target.value,
                })
                }
            />
        </Form.Group>
        <Form.Group className="input">
        <Form.Select
                value={data.categoria}
                placeholder="Categoria"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    categoria: e.target.value,
                  })
                }
              >
                <option value="">Elige la categoria</option>
                <option value="Basico">Básico</option>
                <option value="Premium">Premium</option>
              </Form.Select>
        </Form.Group>
    </Form>
    
    <Button type="submit" className="submit" onClick={handleSubmit}>
        {accion}
    </Button>
    </Card>
);
}
export default UpdateFormD;