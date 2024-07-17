import pool from "./db.js";

const createTables = async (): Promise<void> => {
  const createUsersTable: string = `CREATE TABLE IF NOT EXISTS users(
     id SERIAL PRIMARY KEY,
     name VARCHAR(100),
     lastname VARCHAR(100),
     username VARCHAR(100),
     email VARCHAR(100) UNIQUE NOT NULL,
     password VARCHAR(100) NOT NULL,
     profileimage TEXT,
     role VARCHAR(15) NOT NULL
    );`;
  const createPostsTable: string = `CREATE TABLE IF NOT EXISTS posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL
    );`;
  const createCommentsTable: string = `CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL
    );`;
  const createUserPostsTable: string = `
    CREATE TABLE IF NOT EXISTS user_posts (
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, post_id)
    );`;
  const createUserCommentsTable: string = `
    CREATE TABLE IF NOT EXISTS user_comments (
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, comment_id)
      );`;
  const createPostCommentsTable: string = `
    CREATE TABLE IF NOT EXISTS post_comments(
        post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE, 
        comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
        PRIMARY KEY (post_id, comment_id)
       )`;

  try {
    await pool.query(createUsersTable);
    await pool.query(createPostsTable);
    await pool.query(createCommentsTable);
    await pool.query(createUserPostsTable);
    await pool.query(createUserCommentsTable);
    await pool.query(createPostCommentsTable);
    console.log(`Tables created successfully`);
  } catch (error: unknown) {
    console.error("Error creating tables:", error);
  }
};

export default createTables;
