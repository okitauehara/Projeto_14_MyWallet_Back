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

export { findUserByEmail, createUser };
