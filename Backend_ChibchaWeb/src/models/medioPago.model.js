import mongoose from "mongoose";

const medioPagoSchema = new mongoose.Schema(
    {
        tipoTarjeta:
        {
            type: String,
            enum: ['Visa', 'Mastercard', 'Diners'],
            trim: true
        },
        numeroTarjeta:
        {
            type: String,
            required: true,
            trim: true
        },
        fechaVencimiento:
        {
            type: Date,
            required: true
        },
        codigoSeguridad:
        {
            type: String,
            required: true,
            trim: true
        },
        planHosting:
        {
            type: String,
            enum: ['ChibchaPlata', 'ChibchaOro', 'ChibchaPlatino'],
            default: 'ChibchaPlata',
            trim: true
        },
        planPago:
        {
            type: String,
            enum: ['Mensual', 'Trimestral', 'Semestral', 'Anual'],
            default: 'Mensual',
            trim: true
        },
        activo:
        {
            type: Boolean,
            required: true,
        },
        cliente:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clientes'
        }
    }
);

export default mongoose.model("MedioPagos", medioPagoSchema);