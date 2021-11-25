/* eslint-disable max-len */
import * as transactionRepository from '../repositories/transactionRepository.js';
import * as sessionRepository from '../repositories/sessionRepository.js';

async function getRecords(token) {
  const records = await transactionRepository.findRecordsByToken(token);
  if (!records) return null;

  records.rows = records.rows.map((record) => ({
    ...record,
    date: `${String(new Date(record.date).getDate()).padStart(2, '0')}/${String(new Date(record.date).getMonth() + 1).padStart(2, '0')}`,
  }));

  return records.rows;
}

async function postNewRecord({
  token, description, value, type,
}) {
  const getSession = await sessionRepository.findSessionByToken(token);
  if (!getSession) return null;

  const recordData = await transactionRepository.insertNewRecordData({ description, value, type });
  const newRecord = await transactionRepository.insertNewRecordId({ userId: getSession.user_id, recordId: recordData.id });

  return newRecord;
}

export { getRecords, postNewRecord };
