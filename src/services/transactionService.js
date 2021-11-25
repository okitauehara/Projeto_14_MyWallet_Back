import * as transactionRepository from '../repositories/transactionRepository.js';

async function getRecords(token) {
  const records = await transactionRepository.findRecordsByToken(token);
  if (!records) return null;

  records.rows = records.rows.map((record) => ({
    ...record,
    date: `${String(new Date(record.date).getDate()).padStart(2, '0')}/${String(new Date(record.date).getMonth() + 1).padStart(2, '0')}`,
  }));

  return records.rows;
}

export { getRecords };
