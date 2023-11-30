import Dominios from "../models/dominio.model.js";
import Usuarios from "../models/usuario.model.js";
import Distribuidores from "../models/distribuidor.model.js";

//Variable para almacenar el ID del Dominio
let idDominio;

export const registrarDominio = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    try 
    {
        const { nombreDominio, fechaSolicitud, estado } = req.body;
        
        const usuarioFound = await Usuarios.findById(idUsuario);    
        if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

        const idCliente = usuarioFound.cliente;
        if (!idCliente) return res.status(400).json({ message: 'Id del cliente no encontrado' });

        //Obtener un Distribuidor aleatorio de la base de datos
        const distribuidorAleatorio = await Distribuidores.aggregate([
            { $sample: { size: 1 } }
        ]);

        const idDistribuidor = distribuidorAleatorio[0]._id;

        const newDominio = new Dominios({
            nombreDominio,
            fechaSolicitud,
            estado,
            distribuidor: idDistribuidor 
        });

        const savedDominio = await newDominio.save();
        res.json(savedDominio);

        idDominio = savedDominio._id;
    } 
    catch(error) 
    {
        return res.status(500).json({ message: error.message });
    }
};

export const obtenerDominiosPendientes = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    const usuarioFound = await Usuarios.findById(idUsuario);    
    if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

    const idDistribuidor = usuarioFound.distribuidor;
    if (idDistribuidor === undefined || idDistribuidor === null) 
    {
        return res.status(400).json({ message: 'ID del Distribuidor no encontrado en el usuario' });
    }

    try 
    {
        const dominios = await Dominios.find({ distribuidor: idDistribuidor, estado: 'Pendiente' });
        res.json(dominios);
    } 
    catch (error) 
    {
        return res.status(500).json({ message: error.message });
    }
};

export const obtenerDominiosAprobados = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    const usuarioFound = await Usuarios.findById(idUsuario);    
    if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

    const idDistribuidor = usuarioFound.distribuidor;
    if (idDistribuidor === undefined || idDistribuidor === null) 
    {
        return res.status(400).json({ message: 'ID del Distribuidor no encontrado en el usuario' });
    }

    try 
    {
        const dominios = await Dominios.find({ distribuidor: idDistribuidor, estado: 'Aprobado' });
        res.json(dominios);
    } 
    catch (error) 
    {
        return res.status(500).json({ message: error.message });
    }
};

export const actualizarDominio = async(req, res) => {
    const dominio = await Dominios.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!dominio) return res.status(404).json({message: 'Dominio no actualizado'});

    res.json(dominio);
};

export const eliminarDominio = async(req, res) => {
    const dominio = await Dominios.findByIdAndDelete(req.params.id);
    if (!dominio) return res.status(404).json({message: 'Dominio no encontrado'});

    res.json(dominio);
};

export { idDominio };