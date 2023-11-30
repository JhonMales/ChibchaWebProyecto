import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "react-bootstrap";

import "./DataTables.css";

const WebTables = ({ rows, columns, handleDelete, handleEdit }) => {
    const columnsWithEditButton = [
        ...columns,
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
            field: "edit",
            headerName: "Actualizar",
            width: 100,
            renderCell: (params) => (
                <Button variant="success" onClick={() => handleEdit(params.row)}>
                    Actualizar
                </Button>
            ),
        },
    ];

    return (
        <Box sx={{ height: 500, width: 400 }}>
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

WebTables.propTypes = {
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
    handleDelete: PropTypes.func.isRequired,
};

export default WebTables;
