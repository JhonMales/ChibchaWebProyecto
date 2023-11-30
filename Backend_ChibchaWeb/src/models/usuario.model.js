import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        usuario:
        {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        clave:
        {
            type: String,
            required: true,
            trim: true
        },
        rol:
        {
            type: String,
            enum: ['Administrador', 'Empleado', 'Distribuidor', 'Cliente'],
            default: 'Cliente'
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

export default mongoose.model("Usuarios", usuarioSchema);
