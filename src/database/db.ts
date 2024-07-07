import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;
type PoolConfig = {
  connectionString?: string;
  host?: string;
  user?: string;
  password?: string;
  database?: string;
  port?: number;
};
const poolConfig: PoolConfig = {};
if (process.env.CONNECTION_STRING) {
  poolConfig.connectionString = process.env.CONNECTION_STRING;
} else {
  poolConfig.host = process.env.DB_HOST;
  poolConfig.user = process.env.DB_USER;
  poolConfig.password = process.env.DB_PASSWORD;
  poolConfig.database = process.env.DB_NAME;
  poolConfig.port = Number(process.env.DB_PORT);
}
const pool = new Pool(poolConfig);

export default pool;
