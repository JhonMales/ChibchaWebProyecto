import PaginasWebs from "../models/paginaWeb.model.js";
import Usuarios from "../models/usuario.model.js";
import MedioPagos from "../models/medioPago.model.js";
import { idDominio } from "./dominio.controller.js";

export const crearPagina = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    try 
    {
        const { nombreSitio, url } = req.body;
        
        const usuarioFound = await Usuarios.findById(idUsuario);    
        if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

        const idCliente = usuarioFound.cliente;
        if (!idCliente) return res.status(400).json({ message: 'ID del Cliente no encontrado' });

        const numeroPaginas = await PaginasWebs.countDocuments({ cliente: idCliente })

        const medioPago = await MedioPagos.findOne({ cliente: idCliente, activo: true });
        if (!medioPago) return res.status(400).json({ message: 'Ningún Medio de Pago ha sido registrado aún' });

        const planHosting = medioPago.planHosting;

        //ChibchaPlata límite de 1 Pagina Web
        if(planHosting === 'ChibchaPlata' && numeroPaginas >= 1)
        {
            return res.status(403).json({ message: 'El Cliente no puede crear más Paginas Web por su plan vigente' });
        }
        //ChibchaOro límite de 2 Paginas Web
        else if(planHosting === 'ChibchaOro' && numeroPaginas >= 2)
        {
            return res.status(403).json({ message: 'El Cliente no puede crear más Paginas Web por su plan vigente' });
        }
        //ChibchaPlatino límite de 10 Paginas Web
        else if(planHosting === 'ChibchaPlatino' && numeroPaginas >= 10)
        {
            return res.status(403).json({ message: 'El Cliente no puede crear más Paginas Web por su plan vigente' });
        }
        else
        {
            const newPagina = new PaginasWebs({
                nombreSitio,
                url,
                cliente: idCliente,
                dominio: idDominio
            });
    
            const savedPagina = await newPagina.save();
            res.json(savedPagina);
        }
    }
    catch(error) 
    {
        return res.status(500).json({ message: error.message });
    }
};

export const obtenerPaginas = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    const usuarioFound = await Usuarios.findById(idUsuario);    
    if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

    const idCliente = usuarioFound.cliente;

    try 
    {
        const paginas = await PaginasWebs.find({ cliente: idCliente });
        res.json(paginas);
    } 
    catch(error) 
    {
        return res.status(500).json({ message: error.message });
    }
};

export const obtenerPagina = async(req, res) => {
    const pagina = await PaginasWebs.findById(req.params.id);
    if(!pagina) return res.status(404).json({message: 'Pagina Web no encontrada'});
    
    res.json(pagina);
};

export const actualizarPagina = async(req, res) => {
    const pagina = await PaginasWebs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!pagina) return res.status(404).json({message: 'Pagina Web no actualizada'});

    res.json(pagina);
};

export const eliminarPagina = async(req, res) => {
    const pagina = await PaginasWebs.findByIdAndDelete(req.params.id);
    if (!pagina) return res.status(404).json({message: 'Pagina Web no encontrada'});

    res.json(pagina);
}