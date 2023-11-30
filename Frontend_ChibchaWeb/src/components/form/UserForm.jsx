import { Button, Card, Form } from "react-bootstrap";

const UserForm = ({data, setData, handleSubmit, title}) => {
    
    return (
        <Card className="containerRegister">
          <Card.Title className="text">{title}</Card.Title>
          <Form className="inputs">
            <Form.Group className="input">
              <Form.Control
                type="text"
                placeholder="Nombres"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    nombres: e.target.value,
                    
                  })
                }
              />
              <Form.Control
                type="text"
                placeholder="Apellidos"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    apellidos: e.target.value,
                  })
                }
              />
            </Form.Group>
    
            <Form.Group className="input">
              <Form.Select
                value={data.tipoDocumento}
                placeholder="Tipo de Documento"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    tipoDocumento: e.target.value,
                  })
                }
              >
                <option value="">Elige el tipo de documento</option>
                <option value="CC">CC</option>
                <option value="CE">CE</option>
                <option value="DNI">DNI</option>
              </Form.Select>
    
              <Form.Control
                type="text"
                placeholder="Número de Documento"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    documentoIdentificacion: e.target.value,
                  })
                }
              />
            </Form.Group>
    
            <Form.Group className="input">
              <Form.Control
                type="text"
                placeholder="País"
                required
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
                required
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
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    direccion: e.target.value,
                  })
                }
              />
              <Form.Control
                type="number"
                placeholder="Código Postal"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    codigoPostal: e.target.value,
                  })
                }
              />
            </Form.Group>
    
            <Form.Group className="input">
              <Form.Control
                type="tel"
                placeholder="Teléfono"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    telefono: e.target.value,
                  })
                }
              />
              <Form.Control
                type="email"
                placeholder="Correo electrónico"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    correo: e.target.value,
                  })
                }
              />
            </Form.Group>
    
            <Form.Group className="input">
              <Form.Control
                type="date"
                placeholder="Fecha de nacimiento"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    fechaNacimiento: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
          <Button type="submit" className="submit" onClick={handleSubmit}>
            Continuar
          </Button>
        </Card>
      );
}

export default UserForm;