import connection from '../database/database.js';
import { transactionSchema } from '../schemas/schemas.js';

async function getTransactions(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Missing token' });
  }

  try {
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

    return res.send(result.rows);
  } catch (err) {
    console.log(`Error on Transactions: Unable to get transactions - ${err}`);
    return res.sendStatus(500);
  }
}

async function postTransaction(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const {
    description,
    value,
    type,
  } = req.body;

  if (!token) {
    return res.status(401).send({ message: 'Missing token' });
  }

  const { error } = transactionSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const getUser = await connection.query(`
			SELECT *
			FROM sessions
			WHERE token = $1
		;`, [token]);
    if (getUser.rowCount === 0) {
      return res.status(404).send({ message: 'Invalid token' });
    }

    const user = getUser.rows[0];
    const date = new Date();

    await connection.query(`
			INSERT INTO records
					(user_id, date, description, value, type)
			VALUES
					($1, $2, $3, $4, $5)
		;`, [user.user_id, date, description, value, type]);

    return res.status(201).send({ message: 'Created!' });
  } catch (err) {
    console.log(`Error on Transactions: Unable to post transaction - ${err}`);
    return res.sendStatus(500);
  }
}

async function putTransaction(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const id = req.params.transactionId;
  const {
    description,
    value,
    type,
  } = req.body;

  if (!token) {
    return res.status(401).send({ message: 'Missing token' });
  }

  const { error } = transactionSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const checkRecord = await connection.query(`
			SELECT *
			FROM records
			WHERE id = $1
		;`, [id]);
    if (checkRecord.rowCount === 0) {
      return res.status(404).send({ message: 'Invalid token' });
    }

    await connection.query(`
			UPDATE records
			SET
					description = $1,
					value = $2,
					type = $3
			WHERE id = $4
		;`, [description, value, type, id]);

    return res.status(200).send({ message: 'Successfull update!' });
  } catch (err) {
    console.log(`Error on Transactions: Unable to update transaction - ${err}`);
    return res.sendStatus(500);
  }
}

async function deleteTransaction(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const id = req.params.transactionId;

  if (!token) {
    return res.status(401).send({ message: 'Missing token' });
  }

  try {
    const checkRecord = await connection.query(`
			SELECT *
			FROM records
			WHERE id = $1
		;`, [id]);
    if (checkRecord.rowCount === 0) {
      return res.status(404).send({ message: 'Invalid token' });
    }

    await connection.query(`
			DELETE
			FROM records
			WHERE id = $1
		;`, [id]);

    return res.status(200).send({ message: 'Deleted!' });
  } catch (err) {
    console.log(`Error Transactions: Unable to delete transaction - ${err}`);
    return res.sendStatus(500);
  }
}

export {
  getTransactions,
  postTransaction,
  putTransaction,
  deleteTransaction,
};
