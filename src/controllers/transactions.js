import connection from '../database/database.js';

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
  deleteTransaction,
};
