// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import connection from '../../src/database/database';

const fakeTransaction = {
  description: faker.lorem.sentence(),
  value: faker.datatype.number(),
  type: faker.random.arrayElement(['earning', 'expense']),
};

const invalidFakeTransaction = {
  description: faker.lorem.sentence(),
  value: faker.datatype.number(),
  type: faker.lorem.text(),
};

const deleteRecords = async () => connection.query('TRUNCATE records RESTART IDENTITY CASCADE');

export {
  fakeTransaction,
  invalidFakeTransaction,
  deleteRecords,
};
