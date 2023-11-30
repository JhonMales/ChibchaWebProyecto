import { Button, Card, Form } from "react-bootstrap";

const UpdateForm = ({data, setData, handleSubmit, title}) => {
return (
    <Card className="containerRegister">
    <Card.Title className="text">{title}</Card.Title>
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
    
    <Button type="submit" className="submit" onClick={handleSubmit}>
        Guardar
    </Button>

    </Card>
);
}
export default UpdateForm;