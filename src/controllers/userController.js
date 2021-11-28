import { signInSchema, signUpSchema } from '../schemas/schemas.js';
import * as userService from '../services/userService.js';
import * as sessionService from '../services/sessionService.js';

async function signIn(req, res) {
  const {
    email,
    password,
  } = req.body;

  const { error } = signInSchema.validate(req.body);
  if (error) return res.sendStatus(400);

  try {
    const userCheck = await userService.authenticate({ email, password });
    if (!userCheck) return res.sendStatus(401);

    const firstName = userCheck?.user.name.split(' ').splice(0, 1)[0];

    return res.send({
      name: firstName,
      token: userCheck.session.token,
    });
  } catch (err) {
    console.log(`Error on Sign In: Unable to insert user - ${err}`);
    return res.sendStatus(500);
  }
}

async function signUp(req, res) {
  const {
    name,
    email,
    password,
  } = req.body;

  const { error } = signUpSchema.validate(req.body);
  if (error) return res.sendStatus(400);

  try {
    const emailCheck = await userService.verifyUser({ name, email, password });
    if (!emailCheck) return res.sendStatus(409);

    return res.sendStatus(201);
  } catch (err) {
    console.log(`Error on Sign Up: Unable to sign up user - ${err}`);
    return res.sendStatus(500);
  }
}

async function signOut(req, res) {
  const { session } = res.locals;

  try {
    const result = await sessionService.deleteSession(session.token);
    if (!result) return res.sendStatus(400);

    return res.sendStatus(200);
  } catch (err) {
    console.log(`Error on Sign Out: Unable to remove user - ${err}`);
    return res.sendStatus(500);
  }
}

export { signIn, signUp, signOut };
