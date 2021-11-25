import * as transactionService from '../services/transactionService.js';

async function getTransactions(req, res) {
  const { session } = res.locals;

  try {
    const records = await transactionService.getRecords(session.token);
    if (!records) return res.sendStatus(404);

    return res.send(records);
  } catch (err) {
    console.log(`Error on Transactions: Unable to get transactions - ${err}`);
    return res.sendStatus(500);
  }
}

export { getTransactions };
