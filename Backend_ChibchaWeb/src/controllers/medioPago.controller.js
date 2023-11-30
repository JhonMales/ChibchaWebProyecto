import MedioPagos from "../models/medioPago.model.js";
import Usuarios from "../models/usuario.model.js";

export const crearMedioPago = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    try 
    {
        const { tipoTarjeta, numeroTarjeta, fechaVencimiento, codigoSeguridad, planHosting, planPago, activo } = req.body;
        
        const usuarioFound = await Usuarios.findById(idUsuario);    
        if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

        const idCliente = usuarioFound.cliente;
        if (!idCliente) return res.status(400).json({ message: 'ID del Cliente no encontrado' });

        const newMedioPago = new MedioPagos({
            tipoTarjeta,
            numeroTarjeta,
            fechaVencimiento,
            codigoSeguridad,
            planHosting,
            planPago,
            activo,
            cliente: idCliente
        });

        const savedMedioPago = await newMedioPago.save();
        res.json(savedMedioPago);
    } 
    catch (error) 
    {
        return res.status(500).json({ message: error.message });
    }
};

export const obtenerMediosPago = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    const usuarioFound = await Usuarios.findById(idUsuario);    
    if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

    const idCliente = usuarioFound.cliente;

    try 
    {
        const mediosPago = await MedioPagos.find({ cliente: idCliente });
        res.json(mediosPago);
    } 
    catch(error) 
    {
        return res.status(500).json({ message: error.message });
    }
};

export const obtenerMedioPago = async(req, res) => {
    const medioPago = await MedioPagos.findById(req.params.id);
    if(!medioPago) return res.status(404).json({message: 'Medio de Pago no encontrado'});
    
    res.json(medioPago);
};

export const actualizarMedioPago = async(req, res) => {
    const medioPago = await MedioPagos.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!medioPago) return res.status(404).json({message: 'Medio de Pago no actualizado'});

    res.json(medioPago);
};