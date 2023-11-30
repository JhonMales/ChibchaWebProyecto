import Usuarios from '../models/usuario.model.js'; //Importando el modelo del Usuario
import bcrypt from 'bcryptjs'; //Módulo para cifrar la contraseña
import { crearAccesoToken } from '../libs/jwt.js';
import { idCliente } from './cliente.controller.js';
import { idEmpleado } from './empleado.controller.js';
import { idDistribuidor } from './distribuidor.controller.js';

//Registrar Usuario
export const registrarUsuario = async (req, res) => {
  const { usuario, clave, rol } = req.body;

  try 
  {
    const usuarioFound = await Usuarios.findOne({ usuario });
    if(usuarioFound) return res.status(400).json({ message: ["El usuario ya se encuentra en uso"] })

    const claveHash = await bcrypt.hash(clave, 10);

    let newUser;

    switch(rol) 
    {
      case 'Cliente':
        newUser = new Usuarios({
          usuario,
          clave: claveHash,
          rol,
          cliente: idCliente,
        });
        break;

      case 'Empleado':
        newUser = new Usuarios({
          usuario,
          clave: claveHash,
          rol,
          empleado: idEmpleado,
        });
        break;
      
      case 'Distribuidor':
        newUser = new Usuarios({
          usuario,
          clave: claveHash,
          rol,
          distribuidor: idDistribuidor,
        });
        break;

      case 'Administrador':
        newUser = new Usuarios({
          usuario,
          clave: claveHash,
          rol
        });
        break;
    }

    const usuarioRegistrado = await newUser.save();

    const token = await crearAccesoToken({id: usuarioRegistrado._id})

    res.cookie('token', token);
    res.json({
      id: usuarioRegistrado._id,
      usuario: usuarioRegistrado.usuario,
      rol: usuarioRegistrado.rol,
      cliente: usuarioRegistrado.cliente ? usuarioRegistrado.cliente._id : undefined,
      empleado: usuarioRegistrado.empleado ? usuarioRegistrado.empleado._id : undefined,
      distribuidor: usuarioRegistrado.distribuidor ? usuarioRegistrado.distribuidor._id : undefined
    });
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
};

//Iniciar Sesión
export const iniciarSesion = async(req, res) => {
  const { usuario, clave } = req.body;

  try 
  {
    const usuarioFound = await Usuarios.findOne({ usuario });
    if (!usuarioFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(clave, usuarioFound.clave);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" })

    const token = await crearAccesoToken({ id: usuarioFound._id });

    res.cookie('token', token);
    
    res.json({
      id: usuarioFound._id,
      usuario: usuarioFound.usuario,
      rol: usuarioFound.rol,
      cliente: usuarioFound.cliente ? usuarioFound.cliente._id : undefined,
      empleado: usuarioFound.empleado ? usuarioFound.empleado._id : undefined,
      distribuidor: usuarioFound.distribuidor ? usuarioFound.distribuidor._id : undefined
    });
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
}

//Cerrar Sesión
export const cerrarSesion = (req, res) => {
  res.cookie('token', "", {expires: new Date(0)});
  return res.sendStatus(200);
}

//Actualizar Usuario
export const actualizarUsuario = async (req, res) => {
  const { usuario, clave, rol } = req.body;

  const claveHash = await bcrypt.hash(clave, 10);

  let updateUsuario;

  switch(rol) 
  {
    case 'Cliente':
      updateUsuario = await Usuarios.findByIdAndUpdate(req.usuario.id, {
        usuario,
        clave: claveHash,
        rol,
        cliente: idCliente,
      }, { 
        new: true // Dar los datos actualizados
      });
      break;

    case 'Empleado':
      updateUsuario = await Usuarios.findByIdAndUpdate(req.usuario.id, {
        usuario,
        clave: claveHash,
        rol,
        empleado: idEmpleado,
      }, { 
        new: true // Dar los datos actualizados
      });
      break;
      
    case 'Distribuidor':
      updateUsuario = await Usuarios.findByIdAndUpdate(req.usuario.id, {
        usuario,
        clave: claveHash,
        rol,
        distribuidor: idDistribuidor,
      }, { 
        new: true // Dar los datos actualizados
      });
      break;
  }

  if(!updateUsuario) return res.status(404).json({message: "Usuario no encontrado y no actualizado"});
  
  res.json({
    id: updateUsuario._id,
    usuario: updateUsuario.usuario,
    rol: updateUsuario.rol,
    cliente: updateUsuario.cliente ? updateUsuario.cliente._id : undefined,
    empleado: updateUsuario.empleado ? updateUsuario.empleado._id : undefined,
    distribuidor: updateUsuario.distribuidor ? updateUsuario.distribuidor._id : undefined
  });
};

//Obtener Usuario
export const obtenerUsuario = async (req, res) => {
  const usuarioFound = await Usuarios.findById(req.usuario.id);
  
  if(!usuarioFound) return res.status(400).json({message: "Usuario no encontrado"});
  
  return res.json({
    id: usuarioFound._id,
    usuario: usuarioFound.usuario,
    rol: usuarioFound.rol,
    cliente: usuarioFound.cliente ? usuarioFound.cliente._id : undefined,
    empleado: usuarioFound.empleado ? usuarioFound.empleado._id : undefined,
    distribuidor: usuarioFound.distribuidor ? usuarioFound.distribuidor._id : undefined
  });
}

//Eliminar Usuario por ID
export const eliminarUsuarioID = async (req, res) => {
  const userID = req.params.id;
  console.log(userID);

  try 
  {
    const usuarioFound = await Usuarios.findOne({
      $or: [
        { 'cliente._id': userID },
        { 'empleado._id': userID },
        { 'distribuidor._id': userID }
      ]
    });  
    console.log(usuarioFound);

    if (!usuarioFound) return res.status(404).json({ message: 'Usuario no encontrado y no eliminado' });

    const usuarioDeleted = await Usuarios.findByIdAndDelete(usuarioFound._id);

    res.json(usuarioDeleted);
  } 
  catch(error) 
  {
    res.status(500).json({ message: error.message });
  }
};
