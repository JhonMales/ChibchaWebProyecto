import mongoose from "mongoose";

const transaccionSchema = new mongoose.Schema(
    {
        valorTotal:
        {
            type: Number,
            required: true,
        },
        porcentaje:
        {
            type: String,
            enum: ['10%', '15%'],
            default: '10%',
            required: true,
        },
        comision:
        {
            type: Number,
            required: true,
        },
        ingreso:
        {
            type: Number,
            required: true,
        },
        fechaPago:
        {
            type: Date,
            required: true,
        },
        medioPago: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MedioPagos' 
        },
        distribuidor: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Distribuidores'
        }
    }
);

export default mongoose.model("Transacciones", transaccionSchema);