import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditModal = ({ open, onClose, rowData, currentTable }) => {
  const [editedData, setEditedData] = useState({});

  // Lógica para obtener los campos de edición dependiendo de la tabla
  useEffect(() => {
    if (currentTable === "empleados") {
      setEditedData({
        nombres: rowData?.nombres || "",
        apellidos: rowData?.apellidos || "",
        telefono: rowData?.telefono || "",
      });
    } else if (currentTable === "distribuidores") {
      setEditedData({
        pais: rowData?.pais || "",
        ciudad: rowData?.ciudad || "",
        direccion: rowData?.direccion || "",
        telefono: rowData?.telefono || "",
        categoria: rowData?.categoria || "",
      });
    }
  }, [currentTable, rowData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    // Lógica para enviar la solicitud de edición al backend
    const url = `https://tu-api.com/${currentTable}/${rowData.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al editar el ${currentTable}`);
        }
        return response.json();
      })
      .then((editedRecord) => {
        console.log(`${currentTable} editado:`, editedRecord);
        onClose();
      })
      .catch((error) => {
        console.error(`Error en la edición de ${currentTable}:`, error);
      });
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar {currentTable}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Renderiza campos de edición según la tabla actual */}
          {currentTable === "empleados" && (
            <>
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombres"
                  value={editedData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formApeliido">
                <Form.Label>apellidos</Form.Label>
                <Form.Control
                  type="text"
                  name="apellidos"
                  value={editedData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formTelefono">
                <Form.Label>apellidos</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={editedData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              {/* Agrega más campos según tus necesidades para clientes */}
            </>
          )}
          {currentTable === "distribuidores" && (
            <>
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombres"
                  value={editedData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formApeliido">
                <Form.Label>apellidos</Form.Label>
                <Form.Control
                  type="text"
                  name="apellidos"
                  value={editedData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formTelefono">
                <Form.Label>apellidos</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={editedData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </>
          )}
          {/* Repite el patrón para otras tablas */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
