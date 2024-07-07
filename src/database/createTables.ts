import pool from "./db.js";

const createTables = async (): Promise<void> => {
  const createUserTable: string = `CREATE TABLE IF NOT EXISTS users(
     id SERIAL PRIMARY KEY,
     userName VARCHAR(100),
     email VARCHAR(100) UNIQUE NOT NULL,
     password VARCHAR(100) NOT NULL
    );`;
  try {
    await pool.query(createUserTable);
    console.log(`Tables created successfully`);
  } catch (error: unknown) {
    console.error("Error creating tables:", error);
  }
};

export default createTables;
