import mongoose from "mongoose";

const dominioSchema = new mongoose.Schema(
    {
        nombreDominio:
        {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        fechaSolicitud:
        {
            type: Date,
            required: true
        },
        estado:
        {
            type: String,
            enum: ['Pendiente', 'Aprobado', 'Rechazado'],
            default: 'Pendiente'
        },
        distribuidor: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Distribuidores'
        }
    }
);

export default mongoose.model("Dominios", dominioSchema);
