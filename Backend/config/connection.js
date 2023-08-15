// connection.js
import sql from "mssql";
import { config1, config2 } from "./dbconfig.js";

const pool1 = new sql.ConnectionPool(config1);
const pool2 = new sql.ConnectionPool(config2);

pool1.connect().catch((err) => console.log("Error connecting to config1:", err));
pool2.connect().catch((err) => console.log("Error connecting to config2:", err));

export { pool1, pool2 };
