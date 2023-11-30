import app from "./app.js";
import {conexionDB} from "./database.js";

conexionDB();
app.listen(3000);
