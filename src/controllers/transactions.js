import connection from "../database/database.js";
import { transactionSchema } from "../schemas/schemas.js"

async function getTransactions(req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '');

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
            ORDER BY date DESC
        ;`, [token]);
        
        result.rows = result.rows.map(record => ({
            ...record,
            date: `${new Date(record.date).getDate()}/${String(new Date(record.date).getMonth()).padStart(2, '0')}`
        }));

        res.send(result.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function postTransaction(req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '');
    const {
        description,
        value,
        type
    } = req.body;

    if (!token) {
        return res.sendStatus(401);
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
        ;`, [token])
        if (getUser.rowCount === 0) {
            return res.sendStatus(404);
        }

        const user = getUser.rows[0];
        const date = new Date();

        await connection.query(`
            INSERT INTO records
                (user_id, date, description, value, type)
            VALUES
                ($1, $2, $3, $4, $5)
        ;`, [user.user_id, date, description, value, type]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function putTransaction(req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '');
    const id = req.params.transactionId;
    const {
        description,
        value,
        type
    } = req.body;

    if (!token) {
        return res.sendStatus(401);
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
        ;`, [id])
        if (checkRecord.rowCount === 0) {
            return res.sendStatus(404);
        }
        
        await connection.query(`
            UPDATE records
            SET
                description = $1,
                value = $2,
                type = $3
            WHERE id = $4
        ;`, [description, value, type, id])

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function deleteTransaction(req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '');
    const id = req.params.transactionId;

    if (!token) {
        return res.sendStatus(401);
    }
    
    try {
        const checkRecord = await connection.query(`
            SELECT *
            FROM records
            WHERE id = $1
        ;`, [id])
        if (checkRecord.rowCount === 0) {
            return res.sendStatus(404);
        }
        
        await connection.query(`
            DELETE
            FROM records
            WHERE id = $1
        ;`, [id])

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    getTransactions,
    postTransaction,
    putTransaction,
    deleteTransaction
}