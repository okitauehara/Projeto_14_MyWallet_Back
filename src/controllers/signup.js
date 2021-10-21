import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import { signUpSchema } from '../schemas/schemas.js'

async function postSignUp(req, res) {
    const {
        name,
        email,
        password,
        confirmation
    } = req.body;

    const { error } = signUpSchema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const emailCheck = await connection.query('SELECT * from users WHERE email = $1', [email]);
        if (emailCheck.rowCount !== 0) {
            return res.status(409).send('Email already in use')
        }

        const hash = bcrypt.hashSync(password, 10);

        await connection.query(`
        INSERT INTO users
            (name, email, password)
        VALUES
            ($1, $2, $3)
        `, [name, email, hash]);

        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    postSignUp
}