import pool from "./db.js";

const createTables = async (): Promise<void> => {
  const createUsersTable: string = `CREATE TABLE IF NOT EXISTS users(
     id SERIAL PRIMARY KEY,
     userName VARCHAR(100),
     email VARCHAR(100) UNIQUE NOT NULL,
     password VARCHAR(100) NOT NULL
    );`;
  const createPostsTable: string = `CREATE TABLE IF NOT EXISTS posts(
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL
    );`;
  const createUserPostsTable: string = `
    CREATE TABLE IF NOT EXISTS user_posts (
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, post_id)
    );`;
  try {
    await pool.query(createUsersTable);
    await pool.query(createPostsTable);
    await pool.query(createUserPostsTable);
    console.log(`Tables created successfully`);
  } catch (error: unknown) {
    console.error("Error creating tables:", error);
  }
};

export default createTables;
