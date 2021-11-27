import * as sessionService from '../services/sessionService.js';

export default async function ensureAuth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await sessionService.verifySession(token);
    if (!session) return res.sendStatus(404);
    res.locals.session = session;

    return next();
  } catch (err) {
    console.log(`Error on Authentication: Unable to authenticate user - ${err}`);
    return res.sendStatus(500);
  }
}
