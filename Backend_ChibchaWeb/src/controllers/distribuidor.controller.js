import Distribuidores from "../models/distribuidor.model.js";
import Usuarios from '../models/usuario.model.js';

let idDistribuidor;

//Crear distribuidor
export const crearDistribuidor = async(req, res) => {
    const { razonSocial, nit, pais, ciudad, direccion, codigoPostal, telefono, correo, categoria } = req.body

    try 
    {
        const newDistribuidor = new Distribuidores({
            razonSocial, 
            nit, 
            pais, 
            ciudad, 
            direccion, 
            codigoPostal, 
            telefono, 
            correo, 
            categoria
        })

        const distribuidorSaved = await newDistribuidor.save();
        res.json(distribuidorSaved);

        idDistribuidor = distribuidorSaved._id;
    } 
    catch (error) 
    {
        console.log(error);
    }
};

//Obtener todos los distribuidores
export const obtenerDistribuidores = async(req, res) => {
    const distribuidores = await Distribuidores.find();
    res.json(distribuidores);
};

//Obtener distribuidor
export const obtenerDistribuidor = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    try 
    {
        const usuarioFound = await Usuarios.findById(idUsuario);    
        if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

        const idDistribuidor = usuarioFound.distribuidor;
        if (!idDistribuidor) return res.status(400).json({ message: 'Id del distribuidor no encontrado' });

        const distribuidorFound = await Distribuidores.findById(idDistribuidor);
        if(!distribuidorFound) return res.status(404).json({message: 'Distribuidor no encontrado'});

        res.json(distribuidorFound);
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//Obtener distribuidor por ID
export const obtenerDistribuidorID = async(req, res) => {
    const distribuidor = await Distribuidores.findById(req.params.id);
    if(!distribuidor) return res.status(404).json({message: 'Distribuidor no encontrado'});
    
    res.json(distribuidor);
}

//Actualizar distribuidor
export const actualizarDistribuidor = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    try 
    {
        const usuarioFound = await Usuarios.findById(idUsuario);    
        if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

        const idDistribuidor = usuarioFound.distribuidor;
        if (!idDistribuidor) return res.status(400).json({ message: 'Id del distribuidor no encontrado' });

        const distribuidorFound = await Distribuidores.findByIdAndUpdate(idDistribuidor, req.body, {
            new: true // Dar los datos actualizados
        });
        if(!distribuidorFound) return res.status(404).json({message: "Distribuidor no encontrado y no actualizado"});

        res.json(distribuidorFound);
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//Actualizar distribuidor por ID
export const actualizarDistribuidorID = async(req, res) => {
    const distribuidorFound = await Distribuidores.findByIdAndUpdate(req.params.id, req.body, {
        new: true // Dar los datos actualizados
    });

    if(!distribuidorFound) return res.status(404).json({message: "Distribuidor no encontrado y no actualizado"});
    res.json(distribuidorFound);
};

export { idDistribuidor };
