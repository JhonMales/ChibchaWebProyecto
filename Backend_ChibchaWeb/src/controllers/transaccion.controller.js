import Transacciones from "../models/transaccion.model.js";
import Usuarios from "../models/usuario.model.js";
import Distribuidores from "../models/distribuidor.model.js";
import MedioPagos from "../models/medioPago.model.js";

export const crearTransaccion = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    try 
    {
        const { fechaPago } = req.body;

        const usuarioFound = await Usuarios.findById(idUsuario);    
        if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });
        
        const idCliente = usuarioFound.cliente;
        if (!idCliente) return res.status(400).json({ message: 'ID del Cliente no encontrado' });

        const medioPago = await MedioPagos.findOne({ cliente: idCliente, activo: true });
        if (!medioPago) return res.status(400).json({ message: 'Ningún Medio de Pago ha sido registrado aún' });

        const idMedioPago = medioPago._id;

        const planHosting = medioPago.planHosting;
        const planPago = medioPago.planPago;

        let valorTotal;

        if(planPago === 'Mensual')
        {
            if(planHosting === 'ChibchaPlata')
            {
                valorTotal = 12400;
            }
            else if(planHosting === 'ChibchaOro')
            {
                valorTotal = 23100;
            }
            else if(planHosting === 'ChibchaPlatino')
            {
                valorTotal = 66700;
            }
        }
        else if(planPago === 'Trimestral')
        {
            if(planHosting === 'ChibchaPlata')
            {
                valorTotal = 36000;
            }
            else if(planHosting === 'ChibchaOro')
            {
                valorTotal = 65000;
            }
            else if(planHosting === 'ChibchaPlatino')
            {
                valorTotal = 195000;
            }
        }
        else if(planPago === 'Semestral')
        {
            if(planHosting === 'ChibchaPlata')
            {
                valorTotal = 70000;
            }
            else if(planHosting === 'ChibchaOro')
            {
                valorTotal = 125000;
            }
            else if(planHosting === 'ChibchaPlatino')
            {
                valorTotal = 380000;
            }
        }
        else if(planPago === 'Anual')
        {
            if(planHosting === 'ChibchaPlata')
            {
                valorTotal = 124000;
            }
            else if(planHosting === 'ChibchaOro')
            {
                valorTotal = 231000;
            }
            else if(planHosting === 'ChibchaPlatino')
            {
                valorTotal = 667000;
            }
        }

        //Obtener un Distribuidor aleatorio de la base de datos
        const distribuidorAleatorio = await Distribuidores.aggregate([
            { $sample: { size: 1 } }
        ]);

        const idDistribuidor = distribuidorAleatorio[0]._id;
        const categoriaDistribuidor = distribuidorAleatorio[0].categoria;

        let porcentajeDistribuidor;
        let porcentajeNumber;

        if(categoriaDistribuidor === 'Basico')
        {
            porcentajeDistribuidor = '10%';
            porcentajeNumber = 0.1;
        }
        else
        {
            porcentajeDistribuidor = '15%';
            porcentajeNumber = 0.15;
        }

        const comision = valorTotal * porcentajeNumber;
        const ingreso = valorTotal - comision;

        const newTransaccion = new Transacciones({
            valorTotal: valorTotal,
            porcentaje: porcentajeDistribuidor,
            comision: comision,
            ingreso: ingreso,
            fechaPago: fechaPago,
            medioPago: idMedioPago,
            distribuidor: idDistribuidor
        });

        const savedTransaccion = await newTransaccion.save();
        res.json(savedTransaccion);
    } 
    catch(error) 
    {
        return res.status(500).json({ message: error.message });    
    }    
};

export const generarTransaccion = async(req, res) => {

};

export const obtenerTransacciones = async(req, res) => {
    
};

export const obtenerTransaccion = async(req, res) => {
    
};