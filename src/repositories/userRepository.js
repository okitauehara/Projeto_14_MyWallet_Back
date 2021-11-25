import connection from '../database/database';

async function findUserByEmail(email) {
  const result = await connection.query('SELECT * from users WHERE email = $1;', [email]);
  return result.rows[0];
}

export { findUserByEmail };
