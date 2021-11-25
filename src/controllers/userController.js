import { signInSchema } from '../schemas/schemas.js';
import * as userService from '../services/userService.js';

async function signIn(req, res) {
  const {
    email,
    password,
  } = req.body;

  const { error } = signInSchema.validate(req.body);
  if (error) return res.sendStatus(400);

  try {
    const userCheck = await userService.authenticate({ email, password });
    if (!userCheck.user) {
      return res.sendStatus(401);
    }
    const firstName = userCheck.user.name.split(' ').splice(0, 1)[0];

    return res.send({
      name: firstName,
      token: userCheck.session.token,
    });
  } catch (err) {
    console.log(`Error on Sign In: Unable to insert user - ${err}`);
    return res.sendStatus(500);
  }
}

export { signIn };
