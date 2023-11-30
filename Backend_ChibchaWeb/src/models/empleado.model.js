import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema(
    {
        nombres:
        {
            type: String,
            required: true,
            trim: true
        },
        apellidos:
        {
            type: String,
            required: true,
            trim: true
        },
        tipoDocumento:
        {
            type: String,
            enum: ['CC', 'CE', 'DNI'],
            default: 'CC',
            trim: true
        },
        documentoIdentificacion:
        {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        pais:
        {
            type: String,
            required: true,
            trim: true
        },
        ciudad:
        {
            type: String,
            required: true,
            trim: true
        },
        direccion:
        {
            type: String,
            required: true,
            trim: true
        },
        codigoPostal:
        {
            type: String,
            required: true,
            trim: true
        },
        telefono:
        {
            type: String,
            required: true,
            trim: true
        },
        correo:
        {
            type: String,
            required: true,
            trim: true
        }
    }
);

export default mongoose.model("Empleados", empleadoSchema);