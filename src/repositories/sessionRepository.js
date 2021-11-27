import connection from '../database/database.js';

async function createSession({ user, token }) {
  const result = await connection.query(`
    INSERT INTO sessions
      (token, user_id)
    VALUES ($1, $2)
      RETURNING *
  `, [token, user.id]);

  return result.rows[0];
}

async function findSessionByToken(token) {
  const result = await connection.query('SELECT * FROM sessions WHERE token = $1;', [token]);
  if (result.rowCount === 0) return null;
  return result.rows[0];
}

async function deleteSession(token) {
  return connection.query('DELETE FROM sessions WHERE token = $1', [token]);
}

export { createSession, findSessionByToken, deleteSession };
