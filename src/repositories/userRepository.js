import connection from '../database/database.js';

async function findUserByEmail(email) {
  const result = await connection.query('SELECT * from users WHERE email = $1;', [email]);
  return result.rows[0];
}

async function createUser({ name, email, password }) {
  return connection.query(`
    INSERT INTO users
        (name, email, password)
    VALUES
        ($1, $2, $3)
  ;`, [name, email, password]);
}

async function findUserById(userId) {
  const result = await connection.query('SELECT * FROM users WHERE id = $1;', [userId]);
  return result.rows[0];
}

export { findUserByEmail, createUser, findUserById };
