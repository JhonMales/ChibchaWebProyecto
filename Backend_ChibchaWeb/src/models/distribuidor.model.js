import mongoose from "mongoose";

const distribuidorSchema = new mongoose.Schema(
    {
        razonSocial:
        {
            type: String,
            required: true,
            trim: true
        },
        nit:
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
        },
        categoria:
        {
            type: String,
            enum: ['Basico', 'Premium'],
            default: 'Basico',
        },
    }
);

export default mongoose.model("Distribuidores", distribuidorSchema);