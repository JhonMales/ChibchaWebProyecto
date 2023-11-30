import Empleados from "../models/empleado.model.js";
import Usuarios from '../models/usuario.model.js';

//Variable para almacenar el ID del empleado
let idEmpleado;

//Crear empleado
export const crearEmpleado = async(req, res) => {
    const { nombres, apellidos, tipoDocumento, documentoIdentificacion, 
            pais, ciudad, direccion, codigoPostal, telefono, correo } = req.body

    try 
    {
        const newEmpleado = new Empleados({
            nombres, 
            apellidos, 
            tipoDocumento, 
            documentoIdentificacion, 
            pais, 
            ciudad, 
            direccion, 
            codigoPostal, 
            telefono, 
            correo
        })

        const empleadoSaved = await newEmpleado.save();
        res.json(empleadoSaved);

        idEmpleado = empleadoSaved._id;
    } 
    catch (error) 
    {
        console.log(error);
    }
};

//Obtener todos los empleados
export const obtenerEmpleados = async(req, res) => {
    const empleados = await Empleados.find();
    res.json(empleados);
};

//Obtener empleado
export const obtenerEmpleado = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    try 
    {
        const usuarioFound = await Usuarios.findById(idUsuario);    
        if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

        const idEmpleado = usuarioFound.empleado;
        if (!idEmpleado) return res.status(400).json({ message: 'Id del empleado no encontrado' });

        const empleadoFound = await Empleados.findById(idEmpleado);
        if(!empleadoFound) return res.status(404).json({message: 'Empleado no encontrado'});

        res.json(empleadoFound);
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//Obtener Empleado por ID
export const obtenerEmpleadoID = async(req, res) => {
    const empleado = await Empleados.findById(req.params.id);
    if(!empleado) return res.status(404).json({message: 'Empleado no encontrado'});
    
    res.json(empleado);
}

//Actualizar empleado
export const actualizarEmpleado = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    try 
    {
        const usuarioFound = await Usuarios.findById(idUsuario);    
        if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

        const idEmpleado = usuarioFound.empleado;
        if (!idEmpleado) return res.status(400).json({ message: 'Id del empleado no encontrado' });

        const empleadoFound = await Empleados.findByIdAndUpdate(idEmpleado, req.body, {
            new: true // Dar los datos actualizados
        });
        if(!empleadoFound) return res.status(404).json({message: "Empleado no encontrado y no actualizado"});

        res.json(empleadoFound);
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//Actualizar empleado por ID
export const actualizarEmpleadoID = async(req, res) => {
    const empleadoFound = await Empleados.findByIdAndUpdate(req.params.id, req.body, {
        new: true // Dar los datos actualizados
    });

    if(!empleadoFound) return res.status(404).json({message: "Empleado no encontrado y no actualizado"});
    res.json(empleadoFound);
};

export { idEmpleado };
