"use strict";

import express from "express";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize";
import todoRoutes from "./routes/todoRoutes";

// Configuración de Sequelize
const sequelize = new Sequelize("mydatabase", "root", "root", {
  host: "mydatabase", // Nombre del contenedor de MySQL
  dialect: "mysql",
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api", todoRoutes);

// Sincronizar la base de datos y arrancar el servidor
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
