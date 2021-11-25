import * as sessionRepository from '../repositories/sessionRepository.js';
import * as userRepository from '../repositories/userRepository.js';

async function verifySession(token) {
  const sessionCheck = await sessionRepository.findSessionByToken(token);
  if (!sessionCheck) return null;

  const userCheck = await userRepository.findUserById(sessionCheck.user_id);
  if (!userCheck) return null;

  return sessionCheck;
}

async function deleteSession(token) {
  const result = await sessionRepository.deleteSession(token);
  return result;
}

export { verifySession, deleteSession };
