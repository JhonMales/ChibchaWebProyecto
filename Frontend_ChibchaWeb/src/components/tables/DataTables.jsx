import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "react-bootstrap";

import "./DataTables.css";

const DataTables = ({ rows, columns, handleEdit, handleDelete, handleView }) => {
  const columnsWithEditButton = [
    ...columns,
    {
      field: "edit",
      headerName: "Editar",
      width: 100,
      renderCell: (params) => (
        <Button variant="primary" onClick={() => handleEdit(params.row)}>
          Editar
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Borrar",
      width: 100,
      renderCell: (params) => (
        <Button variant="danger" onClick={() => handleDelete(params.row)}>
          Borrar
        </Button>
      ),
    },
    {
      field: "view",
      headerName: "Ver",
      width: 100,
      renderCell: (params) => (
        <Button variant="secondary" onClick={() => handleView(params.row)}>
          Ver
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        className="table"
        rows={rows}
        columns={columnsWithEditButton}
        pageSize={5}
        pageSizeOptions={[5]}
      />
    </Box>
  );
};

DataTables.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      sortable: PropTypes.bool,
      description: PropTypes.string,
      valueGetter: PropTypes.func,
    })
  ).isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default DataTables;
