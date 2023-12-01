import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

//Rutas
import usuarioRoutes from "./routes/usuario.routes.js";

import clienteRoutes from "./routes/cliente.routes.js";
import empleadoRoutes from "./routes/empleado.routes.js";
import distribuidorRoutes from "./routes/distribuidor.routes.js";

import paginaWebRoutes from "./routes/paginaWeb.routes.js";
import dominioRoutes from "./routes/dominio.routes.js";

import medioPagoRoutes from "./routes/medioPago.routes.js";
import transaccionRoutes from "./routes/transaccion.routes.js";

import ticketRoutes from "./routes/ticket.routes.js";

const app = express();

//Permitir que el dominio especificado se pueda comunicar en este servidor
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//Middleware que registra las solicitudes HTTP y las muestra por consola
app.use(morgan('dev'));

//Convertir los datos del servidor en formato json
app.use(express.json());

//Convertir las cookies en un objeto JSON
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Home")
});

app.use('/api', usuarioRoutes);

app.use('/api', clienteRoutes);
app.use('/api', empleadoRoutes);
app.use('/api', distribuidorRoutes);

app.use('/api', dominioRoutes);
app.use('/api', paginaWebRoutes);

app.use('/api', medioPagoRoutes);
app.use('/api', transaccionRoutes);

app.use('/api', ticketRoutes);

export default app;
