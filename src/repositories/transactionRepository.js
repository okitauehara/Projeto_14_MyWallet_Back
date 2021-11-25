import connection from '../database/database.js';

async function findRecordsByToken(token) {
  const result = await connection.query(`
    SELECT records.*
    FROM records
    JOIN sessions
      ON sessions.token = $1
    JOIN users_records
      ON users_records.user_id = sessions.user_id
    WHERE records.id = users_records.record_id
    ORDER BY date DESC
  ;`, [token]);
  return result;
}

export { findRecordsByToken };
