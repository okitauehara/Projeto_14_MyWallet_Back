import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import * as userRepository from '../repositories/userRepository.js';
import * as sessionRepository from '../repositories/sessionRepository.js';

async function authenticate({ email, password }) {
  const user = await userRepository.findUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
  }

  const token = uuid();

  const session = await sessionRepository.createSession({ user, token });

  return ({ user, session });
}

export { authenticate };
