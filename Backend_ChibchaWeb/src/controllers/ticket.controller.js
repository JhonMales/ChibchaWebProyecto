import Tickets from "../models/ticket.model.js";
import Usuarios from "../models/usuario.model.js";

export const crearTicket = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    try 
    {
        let newTicket;

        const { asunto, descripcion, nivelServicio, fechaReporte, rol } = req.body;
        
        const usuarioFound = await Usuarios.findById(idUsuario);    
        if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

        switch(rol) 
        {
            case 'Cliente':
                const idCliente = usuarioFound.cliente;
                if (!idCliente) return res.status(400).json({ message: 'Id del cliente no encontrado' });

                newTicket = new Tickets({
                    asunto,
                    descripcion,
                    nivelServicio,
                    fechaReporte,
                    cliente: idCliente 
                });
                break;

            case 'Empleado':
                const idEmpleado = usuarioFound.empleado;
                if (!idEmpleado) return res.status(400).json({ message: 'Id del cliente no encontrado' });

                newTicket = new Tickets({
                    asunto,
                    descripcion,
                    nivelServicio,
                    fechaReporte,
                    empleado: idEmpleado 
                });
                break;

            case 'Distribuidor':
                const idDistribuidor = usuarioFound.distribuidor;
                if (!idDistribuidor) return res.status(400).json({ message: 'Id del cliente no encontrado' });

                newTicket = new Tickets({
                    asunto,
                    descripcion,
                    nivelServicio,
                    fechaReporte,
                    distribuidor: idDistribuidor 
                });
                break;
        }

        const savedTicket = await newTicket.save();
        res.json(savedTicket);
    } 
    catch (error) 
    {
        return res.status(500).json({ message: error.message });
    }
};

export const obtenerTickets = async(req, res) => {
    try 
    {
        const tickets = await Tickets.find({ nivelServicio: { $ne: 'Solucionado' } });
        res.json(tickets);
    } 
    catch (error) 
    {
        return res.status(500).json({ message: error.message });
    }
};

export const obtenerTicket = async(req, res) => {
    const ticket = await Tickets.findById(req.params.id);
    if(!ticket) return res.status(404).json({message: 'Ticket no encontrado'});
    res.json(ticket);
};

export const actualizarTicket = async(req, res) => {
    const ticket = await Tickets.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!ticket) return res.status(404).json({message: 'Ticket no actualizado'});

    res.json(ticket);
};

export const eliminarTicket = async(req, res) => {
    const ticket = await Tickets.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({message: 'Ticket no encontrado'});
    res.json(ticket);
};