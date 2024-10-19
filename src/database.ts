"use strict";

import { Sequelize } from "sequelize";
import mysql from "mysql2";

// Definir la interfaz para la configuración de conexión
interface ConnectionConfig {
  host: string;
  user: string;
  password: string;
  port: number;
  database: string;
}

// Configuración de conexión
const connectionConfig: ConnectionConfig = {
  host: "172.22.0.2", // IP interna del contenedor
  user: "root",
  password: "12345",
  port: 3306,         // Puerto de MySQL
  database: "mydatabase"
};

// Crear la conexión
const connection = mysql.createConnection(connectionConfig);

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
    return;
  }
  console.log("Conectado a la base de datos.");
});

// Inicializar Sequelize con la conexión
export const sequelize = new Sequelize(connectionConfig.database, connectionConfig.user, connectionConfig.password, {
  host: connectionConfig.host,
  dialect: "mysql",
});

// Probar la conexión con Sequelize
sequelize.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch(err => console.error("Unable to connect to the database:", err));
