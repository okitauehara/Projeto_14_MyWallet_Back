import connection from '../database/database.js';

export default async function deleteToken(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Missing token' });
  }

  try {
    await connection.query('DELETE FROM sessions WHERE token = $1', [token]);

    return res.status(200).send({ message: 'Successfull logout!' });
  } catch (err) {
    console.log(`Error on Sign Out: Unable to remove user - ${err}`);
    return res.sendStatus(500);
  }
}
