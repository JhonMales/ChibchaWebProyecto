import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./pages/home/home";
import SignUp from "./pages/auth/signup";
import SignIn from "./pages/auth/signin";
import NavigationBar from "./components/navigationBar/NavigationBar";
import Footer from "./components/footer/Footer";
import Ticket from "./pages/support/Ticket";
import Dominio from "./pages/dominio/Dominio";
import Admin from "./pages/admin/Admin";
import Cliente from "./pages/cliente/Cliente";
import Distribuidor from "./pages/distribuidor/Distribuidor";
import Empleado from "./pages/support/Empleado";
import SignUpUsuario from "./pages/auth/signupUsuario";
import Signout from "./pages/auth/signout";
import CambiarDatos from "./pages/cliente/CambiarDatos";
import CambiarUsuario from "./pages/cliente/CambiarUsuario";
import Pagos from "./pages/dominio/Pagos";
import CambiarDatosDistribuidor from "./pages/distribuidor/CambiarDatosDistribuidor";
import CrearDistribuidor from "./pages/admin/CrearDistribuidor";
import CrearEmpleado from "./pages/admin/CrearEmpleado";
import EditarEmpleado from "./pages/admin/EditarEmpleado";
import EditarDistribuidor from "./pages/admin/EditarDistribuidor";
import VistaDetallada from "./pages/admin/VistaDetallada";
import CrearUsEmpleado from "./pages/admin/CrearUsEmpleado";
import CrearUsDistribuidor from "./pages/admin/CrearUsDistribuidor";
import AceptarDominios from "./pages/distribuidor/AceptarDominios";
import RegistrarPagina from "./pages/dominio/RegistrarPagina";
import ActualizarPagina from "./pages/dominio/ActualizarPagina";
import VistaDetalladaC from "./pages/admin/VistaDetalladaC";
import VistaDetalladaD from "./pages/admin/VistaDetalladaD";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/distribuidor" element={<Distribuidor />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupUsuario" element={<SignUpUsuario />} />
        <Route path="/signout" element={<Signout/>}/>

        <Route path="/ticket" element={<Ticket />} />

        {/* DATOS CLIENTE*/ }
        <Route path="/actualizarDatos" element={<CambiarDatos/>}/>
        <Route path="/actualizarUsuario" element={<CambiarUsuario/>}/>
        <Route path="/dominio" element={<Dominio/>} />
        <Route path="/pagos" element={<Pagos/>}/>
        <Route path="/registrarPagina" element={<RegistrarPagina/>}/>
        <Route path="/actualizarPagina/:id" element={<ActualizarPagina/>}/>

        
        {/* DATOS DISTRIBUIDOR*/ }
        <Route path="/actualizarDistribuidor" element={<CambiarDatosDistribuidor/>}/>
        <Route path="/aceptarDominios" element={<AceptarDominios/>}/>


        {/* DATOS ADMIN*/ }
        <Route path="/crearDistribuidor" element={<CrearDistribuidor/>}/>
        <Route path="/crearEmpleado" element={<CrearEmpleado/>}/>
        <Route path="/crearUsEmpleado" element={<CrearUsEmpleado/>}/>
        <Route path="/crearUsDistribuidor" element={<CrearUsDistribuidor/>}/>
        <Route path="/actualizarEmpleadoID/:id" element={<EditarEmpleado/>}/>
        <Route path="/actualizarDistribuidorID/:id" element={<EditarDistribuidor/>}/>
        <Route path="/vistaDetalladaD/:id" element={<VistaDetalladaD/>}/>
        <Route path="/vistaDetalladaC/:id" element={<VistaDetalladaC/>}/>
        <Route path="/vistaDetalladaE/:id" element={<VistaDetallada/>}/>
      </Routes>
    </>
  );
}

export default App;
