import connection from "../database/database.js";

export default async function deleteToken(req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ message: 'Missing token'});
    }

    try {
        await connection.query('DELETE FROM sessions WHERE token = $1', [token]);

        res.status(200).send({ message: 'Successfull logout!'});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}