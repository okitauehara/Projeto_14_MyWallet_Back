// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import bcrypt from 'bcrypt';
import connection from '../../src/database/database';

const fakeUserSignUp = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

const invalidFakeUserSignUp = {
  name: faker.name.findName(),
  email: faker.internet.email(),
};

const fakeUserSignIn = {
  email: fakeUserSignUp.email,
  password: fakeUserSignUp.password,
};

const fakeUserNotRegistered = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

const invalidFakeUserSignIn = {
  email: fakeUserSignUp.email,
};

const fakeSession = {
  id: faker.datatype.number(),
  user_id: fakeUserSignUp.id,
  token: faker.datatype.uuid(),
};

const createFakeUser = async () => {
  const passwordHash = bcrypt.hashSync(fakeUserSignUp.password, 10);
  return connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [fakeUserSignUp.name, fakeUserSignUp.email, passwordHash]);
};

const createFakeSession = async () => {
  const result = await connection.query('SELECT * from users WHERE email = $1;', [fakeUserSignUp.email]);
  const user = result.rows[0];
  connection.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2);', [user.id, fakeSession.token]);
};

const deleteUserSessions = async () => connection.query('DELETE FROM users_records');

const deleteUsers = async () => connection.query('DELETE FROM users;');

const deleteSessions = async () => connection.query('DELETE FROM sessions;');

export {
  fakeUserSignUp,
  invalidFakeUserSignUp,
  fakeUserSignIn,
  fakeUserNotRegistered,
  invalidFakeUserSignIn,
  fakeSession,
  deleteUserSessions,
  deleteUsers,
  deleteSessions,
  createFakeUser,
  createFakeSession,
};
