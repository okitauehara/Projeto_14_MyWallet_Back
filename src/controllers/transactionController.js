import * as transactionService from '../services/transactionService.js';
import { transactionSchema } from '../schemas/schemas.js';

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

async function postTransaction(req, res) {
  const { session } = res.locals;
  const {
    description,
    value,
    type,
  } = req.body;

  const { error } = transactionSchema.validate(req.body);
  if (error) return res.sendStatus(400);

  try {
    const result = await transactionService.postNewRecord({
      token: session.token, description, value, type,
    });
    if (!result) return res.sendStatus(404);

    return res.sendStatus(201);
  } catch (err) {
    console.log(`Error on Transactions: Unable to post transaction - ${err}`);
    return res.sendStatus(500);
  }
}

async function putTransaction(req, res) {
  const { transactionId } = req.params;
  const {
    description,
    value,
    type,
  } = req.body;

  const { error } = transactionSchema.validate(req.body);
  if (error) {
    return res.sendStatus(400);
  }

  try {
    const result = await transactionService.updateRecord({
      transactionId, description, value, type,
    });
    if (!result) return res.sendStatus(404);

    return res.sendStatus(200);
  } catch (err) {
    console.log(`Error on Transactions: Unable to update transaction - ${err}`);
    return res.sendStatus(500);
  }
}

async function deleteTransaction(req, res) {
  const { session } = res.locals;
  const { transactionId } = req.params;

  try {
    const result = await transactionService.deleteRecord(session.user_id, transactionId);
    if (!result) return res.sendStatus(404);

    return res.sendStatus(200);
  } catch (err) {
    console.log(`Error Transactions: Unable to delete transaction - ${err}`);
    return res.sendStatus(500);
  }
}

export {
  getTransactions,
  postTransaction,
  putTransaction,
  deleteTransaction,
};
