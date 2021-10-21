import { func } from "joi";
import connection from "../database/database";

async function getTransactions(req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer', '');

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const result = await connection.query(`
        SELECT 
            records.id,
            records.date,
            records.description,
            records.value,
            records.type
        FROM records
        JOIN sessions
        ON records.user_id = sessions.user_id
        WHERE sessions.token = $1
        ;`, [token]);
        
        res.send(result.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    getTransactions
}