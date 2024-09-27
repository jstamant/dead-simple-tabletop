import express from 'express';
const router = express.Router();

import sql from '../../util/db'

router.get('/', async (req, res) => {
  console.log('getting games for user', req.user);
  const user = req.user;
  // TODO make this validation everywhere, pretty much, or make user not optional?
  if (!user) return res.status(400).end(); // is this actually 401?
  const sheets = await sql`SELECT * FROM games WHERE user_id = ${user.id}`;
  res.send(sheets);
})

router.post('/', async (req, res) => {
  console.log('creating a game');
  const user = req.user;
  // TODO make this validation everywhere, pretty much, or make user not optional?
  if (!user) return res.status(400).end(); // is this actually 401?
  await sql`INSERT INTO games (user_id) VALUES (${user.id})`;
  res.send(true);
})

// not done
router.get('/:id', (req, res) => {
  const message = `getting the game with id ${req.params.id}`;
  console.log(message);
  res.send(message);
})

export default router;
