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

async function insertNewRecordData({ description, value, type }) {
  const result = await connection.query(`
			INSERT INTO records
				(description, value, type)
			VALUES
				($1, $2, $3)
      RETURNING *
		;`, [description, value, type]);
  return result.rows[0];
}

async function insertNewRecordId({ userId, recordId }) {
  return connection.query(`
    INSERT INTO users_records
      (user_id, record_id)
    VALUES
      ($1, $2)
  `, [userId, recordId]);
}

export { findRecordsByToken, insertNewRecordData, insertNewRecordId };
