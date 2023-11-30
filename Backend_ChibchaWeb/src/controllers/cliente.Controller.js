import Clientes from '../models/cliente.model.js'; 
import Usuarios from '../models/usuario.model.js';

//Variable para almacenar el ID del Cliente
let idCliente;

//Crear cliente
export const crearCliente = async(req, res) => {
    const { nombres, apellidos, tipoDocumento, documentoIdentificacion, 
            pais, ciudad, direccion, codigoPostal, telefono, correo, fechaNacimiento } = req.body

    try 
    {
        const newCliente = new Clientes({
            nombres, 
            apellidos, 
            tipoDocumento, 
            documentoIdentificacion, 
            pais, 
            ciudad, 
            direccion, 
            codigoPostal, 
            telefono, 
            correo,
            fechaNacimiento
        })

        const clienteSaved = await newCliente.save();
        res.json(clienteSaved);

        idCliente = clienteSaved._id;
    } 
    catch (error) 
    {
        console.log(error);
    }
};

//Obtener todos los clientes
export const obtenerClientes = async(req, res) => {
    const clientes = await Clientes.find();
    res.json(clientes);
};

//Obtener cliente
export const obtenerCliente = async(req, res) => {
    const idUsuario = req.usuario.id;
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    try 
    {
        const usuarioFound = await Usuarios.findById(idUsuario);    
        if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

        const idCliente = usuarioFound.cliente;
        if (!idCliente) return res.status(400).json({ message: 'Id del cliente no encontrado' });

        const clienteFound = await Clientes.findById(idCliente);
        if(!clienteFound) return res.status(404).json({message: 'Cliente no encontrado'});

        res.json(clienteFound);
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//Obtener cliente por ID
export const obtenerClienteID = async(req, res) => {
    const cliente = await Clientes.findById(req.params.id);
    if(!cliente) return res.status(404).json({message: 'Cliente no encontrado'});
    
    res.json(cliente);
}

//Actualizar cliente
export const actualizarCliente = async(req, res) => {
    const idUsuario = req.usuario.id;
    //console.log(idUsuario);
    if (!idUsuario) return res.status(400).json({ message: 'ID del Usuario no proporcionado en la cookie' });

    try 
    {
        const usuarioFound = await Usuarios.findById(idUsuario);    
        if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado' });

        const idCliente = usuarioFound.cliente;
        if (!idCliente) return res.status(400).json({ message: 'Id del cliente no encontrado' });

        const clienteFound = await Clientes.findByIdAndUpdate(idCliente, req.body, {
            new: true // Dar los datos actualizados
        });
        if(!clienteFound) return res.status(404).json({message: "Cliente no encontrado y no actualizado"});

        res.json(clienteFound);
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//Actualizar cliente por ID
export const actualizarClienteID = async(req, res) => {
    const clienteFound = await Clientes.findByIdAndUpdate(req.params.id, req.body, {
        new: true // Dar los datos actualizados
    });

    if(!clienteFound) return res.status(404).json({message: "Cliente no encontrado y no actualizado"});
    res.json(clienteFound);
};

export { idCliente };