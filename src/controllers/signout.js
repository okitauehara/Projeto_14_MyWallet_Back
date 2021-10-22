import connection from "../database/database.js";

export default async function deleteToken(req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        await connection.query('DELETE FROM sessions WHERE token = $1', [token]);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}