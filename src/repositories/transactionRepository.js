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

  result.rows = result.rows.map((record) => ({
    ...record,
    date: `${String(new Date(record.date).getDate()).padStart(2, '0')}/${String(new Date(record.date).getMonth() + 1).padStart(2, '0')}`,
  }));

  return result.rows;
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
  ;`, [userId, recordId]);
}

async function findRecordById(recordId) {
  const result = await connection.query(`
    SELECT * FROM records
    WHERE id = $1
  ;`, [recordId]);
  return result.rows[0];
}

async function updateRecord({
  description, value, type, transactionId,
}) {
  return connection.query(`
    UPDATE records
    SET
      description = $1,
      value = $2,
      type = $3
    WHERE id = $4
  ;`, [description, value, type, transactionId]);
}

async function deleteRecord({ userId, recordId }) {
  await connection.query(`
    DELETE
    FROM users_records
    WHERE user_id = $1
      AND record_id = $2
	;`, [userId, recordId]);

  const result = await connection.query(`
    DELETE
    FROM records
    WHERE id = $1
  ;`, [recordId]);

  return result;
}

export {
  findRecordsByToken,
  insertNewRecordData,
  insertNewRecordId,
  findRecordById,
  updateRecord,
  deleteRecord,
};
