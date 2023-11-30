import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        asunto:
        {
            type: String,
            required: true,
            trim: true
        },
        descripcion:
        {
            type: String,
            required: true,
            trim: true
        },
        nivelServicio:
        {
            type: String,
            enum: ['Basico', 'Especializado', 'Funcional', 'Pendiente', 'Solucionado'],
            default: 'Pendiente'
        },
        fechaReporte:
        {
            type: Date,
            required: true,
        },
        fechaSolucion:
        {
            type: Date
        },
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clientes'
        },
        empleado: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Empleados'
        },
        distribuidor: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Distribuidores'
        }
    }
);

export default mongoose.model("Tickets", ticketSchema);