import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import { signUpSchema } from '../schemas/schemas.js';

export default async function postSignUp(req, res) {
  const {
    name,
    email,
    password,
  } = req.body;

  const { error } = signUpSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const emailCheck = await connection.query('SELECT * from users WHERE email = $1;', [email]);
    if (emailCheck.rowCount !== 0) {
      return res.status(409).send({ message: 'Email already in use' });
    }

    const hash = bcrypt.hashSync(password, 10);

    await connection.query(`
			INSERT INTO users
					(name, email, password)
			VALUES
					($1, $2, $3)
    ;`, [name, email, hash]);

    return res.status(201).send({ message: 'Created!' });
  } catch (err) {
    console.log(`Error on Sign Up: Unable to sign in user - ${err}`);
    return res.sendStatus(500);
  }
}
