import mongoose from "mongoose";

const paginaWebSchema = new mongoose.Schema(
    {
        nombreSitio:
        {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        url:
        {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        cliente:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clientes'
        },
        dominio:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dominios'
        }
    }
);

export default mongoose.model("PaginasWebs", paginaWebSchema);